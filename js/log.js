
function loggergen () {
if (!settings.logger){settings.logger = {enabled:1}};		
$('#contentwrapper').append('<div id="logwrapper" class="uilvl1"><div class="container"><div class="heading2" id="logheader">Session Log</div><div id="logrecorder"></div></div></div>');
var thisenabled = "";
var thisdisabled = "";
if (settings.logger.enabled == 1){thisenabled = "checked"}else{thisdisabled = "checked"}
var settingselement = "logger";
$('#settingsgenmarker').after('<div class="container"><div class="heading2">Session Log</div><div id="loggersettings"></div></div>');
$('#loggersettings').append("<div><label class='radio radioon' for='radio"+settingselement+"on'><input class='loggeronoffswitch' type='radio' id='radio"+settingselement+"on' name='logger' value='1' "+thisenabled+"><span>"
+"On</span></label><label class='radio radiooff' for='radio"+settingselement+"off'><input class='loggeronoffswitch' type='radio' id='radio"+settingselement+"off' name='logger' value='0' "+thisdisabled+"><span>Off</span></label></div>");

if (settings.logger.enabled == 1){
loggersetup();
}
}


$(document).on('click', '.loggeronoffswitch', function() {
$("[data-dest='logwrapper']").remove();
var setting = $(this).val();
settings.logger.enabled = setting;
//if (setting == 0){$("[data-dest='logwrapper']").remove();}
if (setting == 1){loggersetup();}
if (authtoken !== 0){token_updateaccount();}
localStorage.setItem("settings", JSON.stringify(settings));
});


function loggersetup () {
if (settings.logger.enabled == 1){
successmessage("session log enabled");	
if (!$("[data-dest='logwrapper']").length) {	
$('#navelements').append('<div class="navbutton" data-sort="6" data-dest="logwrapper">Session Log</div>');
$("#navelements").sortNav();
}
}
}

function errormessage(msg){
var errorid = Math.floor(Math.random()*1000) + 1;
debugmessage(msg);
$('#notificationbox').append("<span id='errornotifaction"+errorid+"' class='errormsg'>"+msg+"</span>");
setTimeout(function(){$('#errornotifaction'+errorid).remove();}, 3000);
if (settings.logger.enabled == 1){
$('#logrecorder').prepend("<span class='errormsg'>"+moment().format('YYYY-MM-D HH:mm')+": "+msg+"</span>");
}
}
function successmessage(msg){
debugmessage(msg);
if (settings.logger.enabled == 1){
$('#logrecorder').prepend("<span class='successmsg'>"+moment().format('YYYY-MM-D HH:mm')+": "+msg+"</span>");
}
}

function debugmessage(msg){
if (localsettings.debug == 1){
console.log(msg);
}
}

