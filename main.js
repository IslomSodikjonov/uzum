import Swiper from "swiper";
import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';
// import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/scrollbar";
import { header } from "./components/header.js";
import { createCards } from "./components/productcards.js";
import { getData } from "./libs/htpp.js";
import { formatNumber, reload } from "./libs/utils.js";
import { createSwiperCards } from "./components/swipercards.js";
import { createSection } from "./components/bodyparts.js";

header()

getData(`goods`)
    .then(res => {
        reload(res.data.filter(item => item.rating >= 5).slice(0, 10), '#main_swap', createSwiperCards)
        let swiper = new Swiper(".mySwiper", {
            modules: [Navigation, Pagination, Autoplay],
            slidesPerView: 1,
            spaceBetween: 10,
            centeredSlides: true,
            loop: true,
            slidesPerGroup: 1,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            
        });
    })
    .catch(error => console.error(error))

getData(`goods`)
    .then(res => {
        const uniqueCombinations = new Set();

        res.data.forEach(item => {
        uniqueCombinations.add(`${item.type}|${item.catalog}`);
        });

        const result = Array.from(uniqueCombinations).map(entry => {
        const [type, catalog] = entry.split('|');
        return { type, catalog };
        });
        console.log(result);
        reload(result, 'body', createSection)

    })
    .catch(error => console.error(error))

getData(`goods`)
    .then(res => {
        reload(res.data.filter(item => item.rating >= 5).slice(0, 10), '#popular_products', createCards)
        reload(res.data.filter(item => item.type === 'furniture').slice(0, 5), '#furniture_products', createCards)
        reload(res.data.filter(item => item.type === 'PC').slice(0, 5), '#PC_products', createCards)
        reload(res.data.filter(item => item.type === 'audio').slice(0, 5), '#audio_products', createCards)
        reload(res.data.filter(item => item.type === 'TV').slice(0, 5), '#TV_products', createCards)
        reload(res.data.filter(item => item.type === 'kitchen').slice(0, 5), '#kitchen_products', createCards)
    })
    .catch(error => console.error(error))

let showMorePopular = document.querySelector('#show_more_popular') 
let popularBox = document.querySelector('#popular_products')
let sectionPopular = document.querySelector('#part_popular')
showMorePopular.onclick = () => {
    getData(`goods`)
        .then(res => {
            if (showMorePopular.textContent === 'Показать еще') {
                popularBox.innerHTML = ''
                reload(res.data.filter(item => item.rating >= 5), '#popular_products', createCards)
                showMorePopular.textContent = 'Показать меньше'
            } else if (showMorePopular.textContent === 'Показать меньше') {
                sectionPopular.scrollIntoView({ behavior: 'smooth' });
                popularBox.innerHTML = ''
                reload(res.data.filter(item => item.rating >= 5).slice(0, 10), '#popular_products', createCards)
                showMorePopular.textContent = 'Показать еще'
            }
        })
        .catch(error => console.error(error))
}

let catHeadbtns = document.querySelectorAll('.cat_btn');

catHeadbtns.forEach((btn) => {
    btn.onclick = () => {
        let category = btn.getAttribute('category');
        let place = document.querySelector(`[class="${category}"]`);
        
        
        place.scrollIntoView({ behavior: 'smooth' });
    };
});