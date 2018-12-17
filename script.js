$(document).ready(function main(){
    $("#fade").hide(0).delay(1000).fadeIn(1000);
    let updateTime = setInterval(function updateTime() {
            let timeNow = moment().format("hh:mm");
            $("#time-text").html(timeNow);
            let dayWNow = moment().format("dddd");
            let dayNow = moment().format("DD");
            let monthYearNow = moment().format("MMMM, YYYY");

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
});