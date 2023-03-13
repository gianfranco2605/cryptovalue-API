// 804a6baab95a7258a8d663761e8c8dd6f9b0af18e63a44ade6c2eeb7cfa612cd

// https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR

const cryptoMonedasSelect = document.querySelector("#cryptomonedas");
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector("#formulario");
const resultado = document.querySelector('#resultado');

const objBusqueda = {
    moneda: '',
    cryptomoneda: ''
}  ;

const obtenerCryptoMonedas = cryptomonedas => new Promise((resolve) => {
    resolve(cryptomonedas)

    
});



document.addEventListener('DOMContentLoaded', () => {
    consultarCryptoMonedas();

    formulario.addEventListener('submit', submitFormulario);

    cryptoMonedasSelect.addEventListener('change', leervalor);

    monedaSelect.addEventListener('change', leervalor);


    
})
 
function consultarCryptoMonedas() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

   

    fetch(url) 
        .then( respuesta => respuesta.json())
        .then ( resultado => obtenerCryptoMonedas(resultado.Data))
        .then ( cryptomonedas => selectCryptoMonedas(cryptomonedas))

};

function selectCryptoMonedas(cryptomonedas) {
    cryptomonedas.forEach( crypto => {
        const { FullName, Name } = crypto.CoinInfo;

        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        cryptoMonedasSelect.appendChild(option);
    })
}

function leervalor(e) {
    objBusqueda[e.target.name] = e.target.value;
    console.log(objBusqueda);

}

function submitFormulario(e) {
    e.preventDefault();

   

    const { moneda, cryptomoneda } = objBusqueda;

    if(moneda === '' || cryptomoneda === '') {
        mostrarAlerta('Tutti i campi sono obligatori');
        return;
    }

    consultatApi();
        
    // CONSULTAR API CON LOS RESULTADOS
    
}

function mostrarAlerta(msg) {
    
    const existeError = document.querySelector('.error');

    if(!existeError) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('error');

        //MENSAJE ERROR
        divMensaje.textContent = msg;

        formulario.appendChild(divMensaje);

        setTimeout( () => {
            divMensaje.remove();
        },3000);
    }
}

function consultatApi() {
    const { moneda, cryptomoneda } = objBusqueda;

    mostraSpinner();

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptomoneda}&tsyms=${moneda}`;


    fetch(url) 
        .then( respuesta => respuesta.json())
        .then( cotizacion => {
            mostrarCotizacionHtml(cotizacion.DISPLAY[cryptomoneda][moneda]);
        })

}

function mostrarCotizacionHtml(cotizacion) {

    limpiarHtml()

    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE, IMAGEURL } = cotizacion;

    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = `Ilprezzo è di <span>${PRICE}</span>`;

    const precioAlto = document.createElement('p');
    precioAlto.innerHTML  = `Il prezzo più alto del giorno ${HIGHDAY}`

    const precioBajo = document.createElement('p');
    precioBajo.innerHTML  = `Il prezzo più alto del giorno ${LOWDAY}`

    const ultimasHoras = document.createElement('p');
    ultimasHoras.innerHTML  = `Nel le ultime 24 ore il prezzo e di ${CHANGEPCT24HOUR}`

    const ultimasActualizaciones = document.createElement('p');
    ultimasActualizaciones.innerHTML  = `Nel le ultime 24 ore il prezzo e di ${CHANGEPCT24HOUR}`

    
    resultado.appendChild(precio);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(ultimasHoras);
    resultado.appendChild(ultimasActualizaciones);

}

function limpiarHtml() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function mostraSpinner() {
    limpiarHtml();

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `;

    resultado.appendChild(spinner);
}

