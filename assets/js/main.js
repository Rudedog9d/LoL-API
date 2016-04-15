function getCookies(){
    var cookies = document.cookie.split(";");
    return cookies;
}
function p(stuff){
    console.log(stuff);
}
function getPreviousSummoners(){
    var cookies = getCookies(); //get all cookies from page
    for(var i=0; i<cookies.length; i++) {
        var c = cookies[i];
        while (c.charAt(0)==' ') //get rid of any leading whitespace in current cookie
            c = c.substring(1);
        if (c.substring(0,9).toLowerCase() === 'summoners') {//look for summoners cookie
            var s = c.split("=")[1].split(','); //split cookie data into array
            return s; //return array of summoners
        }
    }
    console.log("No previous summoners found..");
}
function buildSummonerList(){
    var summoners = getPreviousSummoners(); //get summoners cookie data
    if (summoners){
        for (var i=0;i < summoners.length; i++){
            sname = summoners[i];
            sid = 5;
            $(".summoner-list").append("<a href=dashboard?sid=" + sid + "><li>" + sname.toUpperCase() + "</li></a>");
        }
        return 0;
    } else
        return 1;
}

$(document).ready(function(){   //ensure document is ready
    ps = buildSummonerList();
    if(ps === 0)
        $("#select-message").append("Select a previous summoner or enter a new summoner name");//previous summoners (ps) == true
    else
        $("#select-message").append("Enter a summoner ID in the box below!");//previous summoners (ps) == false

});
