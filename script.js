let loc = document.getElementById("location");
// var = location id ko uthnae k liye;

let tempicon = document.getElementById("temp-icon");

let climate = document.getElementById("climate");
let tempvalue = document.getElementById("temp-value");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");



//Featching location

window.addEventListener("load", () => 
    {
        let lon;
        let lat;
        if (navigator.geolocation) 
        {
                navigator.geolocation.getCurrentPosition((position) => 
                    {       //fetching current location corrdinate
                        lon=position.coords.longitude;
                        lat=position.coords.latitude;
                        // lat =  24.571270;
                        // lon = 73.691544;
                            //    api key for search acc to location 
                            //    step1. --> const api=` `;
                            //    step2. --> then paste api link and give two ${lat} ${lon} symbo;
                      
                            //we have to use proxy beacuse we are on local host
                            const proxy="http://cors-anywhere.herokuapp.com/"
                      
                            const api=`${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2a497d7336788c53b26c7d6af0d48009`
                             //fetch().then((response)) for fetching data from api
                        fetch(api).then
                        (
                            (response)=>
                            {
                            return response.json();
                            }
                        )
                        .then(data =>
                            {
                                //json data into normal 
                            const{name} =data;
                            const{feels_like}=data.main;
                            const{id,main} = data.weather[0]; 

                            loc.textContent=name;
                            climate.textContent=main;
                            tempvalue.textContent=Math.round(feels_like-273); // for converting into -273 degree
                            
                            if(id<300 && id>200){
                                //thunder storm
                                tempicon.src="./icon/storm.png"
                            }
                            else if(id<400 && id>300){
                                //thunder drizzle
                                tempicon.src="./icon/cloudsunrain.png"
                            }
                            else if(id<600 && id>500){
                                //thunder rain
                                tempicon.src="./icon/heavyrain.png"
                            }
                            else if(id<700 && id>600){
                                //thunder snow
                                tempicon.src="./icon/snow.png"
                            }
                            else if(id<800 && id>700){
                                //thunder cloud
                                tempicon.src="./icon/clouds-and-sun.png"
                            }
                            else if(id==800){
                                tempicon.src="./icon/sun.png"
                            }
                          
                            
                            console.log(data);
                            }
                        )
                    }
            )
        }
    }
);
//by Cities

//browser submisiion off

searchButton.addEventListener('click', (e)=>
{

e.preventDefault();
getWeather(searchInput.value);
searchInput.value='';


})

const getWeather=async (city)=>
{
    try{

        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2a497d7336788c53b26c7d6af0d48009`,
   
            {mode: 'cors'}
        );

        const weatherData= await response.json();
        console.log(weatherData);
        const{name}=weatherData;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];
       loc.textContent=name;
       climate.textContent=main;
       tempvalue.textContent=Math.round(feels_like-273); // for converting into -273 degree
      
                if(id<300 && id>200){
                    //thunder storm
                    tempicon.src="./icon/storm.png"
                    }
                else if(id<400 && id>300){
                    //thunder drizzle
                    tempicon.src="./icon/cloudsunrain.png"
                }
                else if(id<600 && id>500){
                    //thunder rain
                    tempicon.src="./icon/heavyrain.png"
                }
                else if(id<700 && id>600){
                    //thunder snow
                    tempicon.src="./icon/snow.png"
                }
                else if(id<800 && id>700){
                    //thunder cloud
                    tempicon.src="./icon/clouds-and-sun.png"
                }
                else if(id==800){
                    tempicon.src="./icon/sun.png"
                }
            
     }
    catch{
        alert('City Not Found');
    }
};