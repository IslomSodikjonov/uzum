export function reload(arr, place, Component) {
    let box = document.querySelector(`${place}`)
    for (let item of arr) {
        let elem = Component(item)

        box.append(elem)
    }
}

export function formatNumber(number) {
    return number.toLocaleString('en-US'); 
}

