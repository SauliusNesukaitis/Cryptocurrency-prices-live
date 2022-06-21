// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d

const table = document.querySelector('table');
const tbody = document.querySelector('tbody');


const getTableData = async () => {

    const getId = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1');
    const coinData = await getId.json();

    // console.log(coinData);

    table.style.display = "flex";

    for (let i = 0; i < coinData.length; i++) {

        const newRow = document.createElement('tr');

        const marketCapRank = document.createElement('td');
        marketCapRank.innerText = coinData[i].market_cap_rank;
        newRow.appendChild(marketCapRank);


        const name = document.createElement('td');
        const imageElement = document.createElement('img');
        imageElement.classList.add('table-coin-image');
        imageElement.src = coinData[i].image;
        name.innerText = coinData[i].name;
        name.appendChild(imageElement);
        newRow.appendChild(name);
        

        const price = document.createElement('td');
        const priceDiv = document.createElement('div');
        const priceElement = document.createElement('p');
        const priceCurrency = document.createElement('p');
        priceDiv.appendChild(priceCurrency);
        priceDiv.appendChild(priceElement);
        priceDiv.classList.add('tableDataDivElement');
        priceCurrency.innerText = '€';
        priceElement.innerText = coinData[i].current_price.toLocaleString();
        price.appendChild(priceDiv);
        newRow.appendChild(price);

 
        const priceChange24h = document.createElement('td');
        const priceChange24hDiv = document.createElement('div');
        const priceChange24hElement = document.createElement('p');
        const priceChange24hPercent = document.createElement('p');
        priceChange24hDiv.appendChild(priceChange24hElement);
        priceChange24hDiv.appendChild(priceChange24hPercent);
        priceChange24hDiv.classList.add('tableDataDivElement');
        priceChange24hPercent.innerText = '%';
        priceChange24hElement.innerText = coinData[i].price_change_percentage_24h.toFixed(2);
        if (coinData[i].price_change_percentage_24h > 0) {
            priceChange24h.style.color = "green"
        } else {
            priceChange24h.style.color = "red";
            // priceChange24h.innerText = Math.abs(coinData[i].price_change_percentage_24h)
        }
        // priceChange24h.classList.add('td2');
        priceChange24h.appendChild(priceChange24hDiv);
        newRow.appendChild(priceChange24h);


        const marketCap = document.createElement('td');
        const marketCapDiv = document.createElement('div');
        const marketCapElement = document.createElement('p');
        const marketCapCurrency = document.createElement('p');
        marketCapDiv.appendChild(marketCapCurrency);
        marketCapDiv.appendChild(marketCapElement);
        marketCapDiv.classList.add('tableDataDivElement');
        marketCapCurrency.innerText = '€';
        marketCapElement.innerText = coinData[i].market_cap.toLocaleString();
        marketCap.appendChild(marketCapDiv);
        newRow.appendChild(marketCap);


        const totalVolume = document.createElement('td');
        const totalVolumeDiv = document.createElement('div');
        const totalVolumeElement = document.createElement('p');
        const totalVolumeCurrency = document.createElement('p');
        totalVolumeDiv.appendChild(totalVolumeCurrency);
        totalVolumeDiv.appendChild(totalVolumeElement);
        totalVolumeDiv.classList.add('tableDataDivElement');
        totalVolumeCurrency.innerText = '€';
        totalVolumeElement.innerText = coinData[i].total_volume.toLocaleString();
        totalVolume.appendChild(totalVolumeDiv);
        newRow.appendChild(totalVolume);


        tbody.append(newRow);
    }

};

getTableData()