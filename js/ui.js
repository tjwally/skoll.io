
$(document).on('click', '#onlineaccountgeneration', function() {
generateonlineaccount(function(callback){
$('#onlineaccountregistration').val(callback);
$('#onlineaccountregistrationBTN').click();
$('#cloudsaveurl').html("URL: <a href='"+serverurl+"?id="+callback+"'>"+serverurl+"?id="+callback+"</a>");
//console.log(callback);
});
});


$(document).on('change', '#autopriceupdate', function() {
clearInterval(priceupdater);	
successmessage("price updater stopped");
priceupdateinterval = $('#autopriceupdate').val();
settings.priceupdateinterval = priceupdateinterval;
//settings[5] = priceupdateinterval;
//console.log(settings);
priceupdater = setInterval(genpriceupdater,priceupdateinterval);
successmessage("price updater started, interval: "+priceupdateinterval);
localStorage.setItem("settings", JSON.stringify(settings));
if (authtoken !== 0){token_updateaccount();}
});

$(document).on('change', '#balanceupdateinterval', function() {
balanceupdateinterval = $('#balanceupdateinterval').val();
settings.balanceupdateinterval = balanceupdateinterval;
localStorage.setItem("settings", JSON.stringify(settings));
if (authtoken !== 0){token_updateaccount();}
});

$(document).on('change', '#bchformat', function() {
bchformat = $('#bchformat').val();
settings.bchformat = bchformat;
localStorage.setItem("settings", JSON.stringify(settings));
if (authtoken !== 0){token_updateaccount();}
buildaddresstable(function(){});
});

$(document).on('change', '#currencyselect', function() {
selectedcurrency = $('#currencyselect').val();
selectedcurrencyicon = $('option[value='+selectedcurrency+']').data("currencyicon");
//settings[0] = selectedcurrency;
//settings[1] = selectedcurrencyicon;
settings.selectedcurrency = selectedcurrency;
settings.selectedcurrencyicon = selectedcurrencyicon;
localStorage.setItem("settings", JSON.stringify(settings));
		getcoinrates(function(){
		buildaddresstable(function(){});
		updategrandbalance();
		buildcointable();
		coinsettingsgen();
		});
if (authtoken !== 0){token_updateaccount();}
});


$(document).on('click', '#onlineaccountregistrationBTN', function() {
var account = $('#onlineaccountregistration').val()
successmessage("Account Registration: <b>"+account+"</b>");
registeraccount(account, 0, function(callback){
//console.log(callback);
if (callback == "register"){
$('#onlineaccountgeneration').hide();
$('#onlineaccountregistrationBTN').hide();
$('#onlineaccountregistration').hide();
$('#cloudsavewrapper').append("<div id='cloudaccountclaim' class='textblock'>Account "+account+" created!<br> Set a password for this account:</div>");
$('#cloudaccountclaim').append('<input class="accountinput uibutton" type="password" id="onlineaccountregistrationpassword" placeholder="password"><button class="uibutton" id="onlineaccountregistrationpasswordBTN">Register</button>');
$(document).on('click', '#onlineaccountregistrationpasswordBTN', function() {
var password = $('#onlineaccountregistrationpassword').val()
registeraccount(account, password, function(callback){
//console.log("callback: "+callback);
if (callback == 1){
successmessage("Account claimed: <b>"+account+"</b>");
$('#cloudsaveurl').html("URL: <a href='"+serverurl+"?id="+account+"'>"+serverurl+"?id="+account+"</a>");
$('#cloudsavewrapper').append("<div id='accountupdatedmsg'>Account claimed!</div>");
setTimeout(function(){$('#accountupdatedmsg').remove();}, 3000);
setTimeout(function(){$('#cloudaccountclaim').remove();}, 0);

$('#cloudsavewrapper').append('<input class="accountinput uibutton" type="password" id="updatecloudaccount" placeholder="password"><button class="uibutton" id="updatecloudaccountBTN">Update</button>');

}
if (callback == "tooshort"){$('#cloudsavewrapper').append("<div id='registererror'>password is too short!</div>");setTimeout(function(){$('#registererror').remove();}, 1000);}
});
});
}else if(callback == "accountnotfound"){$('#cloudsavewrapper').append("<div id='registererror'>Account not found!</div>");setTimeout(function(){$('#registererror').remove();}, 1000);
}else if(callback == "accountalreadyregistered"){
$('#cloudsavewrapper').append("<div id='accountalreadyregistered'>Account already registered!</div>");
$('#cloudsaveurl').append("Visit <a href='"+serverurl+"?id="+account+"'>"+serverurl+"?id="+account+"</a> to update");
//$('#cloudsavewrapper').append("<div id='accountalreadyregistered'>Enter password to update:</div>");
//$('#cloudsavewrapper').append('<input class="accountinput" type="password" id="updatecloudaccount" placeholder="password"><button id="updatecloudaccountBTN">Update</button>');
}
});
});



