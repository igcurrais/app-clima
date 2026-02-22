const geoURL = "https://geocoding-api.open-meteo.com/v1/search?name=Buenos Aires&count=1"
const boton = document.getElementById("boton");
const resultado = document.getElementById("resultado");

const estados ={
   0: "Despejado ☀️",
   1: "Mayormente despejado 🌤️",
   2: "Parcialmente nublado ⛅",
   3: "Nublado ☁️",
   45: "Niebla 🌫️",
   61: "Lluvia 🌧️",
   95: "Tormenta ⛈️"
}

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
    
}

async function obtenerClima() {
    const ubicacion = await geoLocalizacion();
    
    if(!ubicacion)return;

    try{
        const climaURL = `https://api.open-meteo.com/v1/forecast?latitude=${ubicacion.latitud}&longitude=${ubicacion.longitud}&current_weather=true`;
        const res = await fetch(climaURL);
        const data = await res.json();

        console.log(data);
        const tempActual = data.current_weather.temperature;
        const cielo = data.current_weather.weathercode;
        resultado.innerHTML = "";
        const texto = document.createElement("h3");
        texto.textContent = `Temperatura actual en ${ubicacion.name} es de ${tempActual} con el cielo ${estados[cielo] || "Desconocido"}`;
        
        resultado.appendChild(texto);

    }catch(error){
        console.log(error);
    }    
}

boton.addEventListener("click",obtenerClima);