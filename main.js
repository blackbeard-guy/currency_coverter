const bankUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json.js'
let rates = {}

const inputEl = document.querySelector('#input')
const resultEl = document.querySelector('#result')
const selectEl = document.querySelector('#select')
const selectFEl = document.querySelector('#selectF')
const swapBtn = document.querySelector('.swapBtn')

async function getCurrenciesFromBank() {
    const resp = await fetch(bankUrl)
    const result = await resp.json()
    saveCurrencies(result)
    setCurrencies(rates)
}

function saveCurrencies(currencies) {  
        const selectFormEl = document.querySelector('.selectFrom')
        const selectToEl = document.querySelector('.selectTo')

        let ccEl = `<option value="UAH">UAH - Грн</option>`
        selectFormEl.insertAdjacentHTML('beforeend', ccEl)
        selectToEl.insertAdjacentHTML('beforeend', ccEl)
        rates.UAH = 1

    for (let currency of currencies) {
        let cc = currency.cc
        let ccName = currency.txt
        rates[cc] = currency.rate
        let ccEl = `<option value="${cc}">${cc} - ${ccName}</option>`
        selectFormEl.insertAdjacentHTML('beforeend', ccEl)
        selectToEl.insertAdjacentHTML('beforeend', ccEl)
    }
    
}

getCurrenciesFromBank()

function setCurrencies(rates) {
    for (let key in rates) {
        const currRateDiv = document.querySelector(`[data-value = "${key}"]`)
        if(currRateDiv) {
            // currRate = Math.floor(rates[key] * 100) / 100
            let currRate = rates[key].toFixed(2) // обрезаем символы после точки
            currRateDiv.innerText = currRate
        }
    }
}

// Действие при смене значения в инпуте
inputEl.oninput = () => countRate()
selectEl.oninput = () => countRate()
selectFEl.oninput = () => countRate()
swapBtn.addEventListener('click', (e) => {
    e.preventDefault()
    swapCuerrencies()
    countRate()
})

function countRate() {
    let currentRate
    if(selectFEl.value === 'UAH') {
        currentRate = rates[selectEl.value]
    } else {
        currentRate = rates[selectEl.value] / rates[selectFEl.value]
    }
    let convertedResult = inputEl.value / currentRate

    resultEl.value = convertedResult.toFixed(2)
}

function swapCuerrencies() {
    let s1 = selectFEl.value
    let s2 = selectEl.value
    let v2 = resultEl.value

    selectFEl.value = s2
    selectEl.value = s1
    inputEl.value = v2
}