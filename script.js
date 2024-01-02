initialize();

function render() {
    document.getElementById('fullScreen').innerHTML = TemplateHtmlLeft();
    document.getElementById('fullScreen').innerHTML += TemplateHtmlRight();
    document.getElementById('hiddenBasket').innerHTML = TemplateHiddenBasketHtml();
    renderMenu();
    renderLocalFlyer();
    renderBasket();
    renderImpressumPronto();
    renderHiddenOrderButton();
}

function renderMenu() {
    document.getElementById(`menu`).innerHTML = '';
    for (let i = 0; i < menu.length; i++) {
        document.getElementById(`menu`).innerHTML += TemplateMenu(i);
        renderIngrediants(i);
    }
}

function renderIngrediants(index) {
    document.getElementById(`ingredients${index}`).innerHTML = `<h2>Zutaten:</h2>`;
    for (let i = 0; i < menu[index]["ingreadients"].length; i++) {
        document.getElementById(`ingredients${index}`).innerHTML += `
        <div>${menu[index]["ingreadients"][i]}</div>`
    }
}

function renderLocalFlyer() {
    let flyer = document.getElementById('localFlyer');
    flyer.innerHTML = /*html*/`
    <img class="flyer" src="./img/header.jpg">
    <h1>Pizzeria Pronto</h1>
    <img src="./img/rating.png"><u>     22 Bewertungen</u>
    <div><br>Mindestbestellwert 10,00 €, Servicegebühr 1,99 €</div>`
}

function moveToBasket(index) {
    menu[index]["count"] = menu[index]["count"] + 1;
    renderBasket();
    saveLocalstorage();
}

function renderBasket() {
    let countTotal = 0;
    document.getElementById('basketHead').innerHTML = `<h1> Warenkorb </h1>`;
    for (let i = 0; i < menu.length; i++) {
        countTotal = countTotal + menu[i]["count"];
    }
    checkBasket(countTotal);
}

function checkBasket(countTotal){
     if (countTotal == 0) {
        document.getElementById('basketSection').innerHTML = `<h2>Ihr Warenkorb ist leer</h2>`;
        document.getElementById('basketPrice').classList.add("d-none");
        document.getElementById('subtotal').innerHTML = ``;
        document.getElementById('overViewCost').innerHTML = ``;
    }
    else {
        renderOrderDetails();
    }
}

function renderOrderDetails() {
    document.getElementById('basketSection').innerHTML = ``;
    for (i = 0; i < menu.length; i++) {
        if (menu[i]["count"] > 0) { TemplateTable(i); }
    }
    subtotal();
}

function calc(index, value) {
    menu[index]["count"] = menu[index]["count"] + value;
    totalPrice = 0;
    for (i = 0; i < menu.length; i++) { totalPrice = totalPrice + menu[i]["price"] * menu[i]["count"]; };
    renderBasket();
    saveLocalstorage();
}

function subtotal() {
    totalPrice = 0;
    document.getElementById('subtotal').innerHTML = ``;
    for (i = 0; i < menu.length; i++) { totalPrice = totalPrice + menu[i]["price"] * menu[i]["count"]; }
    if (totalPrice <= 10) {
        document.getElementById('subtotal').innerHTML += /*html*/`
    <table class="minimum"><tr>
    <td id="minCost">Benötigter Betrag, um den Mindestbestellwert zu erreichen</td>
    <td id="minCost">${(10 - totalPrice).toFixed(2).replace(`.`, ',')}</td><td id="minCost">€</td>
    </tr></table>`
    }
    overViewCost();
}

function overViewCost() {
    document.getElementById('overViewCost').innerHTML = /*html*/`
    <table class=overViewCost>
        <tr><td>Zwischensumme</td><td id="total">${totalPrice.toFixed(2).replace(`.`, ',')}</td><td>€<td></tr>
        <tr><td>Servicegebühr</td><td id="total">1,99</td><td>€</td></tr>
        <tr><td class="blank"></td><td class="blank"></td><td class="blank"></td></tr>
        <tr><td><b>Gesamt</b></td><td id="total">${(totalPrice + 1.99).toFixed(2).replace(`.`, ',')}</td><td>€</td></tr>
    </table>`;
    renderTotalPrice();
}

function renderTotalPrice() {
    document.getElementById('basketPrice').classList.remove("d-none");
    if (totalPrice <= 10.00) { document.getElementById('basketPrice').classList.add("bc-grey") }
    else { document.getElementById('basketPrice').classList.remove("bc-grey") }
    document.getElementById('basketPrice').innerHTML = `<div> Bezahlen ( ${(totalPrice + 1.99).toFixed(2).replace(`.`, ',')} €)</div>`;
    document.getElementById('hiddenOrderButton').innerHTML = `<div> Warenkorb ( ${(totalPrice + 1.99).toFixed(2).replace(`.`, ',')} €)</div>`
    renderHiddenOrderButton()
}

function finishOrder() {
    if (totalPrice >= 10) {
        document.getElementById('basket').innerHTML = `<h1>Vielen Dank für Ihre Bestellung</h1>`
        document.getElementById('basket').innerHTML += `<p> Die Bestellung wurde weitergeleitet, <br>wir wünschen Guten Appetit</p>`;
        setTimeout(() => { reset() }, 4000);
    }
    else { subtotal() }
}

