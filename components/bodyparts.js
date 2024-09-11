import { getData } from "../libs/htpp";
import { reload } from "../libs/utils";
import { createCards } from "./productcards";


export function createSection(item) {
    let section = document.createElement('section');
    let container = document.createElement('div');
    let popular = document.createElement('div');
    let titleCat = document.createElement('h1');
    let goodsCardsBox = document.createElement('div');
    let showMore = document.createElement('div');
    let showMoreBtn = document.createElement('button');

    section.className = item.type
    container.className = 'container';
    popular.className = 'popular';
    titleCat.className = 'title_cat';
    goodsCardsBox.className = 'goods_cards_box';
    showMore.className = 'show_more';
    showMoreBtn.className = 'show_more_btn';

    titleCat.textContent = item.catalog;
    showMoreBtn.textContent = 'Показать еще';
    goodsCardsBox.id = `${item.type}_products`;


    showMoreBtn.onclick = () => {
        getData(`goods`)
            .then(res => {
                if (showMoreBtn.textContent === 'Показать еще') {
                    goodsCardsBox.innerHTML = ''
                    reload(res.data.filter(elem => elem.type === item.type), `#${item.type}_products`, createCards)
                    showMoreBtn.textContent = 'Показать меньше'
                } else if (showMoreBtn.textContent === 'Показать меньше') {
                    section.scrollIntoView({ behavior: 'smooth' });
                    goodsCardsBox.innerHTML = ''
                    reload(res.data.filter(elem => elem.type === item.type).slice(0, 5), `#${item.type}_products`, createCards)
                    showMoreBtn.textContent = 'Показать еще'
                }
            })
            .catch(error => console.error(error))
    }


    showMore.appendChild(showMoreBtn);
    popular.appendChild(titleCat);
    popular.appendChild(goodsCardsBox);
    popular.appendChild(showMore);
    container.appendChild(popular);
    section.appendChild(container);

    return section;
}