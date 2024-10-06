import { header } from "../../components/header.js";
import { createCards } from "../../components/productcards.js";
import { getData } from "../../libs/htpp.js";
import { reload } from "../../libs/utils.js";

header()
 
let savedProduct = document.querySelector('#saved_products');
let emptyImg = document.querySelector('.center_sec');
let savedBody = document.querySelector('.saved_items_body');
let allData = [];

function loadFavorites() {
    let idArray = JSON.parse(localStorage.getItem("favorites")) || [];
    idArray = idArray.map(Number);

    console.log(idArray);

    if (idArray.length > 0) {
        emptyImg.style.display = 'none';
        savedBody.style.display = 'block';

        Promise.all(
            idArray.map(id => getData(`goods?id=${id}`)) 
        )
        .then(responses => {
            allData = responses.map(res => res.data); 
            console.log(allData);

            reloadSaved(); 
        })
        .catch(error => console.error(error));
    } else {
        emptyImg.style.display = 'block';
        savedBody.style.display = 'none';
    }
}

function reloadSaved() {
    savedProduct.innerHTML = ''; 
    reload(allData.flat(), '#saved_products', createCards);

    let likeButtons = document.querySelectorAll('.saved_img_like');

    likeButtons.forEach(likeButton => {
        likeButton.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId, 10); 
            
            let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            favorites = favorites.filter(id => id !== productId);
            localStorage.setItem("favorites", JSON.stringify(favorites));

            loadFavorites();
        });
    });
}

loadFavorites();