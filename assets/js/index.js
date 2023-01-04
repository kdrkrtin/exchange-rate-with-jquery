$(document).ready(function () {
    const API_URL = "https://api.exchangerate.host";
    const excData = [
        {
            name: 'USD',
            img: 'group-7@2x.jpg',
            tag: 'Amerikan Doları'
        },
        {
            name: 'EUR',
            img: 'group-3@2x.jpg',
            tag: 'Avrupa Para Birimi'
        },
        {
            name: 'JPY',
            img: 'group-5@2x.png',
            tag: 'Japon Yeni'
        },
        {
            name: 'GBP',
            img: 'group-3@2x.png',
            tag: 'İngiliz Sterlini'
        },
        {
            name: 'DKK',
            img: 'group-3@2x-2.jpg',
            tag: 'Danimarka Kronu'
        },
        {
            name: 'NOK',
            img: 'group-3@2x-3.jpg',
            tag: 'Norveç Kronu'
        }
    ]
    const excTemp = $('.exchange__wrapper .exchange__col .row');
    const excInp = $('.exchange__calc-inp input');
    const excResult = $('.exchange__result p');
    const selectedValue = $('.exchange__select');

    $.ajax({
        url: `${API_URL}/latest?base=TRY&symbols=USD,TRY,EUR,JPY,GBP,DKK,NOK`,
        type: 'GET',
        dataType: 'json',
        success: (res) => {
            renderExchange(res.rates)
        }
    });

    // FUNCTIONS


    selectedValue.change(function(){
        if (excInp.val()) convertAmount();
    })

    excInp.keyup(function(e){
        convertAmount(e.target.value);
    })

    renderExchange = (exc) => {
        excData.map((exchange) => {
            exchange.rate = exc[exchange.name];
            excTemp.append(`
            <div class="exchange__item-col">
                <div class="exchange__item d-flex justify-content-between">
                    <div class="exchange__left d-flex">
                        <div class="exchange__img">
                            <img src="./assets/img/${exchange.img}">
                        </div>
                        <div class="exchange__currency">
                            <p class="currency-name">${exchange.name}</p>
                            <span class="currency-title">${exchange.tag}</span>
                        </div>
                    </div>
                    <div class="exchange__right">
                        <div class="exchage__right-wrapper d-flex">
                            <div class="exchange__buying text-end">
                                <p>Alış</p>
                                <span>${(1 / exc[exchange.name]).toFixed(4)}</span>
                            </div>
                            <div class="exchange__sales text-end">
                                <p>Satış</p>
                                <span>${(1 / exc[exchange.name]).toFixed(4)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
            `)
        })
    }

    convertAmount = (val = excInp.val()) => {
        const data = excData.filter((item) => item.name === selectedValue.val())
        excResult.text(((1 / data[0].rate) * Number(val)).toFixed(2));
    }
})