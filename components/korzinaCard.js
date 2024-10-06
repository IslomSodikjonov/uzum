import { formatNumber } from "../libs/utils.js";

export function createKorzinaCard(item) {

    let card = document.createElement('div');
    card.classList.add('card_korz');

    let leftCard = document.createElement('div');
    leftCard.classList.add('left_card');
    
    let img = document.createElement('img');
    img.src = item.media[0]; 

    let rightCard = document.createElement('div');
    rightCard.classList.add('right_card');

    let title = document.createElement('h1');
    title.classList.add('title_korzina');
    title.textContent = item.title;

    let price = document.createElement('p');
    price.classList.add('price_korzina');
    price.textContent = `${formatNumber(Math.round(item.price - (item.salePercentage * item.price / 100)))} сум`; 

    let quantityBtn = document.createElement('div');
    quantityBtn.classList.add('quantity_btn');

    let reduceBtn = document.createElement('p');
    reduceBtn.classList.add('reduce');
    reduceBtn.setAttribute('id', 'btns_num');
    reduceBtn.textContent = '-';

    let numberGood = document.createElement('p');
    numberGood.classList.add('number_good');
    numberGood.textContent = '1';

    let addBtn = document.createElement('p');
    addBtn.classList.add('add');
    addBtn.setAttribute('id', 'btns_num');
    addBtn.textContent = '+';

    let removeBtn = document.createElement('button');
    removeBtn.classList.add('btn_remove');
    removeBtn.textContent = 'Удалить';
    
    card.append(leftCard, rightCard);
    leftCard.append(img);
    rightCard.append(title, price, quantityBtn, removeBtn);
    quantityBtn.append(reduceBtn, numberGood, addBtn);

    return card;
}