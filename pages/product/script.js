import { header } from "../../components/header.js";
import { createCards } from "../../components/productcards.js";
import { getData } from "../../libs/htpp.js";
import { formatNumber, reload } from "../../libs/utils.js";

header()

let title = document.querySelector('.product_title')
let orgPrice = document.querySelector('.price_good')
let discount = document.querySelector('.discount')
let descrGood = document.querySelector('.descr_good')
let descrItem = document.querySelector('.descr_item')

let images = document.querySelector('.main_img')

let id = localStorage.getItem("productId") 
console.log(id);
let db
getData(`goods?id=${id}`)
    .then(res => {
        console.log(res.data);
        db = res.data[0] 
         
        title.textContent = db.title 
        orgPrice.textContent = `${formatNumber(db.price)} сум`;
        discount.textContent = `${formatNumber(Math.round(db.price - (db.salePercentage * db.price / 100)))} сум`;
        descrGood.textContent = db.description
        descrItem.textContent = db.description
    })
    .catch(error => console.error(error))
    
getData(`goods`)
    .then(res => {
        reload(res.data.filter(item => item.type === db.type).slice(0, 10), '#similar', createCards)
    })
    .catch(error => console.error(error))