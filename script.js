var origin = config.Origin;
var accept_Charset = config.Accept_Charset;
var x_Riot_Token = config.X_Riot_Token;
var accept_Language = config.Accept_Language;
var user_Agent = config.User_Agent;
var myUserData = {};
var region = "none";



function getUserData() {
  region = document.getElementById("region").value;
  var summonerName = document.getElementById("summonerName").value;
  var Url = ("https://" + region + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonerName + "?api_key=" + x_Riot_Token);

  $.ajax({
  	url: Url,
  	type:"GET",
    success: function(result) {
    	myUserData = result;
    	updateData();
    	var x = document.getElementById("mh");
    	x.style.display = "block";
    },
    error:function(error){
    	console.log('Error ${error}')
    	x.style.display = "none";
    }

    })
}

function getMatchHistory() {
  var Url = ("https://" + region + ".api.riotgames.com/lol/match/v4/matchlists/by-account/" + myUserData.accountId + "?api_key=" + x_Riot_Token);

  $.ajax({
  	url: Url,
  	type:"GET",
    success: function(result) {
    	updateMatchHistory(result);
    },
    error:function(error){
    	console.log('Error ${error}')
    }

    })
}

function updateData(){
	if (myUserData != {}) {
		//id
		var temp = document.getElementById("id1");
		temp.innerHTML = "User ID: " + myUserData.id;                  
		//profileIconId
		temp = document.getElementById("profileIconId");
		temp.innerHTML = "Profile Icon ID: " + myUserData.profileIconId; 
		document.getElementById("profIcon").src = "http://ddragon.leagueoflegends.com/cdn/9.23.1/img/profileicon/" + myUserData.profileIconId + ".png";                 
		document.getElementById("profIcon").width = "50";
		document.getElementById("profIcon").height = "50";
		//puuid
		temp = document.getElementById("puuid");
		temp.innerHTML = "Personal ID: " + myUserData.puuid;                  
		//summonerLevel
		temp = document.getElementById("summonerLevel");
		temp.innerHTML = "Summoner Level: " + myUserData.summonerLevel;                     
		//accountId
		temp = document.getElementById("accountId");
		temp.innerHTML = "Account ID: " + myUserData.accountId;                     
		//revisionDate
		temp = document.getElementById("revisionDate");
		var d = new Date();
		d.setTime(myUserData.revisionDate);
		temp.innerHTML = "Revision Date: " + d;                  
		//name
		temp = document.getElementById("name");
		temp.innerHTML = "Summoner Name: " + myUserData.name;                           
	}

}

function openProject(name) {
	document.getElementById("project").style.display = "none";
	document.getElementById("intro").style.display = "none";
	document.getElementById("return").style.display = "block";
	document.getElementById(name).style.display = "block";	
}

function returnButton() {
	document.getElementById("project").style.display = "block";
	document.getElementById("intro").style.display = "block";
	document.getElementById("return").style.display = "none";
	document.getElementById("gpu").style.display = "none";
	document.getElementById("rando").style.display = "none";
	document.getElementById("cars").style.display = "none";
	document.getElementById("scheduler").style.display = "none";	
}

function updateMatchHistory(matchData){
		console.log(matchData.matches[0]);
var i = 0;
var j = 0;
var x;
  var body = document.getElementsByTagName('body')[0];
var tbl = document.getElementsByTagName('table')[0];
  tbl.style.display = "block";
    var tbdy = document.createElement('tbody');
for ( i = 0; i < matchData.matches.length; i++){
	var row = document.createElement("tr");
for ( var d in matchData.matches[i]) {
	var cell = document.createElement("td");
	if (d.match("timestamp")) {
		var dat = new Date();
		dat.setTime(matchData.matches[i][d]);
	x = dat;
} else {
	x = matchData.matches[i][d];
}

        cell.appendChild(document.createTextNode(x));
	row.appendChild(cell);
}
tbdy.appendChild(row);
}
  tbl.appendChild(tbdy);
  body.appendChild(tbl)
}
