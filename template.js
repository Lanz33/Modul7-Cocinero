function TemplateHtmlLeft() {
    return /*html*/`
    <div class="orderSection" id="content">
        <div class="localFlyer" id="localFlyer"></div>
        <div class="menu" id="menu"></div>
        <div class="hiddenBasket" id="hiddenBasket"></div>
        <div class="hiddenOrderButton" id="hiddenOrderButton" onclick="renderHiddenBasket()"></div>
    </div>`
}
    
function TemplateHtmlRight(){
    return /*html*/`
    <div class="basket" id="basket">
        <div class="basketHead" id="basketHead"></div>
        <div class="basketSection" id="basketSection"></div>
        <div class="subtotal" id="subtotal"></div>
        <div id="overViewCost"></div>
        <div class="basketPrice" id="basketPrice" onclick="finishOrder()"></div>
    </div>`;
}

function TemplateHiddenBasketHtml() {
    return /*html*/`
     <div class="basketHeadHidden" id="basketHeadHidden"></div>
        <div class="subtotalHidden" id="subtotalHidden"></div>
        <div id="overViewCostHidden"></div>
        <div id="hiddenBasketMinimum"></div> 
        <div class="back" id="back" onclick="render()">zurück</div>
        <div class="basketPriceHidden" id="basketPriceHidden" onclick="finishOrderHidden()"></div>
        <div class="hiddenFinishButton" id="hiddenFinishButton" onclick="finishOrderHidden()"></div>    
    </div>
    `;
}

function TemplateMenu(i){
    return /*html*/`
    <div class="recipe" onclick="moveToBasket(${i})">    
        <img class="recipePic" src="${menu[i]["url"]}">
        <div class="description"> 
            <div>
                <div class="name" id=recipe${i}>${menu[i]["name"]}</div><div class="price" id=price${i}>${menu[i]["price"]} €</div>
            </div>    
            <div id="ingredients${i}" class="ingredient"></div>
            <img id="orderButton${i}" class="orderButton"  src="./img/plus.png">
    </div>`;
}

function TemplateTable(i) {
    document.getElementById('basketSection').innerHTML += /*html*/`
    <table id="order"><tr>
        <td id="order">${menu[i]["name"]} </td>
        <td id="order"><img src="./img/minus.png" class="orderButton" onclick="calc(${i}, -1)"></td>
        <td id="order">${menu[i]["count"]}</td>
        <td id="order"><img src="./img/plus.png" class="orderButton" onclick="calc(${i}, 1)"></td>
        <td id="order">${(menu[i]["price"] * menu[i]["count"]).toFixed(2).replace(`.`, ',')}  </td>
        <td id="order">€</td><br>
    </tr></table>`;
}

function TemplateTableHidden(i) {
    document.getElementById('subtotalHidden').innerHTML += /*html*/`
    <table id="order"><tr>
        <td id="order">${menu[i]["name"]} </td>
        <td id="order"><img src="./img/minus.png" class="orderButton" onclick="calcHidden(${i}, -1)"></td>
        <td id="order">${menu[i]["count"]}</td>
        <td id="order"><img src="./img/plus.png" class="orderButton" onclick="calcHidden(${i}, 1)"></td>
        <td id="order">${(menu[i]["price"] * menu[i]["count"]).toFixed(2).replace(`.`, ',')}  </td>
        <td id="order">€</td><br>
    </tr></table>`;
}