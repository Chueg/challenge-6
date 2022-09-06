
//input and list
var cityInput = document.getElementById("cityInput");
var list = document.getElementById("cityList");

//city forecast
var currentDate = document.getElementById("cityDate");
var currentTemp = document.getElementById("temp");
var currentWind = document.getElementById("wind");
var currentHumidity = document.getElementById("humidity");
var currentUVI = document.getElementById("UVI");

//5 day forecast variables in order


var date0 = document.getElementById("date0");
var friend0 = document.getElementById("friend0");
var dingy0 = document.getElementById("dingy0");
var windy0 = document.getElementById("windy0");
var humid0 = document.getElementById("humid0");

var date1 = document.getElementById("date1");
var friend1 = document.getElementById("friend1");
var dingy1 = document.getElementById("dingy1");
var windy1 = document.getElementById("windy1");
var humid1 = document.getElementById("humid1");

var date2 = document.getElementById("date2");
var friend2 = document.getElementById("friend2");
var dingy2 = document.getElementById("dingy2");
var windy2 = document.getElementById("windy2");
var humid2 = document.getElementById("humid2");

var date3 = document.getElementById("date3");
var friend3 = document.getElementById("friend3");
var dingy3 = document.getElementById("dingy3");
var windy3= document.getElementById("windy3");
var humid3 = document.getElementById("humid3");

var date4 = document.getElementById("date4");
var friend4 = document.getElementById("friend4");
var dingy4 = document.getElementById("dingy4");
var windy4 = document.getElementById("windy4");
var humid4 = document.getElementById("humid4");

var input = "";

//submit abd sy botton
var submit  = document.getElementById("search");

//button list barialbei
var bungo = document.getElementsByClassName("bungo");
var bungo = Array.from(bungo);
var winky = false;

//array of objects
var cityList = [];

//temp lat and long for api call
var tempLat =0;
var tempLong =0;
//
var lump = undefined;


function init() {
    var storedBtns = JSON.parse(localStorage.getItem("Cities"));
    if (storedBtns !== null) {
    cityList = storedBtns;
    }
  }


function storeBtns() {
    
    localStorage.setItem("Cities", JSON.stringify(cityList));
  }

function setInput(){
    input = cityInput.value;
    if(cityInput.length ==0)
    {
        return;
    }
    
    cityInput.value = "";

}

function inputButton(hoopla){
    

    input = hoopla.textContent;
    cityInput.value = "";
    
}

function apiCall()
{
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=59d462275a051f39362a74d24de5a331`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    lump = data.length;
    if(data.length == 0)
    {
        return;
    }
    tempLat = data[0].lat;
    tempLong = data[0].lon;


    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${tempLat}&lon=${tempLong}&exclude=hourly,minutely,alerts&appid=59d462275a051f39362a74d24de5a331&units=imperial`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        informationFill(data);
        uviColor(data);
    });

  });

  


}

function uviColor(data){
    var lunch = data.current.uvi;
    console.log(lunch);

    if(lunch <= .3)
    {
        currentUVI.removeAttribute('class');
        currentUVI.classList.add("uviGreen");
    }
        
    else if(.3 < lunch < .5)
    {
        currentUVI.removeAttribute('class');
        currentUVI.classList.add("uviYellow");
    }
    else if(.5 <= lunch)
    {
        currentUVI.removeAttribute('class');
        currentUVI.classList.add("uviRed");
    }

}


function apiCall2()
{
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=59d462275a051f39362a74d24de5a331`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    lump = data.length;
    if(data.length == 0)
    {
        return;
    }
    tempLat = data[0].lat;
    tempLong = data[0].lon;


    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${tempLat}&lon=${tempLong}&exclude=hourly,minutely,alerts&appid=59d462275a051f39362a74d24de5a331&units=imperial`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        informationFill(data);
        addToList();
        storeBtns();
        uviColor(data);
    });

  });
  

  


}

