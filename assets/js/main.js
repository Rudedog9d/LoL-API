function getURLParameter(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}
function getCookies(){
    var cookies = document.cookie.split(";");
    return cookies;
}
function getSummonerID(name){
    var response = jQuery.getJSON("https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/" + name +  "?api_key=e27794f6-a6fe-4e22-adab-89254a46ad2c")
        .done( function(){
            response = jQuery.parseJSON(response.responseText);
            id =response[name.toLowerCase()].id; 
            p(id);
            return response[name.toLowerCase()].id; 
        });
}
function p(stuff){
    console.log(stuff);
}
function getSummonersCookie(){
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
function appendSummonersCookie(newSName, newSID){
    var summoners = getSummonersCookie();
    var c = "";
    var i = 0;
    var SIDexists = false;
    if (!newSID){
        //lookup SID
        console.log(getSummonerID(newSName));
        newSID = getSummonerID(newSName);
    }
    if (summoners) {
        while(i<summoners.length && !SIDexists) { //check if SID already exists, and if so, Overwrite old entry
            oldSID = summoners[i].split(":")[1];
            p(newSID);
            if(oldSID == newSID) { //sid exists, overwrite
                summoners[i] = newSName + ":" + newSID;
                SIDexists = true;
            }
            i++;
        }
        if(!SIDexists)
            summoners[summoners.length] = newSName + ":" + newSID;
    } else {
        summoners = [];
        summoners[0] = newSName + ":" + newSID;
    }
        for(i=0; i<summoners.length; i++) {
            if (i !== (summoners.length - 1))
                c += summoners[i] + ",";
            else
                c += summoners[i];
        //p(document.cookie + "\n=cookie;c=\n" + c);
        document.cookie=("summoners=" + c + ";");
        }
    return;
}
function deleteSummonersCookie(){
    document.cookie="summoners=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}
function buildSummonerList(){
    var summoners = getSummonersCookie(); //get summoners cookie data
    p(summoners);
    if (summoners){
        for (var i=0;i < summoners.length; i++){
            sname = summoners[i].split(":")[0];
            sid = summoners[i].split(":")[1];
            $(".summoner-list").append("<a href=dashboard?sid=" + sid + "><li>" + sname.toUpperCase() + "</li></a>");
        }
        return 0;
    } else
        return 1;
}
$(document).ready(function(){   //ensure document is ready
    var URL_summoner = getURLParameter("summoner");
    if(URL_summoner){
        appendSummonersCookie(URL_summoner);
    }
    ps = buildSummonerList();
    if(ps === 0)
        $("#select-message").append("Select a previous summoner or enter a new summoner name");//previous summoners (ps) == true
    else{
        $("#select-message").append("Enter a summoner ID in the box below!");//previous summoners (ps) == false
        $(".summoner-list").hide();
    }
});
