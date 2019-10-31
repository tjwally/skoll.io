
function coinblocksgen () {
$('#contentwrapper').append('<div id="cardswrapper" class="uilvl1"><div id="cards"></div></div>');
var thisenabled = "";
var thisdisabled = "";
if (settings.coinblocks.enabled == 1){thisenabled = "checked"}else{thisdisabled = "checked"}
var settingselement = "coinblocks";
$('#settingsgenmarker').after('<div class="container"><div class="heading2">Coin Blocks</div><div id="'+settingselement+'settings"></div></div>');
$('#'+settingselement+'settings').append("<div><label class='radio radioon' for='radio"+settingselement+"on'><input class='"+settingselement+"onoffswitch' type='radio' id='radio"+settingselement+"on' name='coinblocks' value='1' "+thisenabled+"><span>"
+"On</span></label><label class='radio radiooff' for='radio"+settingselement+"off'><input class='"+settingselement+"onoffswitch' type='radio' id='radio"+settingselement+"off' name='coinblocks' value='0' "+thisdisabled+"><span>Off</span></label></div>");

if (settings.coinblocks.enabled == 1){
coinblockssetup();
}
}


$(document).on('click', '.coinblocksonoffswitch', function() {
$("[data-dest='cardswrapper']").remove();
var setting = $(this).val();
settings.coinblocks.enabled = setting;
if (setting == 1){coinblockssetup();}
if (authtoken !== 0){token_updateaccount();}
localStorage.setItem("settings", JSON.stringify(settings));
});


function coinblockssetup () {
if (settings.coinblocks.enabled == 1){
if (!$("[data-dest='cardswrapper']").length) {	
$('#navbuttons').append('<div class="navbutton" data-sort="2" data-dest="cardswrapper">Coin Blocks</div>');
$("#navbuttons").sortNav();
}
buildcoinblocks();
}
}

function buildcoinblocks() {
successmessage("building coin blocks");
$('#cards').html("");
coinset.forEach(function(element, index) {
if (element.enabled == 1 && gettrackedaddresses(element.coin) > 0){
var thicoinvalue = 0;
var thicoinbalance = 0;
var thiscoinchange = "";
thicoinbalance = gettotalcoinbalance(element.coin);
thicoinvalue = thicoinbalance * element.value;
/*
if (element.percentage_change_24h){
if (element.percentage_change_24h > 0){thiscoinchange = "<span class='wealthpositive valigntop'>(+"+element.percentage_change_24h.toFixed(2)+"%)</span>";}
if (element.percentage_change_24h < 0){thiscoinchange = "<span class='wealthnegative valigntop'>("+element.percentage_change_24h.toFixed(2)+"%)</span>";}
*/
$('#cards').append('<div class="card" data-sort="'+thicoinvalue+'"><div class="card-header">'+element.name+'</div><div class="card-main"><img class="img_card" src="'+iconfolder+element.coin+'.png"><div class="card-description">'+thicoinvalue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+selectedcurrencyicon+'</div></div></div>'); 
}
});
$("#cards").sortDivs();
$(".img_card").on("error", function() {$(this).attr('src', iconfolder+'placeholder.png');});
}