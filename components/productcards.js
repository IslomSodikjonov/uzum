import { formatNumber } from "../libs/utils.js";

export function createCards(item) {
    let productCard = document.createElement('div');
    productCard.className = 'product_card';

    let productImg = document.createElement('div');
    productImg.className = 'product_img';

    let goodImg = document.createElement('img');
    goodImg.src = item.media[0];
    
    let saved = document.createElement('div');
    saved.className = 'saved';

    let savedImg = document.createElement('img');
    savedImg.className = 'saved_img_like';
    savedImg.setAttribute('data-id', item.id); 
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites.includes(item.id)) {
        savedImg.src = '/savedcard.svg';  
    } else {
        savedImg.src = '/like.svg';  
    }

    let cardBottom = document.createElement('div');
    cardBottom.className = 'card_bottom';

    let nameProduct = document.createElement('p');
    nameProduct.className = 'name_product';
    nameProduct.textContent = item.title;

    let orgPrice = document.createElement('p');
    orgPrice.className = 'org_price';
    orgPrice.textContent = `${formatNumber(item.price)} сум`;

    let price = document.createElement('p');
    price.className = 'price';
    price.textContent = `${formatNumber(Math.round(item.price - (item.salePercentage * item.price / 100)))} сум`;

    let basketBtn = document.createElement('div');
    basketBtn.className = 'basket_btn';

    let basketImg = document.createElement('img');
    basketImg.src = '/basket.svg';

    productCard.append(saved, productImg, cardBottom, basketBtn);
    saved.append(savedImg);
    productImg.append(goodImg);
    cardBottom.append(nameProduct, orgPrice, price);
    basketBtn.append(basketImg);

    productImg.onclick = () => {
        localStorage.setItem('productId', item.id);
        window.location.href = '/pages/product/';
    };

    savedImg.onclick = () => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (favorites.includes(item.id)) {
            favorites = favorites.filter(favId => favId !== item.id);
            savedImg.src = '/like.svg'; 
        } else {
            favorites.push(item.id);
            savedImg.src = '/savedcard.svg';  
        }

        localStorage.setItem('favorites', JSON.stringify(favorites));

        let savedImages = document.querySelectorAll(`.saved_img_like[data-id='${item.id}']`);

        savedImages.forEach(img => { 
            if (favorites.includes(item.id)) {
                img.src = '/savedcard.svg';
            } else {
                img.src = '/like.svg';
            }
        });
    };

    return productCard;
}