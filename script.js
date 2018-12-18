$(document).ready(function main(){
    $("#fade").hide(0).delay(1000).fadeIn(1000);
    let updateTime = setInterval(function updateTime() {
            let hourNow = moment().format("hh");
            let minuteNow = moment().format("mm");
            let dayWNow = moment().format("dddd");
            let dayNow = moment().format("DD");
            let monthYearNow = moment().format("MMMM, YYYY");
            let meridian = moment().format("a");
            hourNow = parseInt(hourNow);
            if (meridian === "pm"){
                hourNow += 12;
            }
            let timeNow = hourNow + ":" + minuteNow;
            $("#time-text").html(timeNow);
            let daySup = "th";

            if (dayNow === "1" || dayNow === "21" || dayNow === "31"){
                daySup = "st"
            } else if (dayNow === "2" || dayNow === "22"){
                daySup = "nd"
            } else if (dayNow === "3" || dayNow === "23"){
                daySup = "rd"
            } else {
                daySup = "th"
            }
            let dateNow = dayWNow + ", " + dayNow + '<sup>' + daySup + '</sup> of ' + monthYearNow;
            $("#time-date").html(dateNow);
            console.log("Test1");
        }, 1000
    );

    const screenWidth = screen.width;
    let imgSize = "";
    if (screenWidth <= 1920){
        imgSize = "large"
    } else if (screenWidth <= 3840){
        imgSize = "4k"
    } else {
        imgSize = "medium"
    }
    let imgId = Math.floor((Math.random() * 9) + 1);
    let url = `images/${imgSize}-${imgId}`;
    console.log(url);
    $(".background").css(`background-image`, `url("${url}.png")`);
    let updateWeather = function (){
        let weatherCity = "Auckland";
        Weather.setApiKey("77f2d3977d531530ec5e3788c6473c04");
        let currentTemp = 0;
        let currentCond = "";

        Weather.getCurrent(weatherCity, function(current){
            console.log(current.temperature());
            console.log(current.conditions());

            currentTemp = Math.round(Weather.kelvinToCelsius(current.temperature()) * 10) / 10;
            console.log(currentTemp);

            currentCond = current.conditions().replace(/\b\w/g, l => l.toUpperCase());
            console.log(currentCond);

            $(".weather").html(`<p>${currentTemp}<b class=\"small\">&deg;C - ${currentCond}</b><hr id=\"linebreak\"><p class=\"city\">${weatherCity}, NZ</p></p>`);
        });
    };
    updateWeather();
    let weather = setInterval(function (){
        updateWeather()
    }, 5000)
});