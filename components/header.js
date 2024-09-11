export function header() {
    let header = document.querySelector('header')

    header.innerHTML = `
    <div class="container">
        <div class="head_box">
        <div class="logo_box">
            <img src="./logo.svg" alt="" class="uzum_logo">
        </div>
        <button class="catalog_btn">Каталог</button>

        <div class="search_box">
            <input type="text" placeholder="Искать товары" class="search_pro">
            <img src="./search.svg" alt="" class="icon_search">
        </div>

        <div class="head_boxs">
            <img src="./profile.svg" alt="">
            <p class="head_p">Войти</p>
        </div>

        <p class="head_p">Избранное</p>

        <div class="head_boxs">
            <p class="head_p">Корзина</p>
            <div class="items_num">
                <p class="num_good">13</p>
            </div>
        </div>
        </div>
    </div>
    `
}