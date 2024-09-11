import { formatNumber } from "../libs/utils.js";

export function createSwiperCards(item) {
    let swiperSlide = document.createElement('div');
    swiperSlide.className = 'swiper-slide';

    let swiperCard = document.createElement('div');
    swiperCard.className = 'swiper_card';

    let left = document.createElement('div');
    left.className = 'left';

    let right = document.createElement('div');
    right.className = 'right';

    let title = document.createElement('h1');
    title.className = 'title_swap';
    title.textContent = item.title;

    let price = document.createElement('p');
    price.className = 'price_swap';
    price.textContent = `${formatNumber(item.price)} сум`;

    let descr = document.createElement('p');
    descr.className = 'descr_swap';
    descr.textContent = item.description;

    
    let img = document.createElement('img');
    img.className = 'img_swap';
    img.src = item.media[0];
    
    swiperSlide.append(swiperCard)
    swiperCard.append(left, right);
    left.append(title, price, descr);
    right.append(img);


    return swiperSlide
}