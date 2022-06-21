// https://www.coingecko.com/api/documentations/v3#/

const inputElement = document.querySelector('.input');
const outputElement = document.querySelector('.output');
const submit = document.querySelector('.submit');
const headerCoins = document.querySelector('.header-coins');
const headerMarket = document.querySelector('.header-market');
const headerVolume24 = document.querySelector('.header-volume24');
const headerDominance = document.querySelector('.header-dominance');
const closebtn = document.querySelector('.closebtn');


function search() {

    submit.addEventListener('click', (event) => {
        event.preventDefault()

        const request = async () => {

            const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
            const data = await response.json();

            for (let i = 0; i < data.length; i++) {
                if (data[i].id.replace(/\-/g, '') === inputElement.value.toLowerCase().replace(/\s/g, '')){

                let coinIdInfo = `https://api.coingecko.com/api/v3/coins/${data[i].id}`

                const coinResponse = await fetch(coinIdInfo);
                const coinData = await coinResponse.json();
                   
                const wrapper = document.createElement('div');
                wrapper.classList.add('wrapper');
             
                const imageElement = document.createElement('img');
                imageElement.classList.add('coin-image');
                imageElement.src = coinData.image.thumb;
                wrapper.appendChild(imageElement);

                const nameElement = document.createElement('p');
                nameElement.innerText = data[i].name;
                wrapper.appendChild(nameElement)

                const eur = document.createElement('p');
                eur.innerText = '€';
                wrapper.appendChild(eur)

                const priceElement = document.createElement('p');
                let price = coinData.market_data.current_price.eur.toLocaleString();
                priceElement.innerText = price;
                wrapper.appendChild(priceElement)
         
                outputElement.append(wrapper);
                }
            }
        };
        request();
    })
}

search()




const headerData = async () => {

    const getGlobalData = await fetch('https://api.coingecko.com/api/v3/global');
    const globalData = await getGlobalData.json();
    console.log(globalData);

    const coinsElement = document.createElement('p');
    coinsElement.innerText = globalData.data.active_cryptocurrencies;
    headerCoins.appendChild(coinsElement);

    const marketElement = document.createElement('p');
    marketElement.innerText = globalData.data.total_market_cap.eur.toLocaleString();
    headerMarket.appendChild(marketElement);

    const volume24Element = document.createElement('p');
    volume24Element.innerText = globalData.data.market_cap_change_percentage_24h_usd.toFixed(2);
    headerVolume24.appendChild(volume24Element);

    const dominanceElement = document.createElement('p');
    const btcElement = document.createElement('p');
    const btcPercentElement = document.createElement('p');
    btcElement.innerText = 'BTC:';
    btcPercentElement.innerText = '%';
    dominanceElement.innerText = globalData.data.market_cap_percentage.btc.toFixed(2);
    headerDominance.appendChild(btcElement);
    headerDominance.appendChild(dominanceElement);
    headerDominance.appendChild(btcPercentElement);

    const dominanceElement2 = document.createElement('p');
    const ethElement = document.createElement('p');
    const ethPercentElement = document.createElement('p');
    dominanceElement2.innerText = globalData.data.market_cap_percentage.eth.toFixed(2);
    ethElement.innerText = 'ETH:';
    ethPercentElement.innerText = '%';
    headerDominance.appendChild(ethElement);
    headerDominance.appendChild(dominanceElement2);
    headerDominance.appendChild(ethPercentElement);
}

headerData()

// https://api.coingecko.com/api/v3/search/trending