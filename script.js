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
            let monthNum = parseInt(moment().format("MM"));
            let yearNum = parseInt(moment().format("YYYY"));
            hourNow = parseInt(hourNow);
            minuteNow = parseInt(minuteNow);
            console.log(hourNow);

            if (hourNow === 12){
                hourNow -= 12;
            }
            if (meridian === "pm"){
                hourNow += 12;
            }

            let dateText;
            if ((hourNow > 5 && 12 > hourNow) || (hourNow === 5 && minuteNow >= 30)){
                dateText = "Good Morning!";
            } else if (hourNow > 11 && 18 > hourNow) {
                dateText = "Good Afternoon!";
            } else {
                dateText = "Good Evening!";
            }

            let leapYear;
            if (yearNum % 4 !== 0 || yearNum % 100 === 0) {
                leapYear = false;
            } else leapYear = yearNum % 4 === 0;

            monthNum--;

            let cmlDayInYear = 30 * monthNum + parseInt(dayNow);

            if (monthNum >= 1) {
                cmlDayInYear++;
            }
            if (monthNum >= 2 && leapYear === false) {
                cmlDayInYear--;
                cmlDayInYear--;
            } else if (monthNum >= 2 && leapYear === true) {
                cmlDayInYear--;
            }
            if (monthNum >= 3) {
                cmlDayInYear++;
            }
            if (monthNum >= 5) {
                cmlDayInYear++;
            }
            if (monthNum >= 7) {
                cmlDayInYear++;
            }
            if (monthNum >= 8) {
                cmlDayInYear++;
            }
            if (monthNum >= 10) {
                cmlDayInYear++;
            }

            let cmlWeekInYear = parseInt(moment().format("WW"));

            monthNum++;
            let quarter = Math.ceil(monthNum / 3);

            function findSuffix(num) {
                num = num.toString();
                let daySup;
                if (num === "1" || num === "21" || num === "31"){
                    daySup = "st"
                } else if (num === "2" || num === "22"){
                    daySup = "nd"
                } else if (num === "3" || num === "23"){
                    daySup = "rd"
                } else {
                    daySup = "th"
                }
                return daySup;
            }

            // console.log(cmlDayInYear, findSuffix(cmlDayInYear), cmlWeekInYear, findSuffix(cmlWeekInYear), quarter);
            $("#yc-day").html(cmlDayInYear);
            $("#yc-day-suffix").html(findSuffix(cmlDayInYear));
            $("#yc-year").html(yearNum);
            $("#yc-quarter").html(`Q${quarter}`);
            $("#yc-week").html(cmlWeekInYear);
            $("#yc-week-suffix").html(findSuffix(cmlWeekInYear));

            // console.log(hourNow, ":", minuteNow);
            $(".greeting-text").html(dateText);

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
            // console.log(timeNow);
        }, 1000
    );

    /* Background Scripts */
    let imgSize = "large";
    let imgId = Math.floor((Math.random() * 8) + 1);
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

    /* Parallax, UNDER RECONSIDERATION */
    // const areaSelector = ".main-area";
    // const windowHeight = $(areaSelector).height();
    // const windowWidth = $(areaSelector).width();
    // let windowPaddingHeight = windowHeight * 0.03;
    // let windowPaddingWidth = windowWidth * 0.03;
    // $(areaSelector).on("mousemove", function(event){
    //     let mouseX = event.clientX;
    //     let mouseY = event.clientY;
    //     let mouseXPercentage = mouseX / windowWidth;
    //     let mouseYPercentage = mouseY / windowHeight;
    //     let mouseXOffset = mouseXPercentage - 0.5;
    //     let mouseYOffset = mouseYPercentage - 0.5;
    //     let windowPaddingWidthLeft = windowPaddingWidth + ((mouseXOffset) * windowPaddingWidth / 2.2);
    //     let windowPaddingWidthRight = windowPaddingWidth - ((mouseXOffset) * windowPaddingWidth / 2.2);
    //     let windowPaddingHeightTop = windowPaddingHeight + ((mouseYOffset) * windowPaddingHeight / 2.2);
    //     let windowPaddingHeightBottom = windowPaddingHeight - ((mouseYOffset) * windowPaddingHeight / 2.2);
    //     $(".parallax").css("padding", `${windowPaddingHeightTop}px ${windowPaddingWidthRight}px ${windowPaddingHeightBottom}px ${windowPaddingWidthLeft}px`);
    // })
});