$(document).ready(function main(){
    /* Time Element */
    $("#fade").hide(0).delay(1000).fadeIn(1800);
    let updateTime = setInterval(function updateTime() {
            let hourNow = moment().format("hh");
            let minuteNow = moment().format("mm");
            let dayWNow = moment().format("dddd");
            let dayNow = moment().format("DD");
            let monthYearNow = moment().format("MMMM, YYYY");
            let meridian = moment().format("a");
            hourNow = parseInt(hourNow);
            minuteNow = parseInt(minuteNow);

            let dateText;
            if ((hourNow > 5 && 12 > hourNow) || (hourNow === 5 && minuteNow >= 30)){
                dateText = "Good Morning!";
            } else if (hourNow > 11 && 18 > hourNow) {
                dateText = "Good Afternoon!";
            } else {
                dateText = "Good Evening!";
            }

            console.log(hourNow, ":", minuteNow);
            $(".greeting-text").html(dateText);

            if (hourNow === 12){
                hourNow -= 12;
            }
            if (meridian === "pm"){
                hourNow += 12;
            }
            let hourNowStr = hourNow.toString();
            let minuteNowStr = minuteNow.toString();
            let timeNow = hourNowStr.padStart(2, "0") + ":" + minuteNowStr.padStart(2, "0");
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
            console.log(timeNow);
        }, 1000
    );

    /* Background Scripts */
    const screenWidth = screen.width;
    let imgSize = "";
    if (screenWidth <= 1920){
        imgSize = "large"
    } else if (screenWidth > 1920){
        imgSize = "4k"
    } else {
        imgSize = "large"
    }
    let imgId = Math.floor((Math.random() * 9) + 1);
    let url = `images/${imgSize}-${imgId}`;
    console.log("BACKGROUND IMAGE USED:" + url);
    $(".background").css(`background-image`, `url("${url}.png")`);


    let userCity = geoplugin_city();
    console.log("USER CITY DETECTED:" + userCity);

    let userCountry = geoplugin_countryName();
    console.log("USER COUNTRY DETECTED:" + userCountry);

    /* Weather Element */
    let updateWeather = function (){
        Weather.setApiKey("77f2d3977d531530ec5e3788c6473c04");
        let currentTemp = 0;
        let currentCond = "";
        let weatherCity = userCity;
        let weatherCountry = userCountry;
        if (weatherCountry) {
            weatherCountry = `, ${weatherCountry}`
        }
        Weather.getCurrent(weatherCity, function (current) {
            currentTemp = Math.round(Weather.kelvinToCelsius(current.temperature()) * 10) / 10;

            currentCond = current.conditions().replace(/\b\w/g, l => l.toUpperCase());
            console.log(currentTemp, currentCond);

            $(".weather").html(`<p>${currentTemp}<b class=\"small\">&deg;C - ${currentCond}</b><hr id=\"linebreak\"><p class=\"city\">${weatherCity}${weatherCountry}</p></p>`);
        });
    };
    updateWeather();
    let weather = setInterval(function (){
        updateWeather()
    }, 60000);

    /* Parallax */
    const areaSelector = ".main-area";
    const windowHeight = $(areaSelector).height();
    const windowWidth = $(areaSelector).width();
    let windowPaddingHeight = windowHeight * 0.03;
    let windowPaddingWidth = windowWidth * 0.03;
    $(areaSelector).on("mousemove", function(event){
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        let mouseXPercentage = mouseX / windowWidth;
        let mouseYPercentage = mouseY / windowHeight;
        let mouseXOffset = mouseXPercentage - 0.5;
        let mouseYOffset = mouseYPercentage - 0.5;
        let windowPaddingWidthLeft = windowPaddingWidth + ((mouseXOffset) * windowPaddingWidth / 2.2);
        let windowPaddingWidthRight = windowPaddingWidth - ((mouseXOffset) * windowPaddingWidth / 2.2);
        let windowPaddingHeightTop = windowPaddingHeight + ((mouseYOffset) * windowPaddingHeight / 2.2);
        let windowPaddingHeightBottom = windowPaddingHeight - ((mouseYOffset) * windowPaddingHeight / 2.2);
        $(".parallax").css("padding", `${windowPaddingHeightTop}px ${windowPaddingWidthRight}px ${windowPaddingHeightBottom}px ${windowPaddingWidthLeft}px`);
    })
});