$(document).on('click', '#updatecloudaccountBTN', function() {
var account = $('#onlineaccountregistration').val()
var password = $('#updatecloudaccount').val()
updateaccount(account, password, function(callback){
if (callback == 1){successmessage("Authenticated with account: <b>"+account+"</b>");}
if (callback == 1){$('#cloudsavewrapper').append("<div id='accountupdatedmsg'>Account Updated!</div>");setTimeout(function(){$('#accountupdatedmsg').remove();}, 3000);}else{
$('#cloudsavewrapper').append("<div id='accountupdatedmsg'>Wrong Password!</div>");;setTimeout(function(){$('#accountupdatedmsg').remove();}, 1000);
}
});
});



$(document).on('click', '#unbindcloudaccountBTN', function() {
$.removeCookie('authtoken', { path: '/' }); 
location.reload(); 
});




$(document).on('change', '#themeselect', function() {
var theme = $('#themeselect').val();
var fontfamily = $('option[value='+theme+']').data("fontfamily")
var fontsize = $('option[value='+theme+']').data("fontsize")
settings.theme = theme;
settings.fontfamily = fontfamily;
settings.fontsize = fontsize;
//console.log(settings);
localStorage.setItem("settings", JSON.stringify(settings));
fontmanager(fontfamily, fontsize);
thememanager(theme);
coinbalancechart();
if (authtoken !== 0){token_updateaccount();}
});


$(document).on('click', '.navbutton', function() {
//console.log("navigation");	
$('#mobilemenu').prop( "checked", false );
var target = $(this).data("dest")
navigationmanager(target);
});


$(document).on('click', '#reset', function() {
$('#modalwrapper').html('<div id="modal"></div>');
$("#blacky").fadeIn(200);
$('#modal').html("<div class='modalinfobox' >This will reset everything, are you sure?</div><div id='modalbuttonwrapper' ></div>");
//$('#modalwrapper').append("");
$('#modalbuttonwrapper').append("<div class='modalokbutton' >do it!</div>");
$('#modalbuttonwrapper').append("<div class='modalcancelbutton' >cancel</div>");
$('#modalwrapper').fadeIn(200);
$('#modalwrapper').css('display', 'flex');
$(document).on('click', '.modalokbutton', function() {
$('#modalwrapper').fadeOut(200);
$("#blacky").fadeOut(200);
localStorage.clear();
window.location.replace(serverurl);
});
$(document).on('click', '.modalcancelbutton', function() {
$('#modalwrapper').fadeOut(200);
$("#blacky").fadeOut(200);
});
});



$(document).on('click', '.removebtn', function() {
removeaddress($(this).parent().data("coin"), $(this).parent().data("address"));
token_updateaccount();
$(this).parent().remove();
});


$(document).on('click', '#addressimportbtn', function() {
var selectedcoin = $('#addressmanagercoinselect').val();
//console.log("selected coin: "+selectedcoin);
var addresses = $('#addressimport').val();
var modifiedtext=addresses.replace(/\n0\n/g, "\n");
var modifiedtext=modifiedtext.replace(/\n0\n/g, "\n");
var modifiedtext=modifiedtext.replace(/\n0\n/g, "\n");
var modifiedtext = modifiedtext.replace(/^\s*[\r\n]/gm, "");
var modifiedtext = modifiedtext.replace(/</g, "&lt;").replace(/>/g, "&gt;");
$('#addressimport').val(modifiedtext);
var addresses2import = $('#addressimport').val().split('\n');
addresses2import = addresses2import.filter(function(el) { return el; });
//console.log(addresses2import);
addresses2import.forEach(function(element, index) {
var thisadddress = $.trim(element);
//console.log("ADDRESS:"+thisadddress+":ADDRESS");
var validaddress = 1;
if (selectedcoin == "bch"){
validaddress = 0;
var toLegacyAddress = bchaddr.toLegacyAddress;
var isValidAddress  = bchaddr.isValidAddress ;
console.log(isValidAddress (thisadddress));
if (isValidAddress(thisadddress)){validaddress = 1;thisadddress = toLegacyAddress(thisadddress)}else{errormessage(thisadddress+" is not a valid BCH address");}
}

if (validaddress == 1){
if (!dupecheckaddress(addresslist, thisadddress, selectedcoin)){
//console.log (coinsetdefault[i].coin);
addresslist.push({"address":thisadddress, "coin":selectedcoin, "enabled" : 1, "balance": 0, "lastupdate": 0, "token": 0, "tracked": 1})
localStorage.setItem("addresslist", JSON.stringify(addresslist));
successmessage("Imported Address "+thisadddress+" ("+selectedcoin+")");
}
}
})
$('#addressimport').val("");
//console.log(addresslist);
//buildcointable();
buildaddresstable(function(){
updateaddressbalances();
});
//if (authtoken !== 0){token_updateaccount();}
});