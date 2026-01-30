const card=document.getElementById('card');
const cityinput=document.getElementById('cityinput');
const weatherform=document.getElementById('weatherform');
const apikey ="25c764b3d5ad92d6d5d4e4d5081c2425"

weatherform.addEventListener('submit',async event=>{
 event.preventDefault();
 const city=cityinput.value;
 if(city){
    try{
        const weatherdata=await fetchweather(city);
        displayweather(weatherdata);


    }
    catch(error){
        console.log(error); 
        DisplayError(error.message);
 }}
 else{
    DisplayError("Please enter a city name");
 }
});

async function fetchweather(city){


    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    const response=await fetch(apiurl);
    if(!response.ok){
        throw new Error ("City not found");
    }
    return await response.json();
}

function displayweather(data){
    console.log(data);
    const{name:city, 
        main:{temp,temp_min,temp_max,humidity}, 
        weather:[{id,main,description}],
          wind:{speed}}=data;
    
       card.textContent="";
        
        const weatherContainer = document.createElement("div");
        weatherContainer.className = "space-y-6";
        
        const citydisplay=document.createElement("h2");
        const tempdisplay=document.createElement("div");
        const humiditydisplay=document.createElement("div");
        const descriptiondisplay=document.createElement("div");
        const windspeeddisplay=document.createElement("div");
        const maxtempdisplay=document.createElement("div");
        const mintempdisplay=document.createElement("div");
        const maindisplay=document.createElement("div");

        citydisplay.textContent= `📍 ${city}`;
        citydisplay.className="text-center text-7xl font-extrabold text-white mb-8 drop-shadow-lg";
        
        tempdisplay.innerHTML=`<div class="bg-gradient-to-r from-red-400/20 to-orange-400/20 backdrop-blur-sm p-6 rounded-2xl border border-white/20"><span class="text-3xl font-bold text-white">🌡️ Temperature</span><br><span class="text-5xl font-extrabold text-yellow-200">${temp} °C</span></div>`;
        tempdisplay.className="space-y-3";
        
        humiditydisplay.innerHTML=`<div class="bg-gradient-to-r from-blue-400/20 to-cyan-400/20 backdrop-blur-sm p-6 rounded-2xl border border-white/20"><span class="text-3xl font-bold text-white">💧 Humidity</span><br><span class="text-5xl font-extrabold text-cyan-200">${humidity} %</span></div>`;
        humiditydisplay.className="space-y-3";
        
        windspeeddisplay.innerHTML=`<div class="bg-gradient-to-r from-teal-400/20 to-green-400/20 backdrop-blur-sm p-6 rounded-2xl border border-white/20"><span class="text-3xl font-bold text-white">💨 Wind Speed</span><br><span class="text-5xl font-extrabold text-green-200">${speed} m/s</span></div>`;
        windspeeddisplay.className="space-y-3";
        
        maxtempdisplay.innerHTML=`<div class="bg-gradient-to-r from-orange-400/20 to-red-400/20 backdrop-blur-sm p-6 rounded-2xl border border-white/20"><span class="text-3xl font-bold text-white">🔥 Max Temp</span><br><span class="text-5xl font-extrabold text-orange-200">${temp_max} °C</span></div>`;
        maxtempdisplay.className="space-y-3";
        
        mintempdisplay.innerHTML=`<div class="bg-gradient-to-r from-blue-400/20 to-indigo-400/20 backdrop-blur-sm p-6 rounded-2xl border border-white/20"><span class="text-3xl font-bold text-white">❄️ Min Temp</span><br><span class="text-5xl font-extrabold text-blue-200">${temp_min} °C</span></div>`;
        mintempdisplay.className="space-y-3";
        
        maindisplay.innerHTML=`<div class="bg-gradient-to-r from-yellow-400/20 to-amber-400/20 backdrop-blur-sm p-6 rounded-2xl border border-white/20"><span class="text-3xl font-bold text-white">⛅ Weather</span><br><span class="text-5xl font-extrabold text-yellow-100">${main}</span></div>`;
        maindisplay.className="space-y-3";

        descriptiondisplay.innerHTML=`<div class="bg-gradient-to-r from-purple-400/20 to-pink-400/20 backdrop-blur-sm p-6 rounded-2xl border border-white/20"><span class="text-3xl font-bold text-white">📝 Description</span><br><span class="text-4xl font-bold text-purple-200">${description}</span></div>`;
        descriptiondisplay.className="space-y-3";
        
       weatherContainer.appendChild(citydisplay);
       weatherContainer.appendChild(tempdisplay);
       weatherContainer.appendChild(humiditydisplay);
       weatherContainer.appendChild(windspeeddisplay);
       weatherContainer.appendChild(maxtempdisplay);
       weatherContainer.appendChild(mintempdisplay);
       weatherContainer.appendChild(maindisplay);
       weatherContainer.appendChild(descriptiondisplay);
       card.appendChild(weatherContainer);
      
    }
function DisplayError(message){
  const errordisplay=document.createElement("p");
  errordisplay.textContent=message;
  errordisplay.classList.add("error-message");
  card.textContent="";
  errordisplay.className="text-white-500 text-2xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 backdrop-blur-sm p-6 rounded-2xl border border-white/20"
  card.appendChild(errordisplay);

}





