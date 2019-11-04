
function achievementsgen () {
if (localsettings.achievements > 0){
$('#contentwrapper').append('<div id="achievements" class="uilvl1"></div>');
$('body').append('<div id="achievementnotifierwrapper"></div>');

var thisenabled = "";
var thisdisabled = "";
if (settings.achievements.enabled == 1){thisenabled = "checked"}else{thisdisabled = "checked"}
var settingselement = "achievements";
$('#settingsgenmarker').after('<div class="container"><div class="heading2">Achievements</div><div id="achievementssettings"></div></div>');
$('#achievementssettings').append("<div><label class='radio radioon' for='radio"+settingselement+"on'><input class='achievementsonoffswitch' type='radio' id='radio"+settingselement+"on' name='achievements' value='1' "+thisenabled+"><span>On</span>"
+"</label><label class='radio radiooff' for='radio"+settingselement+"off'><input class='achievementsonoffswitch' type='radio' id='radio"+settingselement+"off' name='achievements' value='0' "+thisdisabled+"><span>Off</span></label></div>");
if (settings.achievements.enabled == 1){
achievementscheck();
}
}
}


$(document).on('click', '.achievementsonoffswitch', function() {
$("[data-dest='achievements']").remove();
var setting = $(this).val();
settings.achievements.enabled = setting;
//if (setting == 0){$("[data-dest='achievements']").remove();}
if (setting == 1){achievementscheck();}
if (authtoken !== 0){token_updateaccount();}
localStorage.setItem("settings", JSON.stringify(settings));
});


function achievementscheck () {
if (settings.achievements.enabled == 1){
if (!$("[data-dest='achievements']").length) {	
$('#navelements').append('<div class="navbutton" data-dest="achievements">Achievements</div>');
$("#navelements").sortDivs();
}
//if (!settings.achievements){settings.achievements = [];}	

if (addresslist.length > 0 && !settings.achievements.achievement_1_address){settings.achievements.achievement_1_address = {unlocked:1, id: 1, ach_text:"Your first tracked asset!", points: 1};displayachievement(settings.achievements.achievement_1_address);}
if (addresslist.length > 5 && !settings.achievements.achievement_5_addresses){settings.achievements.achievement_5_addresses = {unlocked:1, id: 2, ach_text:"More than 5 addresses tracked!", points: 2};displayachievement(settings.achievements.achievement_5_addresses);}
if (addresslist.length > 10 && !settings.achievements.achievement_10_addresses){settings.achievements.achievement_10_addresses = {unlocked:1, id: 3, ach_text:"More than 10 addresses tracked!", points: 3};displayachievement(settings.achievements.achievement_10_addresses);}
//if (addresslist.length > 9 && settings.achievements[0].achievement_10_addresses < 1){settings.achievements.push({achievement_10_addresses: 1});}
	console.log(settings.achievements);
//	console.log(settings.achievements.achievement_5_addresses);
}
}

function displayachievement(achievement) {
console.log(achievement);
$('#achievementnotifierwrapper').append("<span id='achievementnotifier"+achievement.id+"' class='errormsg'>"+achievement.ach_text+"</span>");
setTimeout(function(){$("#achievementnotifier"+achievement.id+"").remove();}, 3000);
	
}