function informationFill(data)
{
    currentDate.textContent = input + `\n`+ moment().format('L') + mainIcon(data); 
    currentTemp.textContent = `Temp : ` +data.current.temp + `° F`;
    currentWind.textContent = `Wind Speed : ` + data.current.wind_speed + ` MPH`;
    currentHumidity.textContent = `Humidity : ` + data.current.humidity+ `%`;
    currentUVI.textContent = `UVI: `+ data.current.uvi;

    let i = 0;
    date0.textContent = moment().add(1, 'days').format('L');
        friend0.textContent = icon(data, i);
        dingy0.textContent = `Temp : ` +data.daily[i].temp.day + `° F`;
        windy0.textContent = `Wind Speed : ` + data.daily[i].wind_speed+ ` MPH`;
        humid0.textContent = `Humidity : ` + data.daily[i].humidity+ `%`;
        i++;
        date1.textContent = moment().add(2, 'days').format('L');
        friend1.textContent = icon(data, i);
        dingy1.textContent = `Temp : ` + data.daily[i].temp.day + `° F`;
        windy1.textContent = `Wind Speed : ` + data.daily[i].wind_speed+ ` MPH`;
        humid1.textContent = `Humidity : ` + data.daily[i].humidity+ `%`;
        i++;
        date2.textContent = moment().add(3, 'days').format('L');
        friend2.textContent = icon(data, i);
        dingy2.textContent = `Temp : ` + data.daily[i].temp.day + `° F`;
        windy2.textContent = `Wind Speed : ` + data.daily[i].wind_speed+ ` MPH`;
        humid2.textContent = `Humidity : ` + data.daily[i].humidity+ `%`;
        i++;
        date3.textContent = moment().add(4, 'days').format('L');
        friend3.textContent = icon(data, i);
        dingy3.textContent = `Temp : ` + data.daily[i].temp.day + `° F`;
        windy3.textContent = `Wind Speed : ` + data.daily[i].wind_speed+ ` MPH`;
        humid3.textContent = `Humidity : ` + data.daily[i].humidity+ `%`;
        i++;
        date4.textContent = moment().add(5, 'days').format('L');
        friend4.textContent = icon(data, i);
        dingy4.textContent = `Temp : ` + data.daily[i].temp.day + `° F`;
        windy4.textContent = `Wind Speed : ` + data.daily[i].wind_speed+ ` MPH`;
        humid4.textContent = `Humidity : ` + data.daily[i].humidity+ `%`;

}

function icon(data, i)
{
    switch (data.daily[i].weather[0].main) {
        case 'Clouds':
            return '☁';
        case 'Rain':
        return '🌧';
        case 'Clear':
        return '☀';
        case 'Thunderstorm':
        return '⛈';
        default:
            break;
    }
}

function mainIcon(data)
{
    switch (data.current.weather[0].main) {
        case 'Clouds':
            return '☁';
        case 'Rain':
        return '🌧';
        case 'Clear':
        return '☀';
        case 'Thunderstorm':
        return '⛈';
        default:
            break;
    }
}

function verifyDupes()
{
    for(let i = 0; i<cityList.length; i++)
    {

        if(input == cityList[i])
        {
            return true;
        }
        
    }
    return false;
}


function addToList()
{
    if(input.length ==0)
    {
        return;
    }  
    if(verifyDupes() === true)
    {
        return;
    }
    if(lump == 0)
    {

        return;
    }
    else{
        var bu = document.createElement("button");
        bu.textContent = input;
        bu.classList.add("epicBtn");
        bu.classList.add("bungo");
        list.appendChild(bu);
        cityList.push(input);
    }
    
}

function makeList()
{
    for(let i = 0; i<cityList.length; i++)
    {
        var bu = document.createElement("button");
    bu.textContent = cityList[i];
    bu.classList.add("epicBtn");
    bu.classList.add("bungo");
    list.appendChild(bu);
    }
}








submit.addEventListener("click", function(event)
{   
    setInput();

    apiCall2();
    

    
});

list.addEventListener("click", function(event)
{
    let hoopla = event.target;
    inputButton(hoopla);
    storeBtns();
    apiCall();
} );


init();
makeList();