function reset() {
    document.getElementById('basket').innerHTML = '';
    for (let i = 0; i < menu.length; i++) {
        menu[i]["count"] = 0;
    }
    totalPrice = 0;
    render();
}

function loadLocalstorage() {
    menu = JSON.parse(localStorage.getItem('menu'));
}

function saveLocalstorage() {
    let galerieJSON = JSON.stringify(menu);
    localStorage.setItem('menu', galerieJSON);
}

function initialize() {
    if (localStorage.getItem('menu')) {
        loadLocalstorage();
    }
    else {
        saveLocalstorage();
    }
}

function renderImpressumPronto() {
    document.getElementById('impressumPronto').innerHTML = `
    <h1>Impressum</h1>
    <p>Mario Pronto<br>Hessenweg 23<br>60433 Frankfurt am Main</p> 
    `;
}

function renderHiddenOrderButton() {
    document.getElementById('hiddenFinishButton').style.display ='none';
    document.getElementById('hiddenOrderButton').innerHTML = ``;
    if (totalPrice > 0) {
        document.getElementById('hiddenOrderButton').innerHTML = `Warenkorb ( ${(totalPrice).toFixed(2).replace(`.`, ',')} €)`;
    }
    else { document.getElementById('hiddenOrderButton').innerHTML = `Warenkorb`; }
    if (totalPrice <= 10.00) { document.getElementById('hiddenOrderButton').classList.add("bc-grey"); }
    else { document.getElementById('hiddenOrderButton').classList.remove("bc-grey"); }
}

function renderHiddenBasket() {
    renderSettings();
    if (totalPrice == 0) {
        document.getElementById('basketHeadHidden').innerHTML = /*html*/`
        <h2>Ihr Warenkorb ist leer</h2>
        <div class="back" id="back" onclick="render()">zurück</div>`;
        document.getElementById('basketPriceHidden').classList.add("d-none");
        document.getElementById('subtotalHidden').innerHTML = ``;
        document.getElementById('hiddenFinishButton').style.display ='none';
        renderOrderDetailsHidden();
    }
    else {renderOrderDetailsHidden()}
}

function renderSettings(){
    document.getElementById('hiddenFinishButton').style.display ='flex';
    document.getElementById('back').style.display ='flex';
    document.getElementById('hiddenOrderButton').style.display ='none';
    document.getElementById('menu').style.display ='none';
    document.getElementById('hiddenBasket').style.display ='block';
    document.getElementById('basketHeadHidden').innerHTML = `<h1> Warenkorb </h1>`;
}

function renderOrderDetailsHidden() {
    document.getElementById('subtotalHidden').innerHTML = ``;
    for (i = 0; i < menu.length; i++) {
        if (menu[i]["count"] > 0) {TemplateTableHidden(i)}
    }
    subtotalHidden();
}

function subtotalHidden() {
    document.getElementById('hiddenBasketMinimum').innerHTML = '';
    if (totalPrice <= 10.00) {
        document.getElementById('hiddenBasketMinimum').innerHTML += /*html*/`
    <table class="minimum" id="minimum"><tr>
    <td id="minCost">Benötigter Betrag, um den Mindestbestellwert zu erreichen</td>
    <td id="minCost">${(10 - totalPrice).toFixed(2).replace(`.`, ',')}</td><td id="minCost">€</td>
    </tr></table>`
    }
    overViewCostHidden();
}

function overViewCostHidden() {
    document.getElementById('overViewCostHidden').innerHTML = /*html*/`
    <table class=overViewCost>
        <tr><td>Zwischensumme</td><td id="total">${totalPrice.toFixed(2).replace(`.`, ',')}</td><td>€<td></tr>
        <tr><td>Servicegebühr</td><td id="total">1,99</td><td>€</td></tr>
        <tr><td class="blank"></td><td class="blank"></td><td class="blank"></td></tr>
        <tr><td><b>Gesamt</b></td><td id="total">${(totalPrice + 1.99).toFixed(2).replace(`.`, ',')}</td><td>€</td></tr>
    </table>`;
    renderTotalPriceHidden();
}

function renderTotalPriceHidden(){
    document.getElementById('hiddenFinishButton').innerHTML = `Bezahlen (${(totalPrice + 1.99).toFixed(2).replace(`.`, ',')} €)`;
    if (totalPrice <= 10.00) { document.getElementById('hiddenFinishButton').style.backgroundColor= '#EFEDEA'}
    else {document.getElementById('hiddenFinishButton').style.backgroundColor= '#FF8000'}
}

function finishOrderHidden() {
    if (totalPrice >= 10) {
        document.getElementById('hiddenFinishButton').style.display ='none';
        document.getElementById('hiddenBasket').innerHTML = `<h1>Vielen Dank für Ihre Bestellung</h1>`
        document.getElementById('hiddenBasket').innerHTML += `<p> Die Bestellung wurde weitergeleitet, <br>wir wünschen Guten Appetit</p>`;
        setTimeout(() => { reset() }, 4000);
    }
}

function calcHidden(index, value) {
    menu[index]["count"] = menu[index]["count"] + value;
    totalPrice = 0;
    for (i = 0; i < menu.length; i++) { totalPrice = totalPrice + menu[i]["price"] * menu[i]["count"]; };
    renderBasket();
    renderHiddenBasket();
    saveLocalstorage();
}