
//const geoURL = "https://geocoding-api.open-meteo.com/v1/search?name=Buenos Aires&count=1"
const boton = document.getElementById("boton");
const resultado = document.getElementById("resultado");
const ciudad = document.getElementById("ciudad");
const cards = document.getElementById("cards");

const lugares = {
    sanMartin: {name: "General San Martin",latitud:-34.57789,longitud:-58.53864},
    ballester: {name: "Villa Ballester",latitud:-34.54531,longitud:-58.55919},
    belgrano: {name: "Belgrano",latitud:-34.5627,longitud:-58.45829},
    villaLuro: {name: "Villa Luro",latitud:-34.63814,longitud:-58.50273},
    marDelPlata: {name:"Mar Del Plata",latitud:-38.00042,longitud:-57.5562},
    ushuaia: {name:"Ushuaia",latitud:-54.81084,longitud:-68.31591},

}

const estados ={
   0: "Despejado ☀️",
   1: "Mayormente despejado 🌤️",
   2: "Parcialmente nublado ⛅",
   3: "Nublado ☁️",
   45: "Niebla 🌫️",
   61: "Lluvia 🌧️",
   95: "Tormenta ⛈️"
}
/*
async function geoLocalizacion() {
    let data;
    try {
        const res = await fetch(geoURL);
        data = await res.json();
        console.log(data);
    }catch (error){
        console.log(error);
    }
    if (data.results && data.results.length > 0) {
        return{
            name: data.results[0].name,
            latitud: data.results[0].latitude,
            longitud: data.results[0].longitude
        };        
    } else {
        return null;
    }
    
}*/

async function obtenerClima(lugarselect) {
    //const ubicacion = await geoLocalizacion();
    //if(!ubicacion)return;
    

    try{
        const climaURL = `https://api.open-meteo.com/v1/forecast?latitude=${lugares[lugarselect].latitud}&longitude=${lugares[lugarselect].longitud}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,weather_code&timezone=auto&current_weather=true`;
        const res = await fetch(climaURL);
        const data = await res.json();

        console.log(data);
        const tempActual = data.current_weather.temperature;
        const cielo = data.current_weather.weathercode;
        resultado.innerHTML = "";
        const texto = document.createElement("h3");
        texto.textContent = `Temperatura actual en ${lugares[lugarselect].name} es de ${tempActual} con el cielo ${estados[cielo] || "Desconocido"}`;
        
        cards.innerHTML = "";

        for(let i = 1;i< 4;i++){
            const tempMax = data.daily.temperature_2m_max[i];
            const tempMin= data.daily.temperature_2m_min[i];
            const cieloDias = data.daily.weather_code[i];

            const fechaString = data.daily.time[i];
            const fecha = new Date(fechaString + "T00:00:00");
            const formateador = new Intl.DateTimeFormat("es-AR", {
                weekday: "long"
            });
            let nombreDia = formateador.format(fecha);

            const contenedor = document.createElement("div");
            contenedor.classList.add("contenedor");
            const dia = document.createElement("h4");
            dia.textContent = nombreDia;
            const sky = document.createElement("p");
            sky.textContent = `${estados[cieloDias]}`;
            const max = document.createElement("p");
            max.textContent = `Maxima: ${tempMax}`;
            const min = document.createElement("p");
            min.textContent = `Minima: ${tempMin}`;

            contenedor.appendChild(dia);
            contenedor.appendChild(sky);
            contenedor.appendChild(max);
            contenedor.appendChild(min);
            cards.appendChild(contenedor);
        }




        resultado.appendChild(texto);

    }catch(error){
        console.log(error);
    }    
}

boton.addEventListener("click", ()=>{
    let lugarselect = ciudad.value;
    obtenerClima(lugarselect);
});

