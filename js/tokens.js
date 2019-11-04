
function tokensgen () {
if (!settings.tokens){settings.tokens = {enabled:1}};	
if (!settings.tokenversion){settings.tokenversion = localsettings.tokenversion; tokenset = []; localsettings.forceupdate = 1; updateaddressbalances();}
else if (settings.tokenversion < localsettings.tokenversion){
settings.tokenversion = localsettings.tokenversion; tokenset = []; 	localsettings.forceupdate = 1; updateaddressbalances();
}



var settingselement = "tokens";
$('#contentwrapper').append('<div id="'+settingselement+'wrapper" class="uilvl1"></div>');
var thisenabled = "";
var thisdisabled = "";
if (settings.tokens.enabled == 1){thisenabled = "checked"}else{thisdisabled = "checked"}
$('#settingsgenmarker').after('<div class="container"><div class="heading2">Tokens</div><div id="'+settingselement+'settings"></div></div>');
$('#'+settingselement+'settings').append("<div><label class='radio radioon' for='radio"+settingselement+"on'><input class='"+settingselement+"onoffswitch' type='radio' id='radio"+settingselement+"on' name='"+settingselement+"' value='1' "+thisenabled+"><span>"
+"On</span></label><label class='radio radiooff' for='radio"+settingselement+"off'><input class='"+settingselement+"onoffswitch' type='radio' id='radio"+settingselement+"off' name='"+settingselement+"' value='0' "+thisdisabled+"><span>Off</span></label></div>");

if (settings.tokens.enabled == 1){
tokenssetup();
}
}


$(document).on('click', '.tokensonoffswitch', function() {
$("[data-dest='tokenswrapper']").remove();
var setting = $(this).val();
settings.tokens.enabled = setting;
if (setting == 1){tokenssetup();}
if (authtoken !== 0){token_updateaccount();}
localStorage.setItem("settings", JSON.stringify(settings));
});


function tokenssetup () {
if (settings.tokens.enabled == 1){
if (!$("[data-dest='tokenswrapper']").length) {	
$('#navelements').append('<div class="navbutton" data-sort="3.1" data-dest="tokenswrapper">Tokens</div>');
$("#navelements").sortNav();
}
//buildtokens();
}
}

function buildtokens() {
if (settings.tokens.enabled == 1){

if (tokenset.length > 0){
$('#tokenswrapper').html("");
$('#tokenswrapper').append('<!--<div class="heading2">Tokens</div>--><div id="tokentablewrapper" class=""><table id="tokentable" ><thead><tr><th>Coin</th><th>Addr.Label</th><th>Symbol</th><th>Token Name</th><th>Balance</th></tr></thead><tbody id="tokentable"></tbody></table></div>');	
tokenset.forEach(function(element, index) {
$('#tokentable').append('<tr data-address="'+element.address+'" data-coin="'+element.coin+'"><td>'+element.coin+'</td><td class="addresslabel addresslabel_edit">'+getaddresslabel(element.coin, element.address)+'</td><td>'+element.symbol+'</td><td class="dontbreakout">'+element.name+'</td><td>'+element.balance+'</td></tr>');	
}); 

}else{
$('#tokenswrapper').html("no tokens detected yet");	
}

successmessage("building tokens table");
}
}

