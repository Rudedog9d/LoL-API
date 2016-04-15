function getCookies(){
    var cookies = document.cookie.split(";");
    return cookies;
}
function p(stuff){
    console.log(stuff);
}
function buildSummonerList(){
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
}
 
function buildSummonerList(){
    var summoners = getPreviousSummoners; //get summoners cookie data
    for (var j=0;j < summoners.length; j++){
        p(summoners[j]);
    }
}

buildSummonerList();
