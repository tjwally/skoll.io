function errormessage(msg){
console.log(msg);
$('#notificationbox').html("<span id='errornotifaction' class='errormsg'>"+msg+"</span>");
setTimeout(function(){$('#errornotifaction').remove();}, 3000);
$('#logrecorder').append("<span class='errormsg'>"+moment().format('YYYY-MM-D HH:mm')+": "+msg+"</span>");
}
function successmessage(msg){
console.log(msg);
$('#logrecorder').append("<span class='successmsg'>"+moment().format('YYYY-MM-D HH:mm')+": "+msg+"</span>");
}

jQuery.fn.sortDivs = function sortDivs() {
    $("> div", this[0]).sort(dec_sort).appendTo(this[0]);
    function dec_sort(b, a){ return ($(b).data("sort")) < ($(a).data("sort")) ? 1 : -1; }
}
jQuery.fn.sortTable = function sortDivs() {
    $("> tr", this[0]).sort(dec_sort).appendTo(this[0]);
    function dec_sort(b, a){ return ($(b).data("sort")) < ($(a).data("sort")) ? 1 : -1; }
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function checkonlineaccount(callbackaccount){
	
if(getUrlVars()["id"]){
var account = getUrlVars()["id"]
getcloudaccount(account, function(callback){
$('#cloudsaveurl').html("URL: <a href='"+serverurl+"?id="+account+"'>"+serverurl+"?id="+account+"</a>");
//console.log(callback[0].addresslist);
addresslist = JSON.parse(callback[0].addresslist || "[]");
localStorage.setItem("addresslist", JSON.stringify(addresslist));
coinset = JSON.parse(callback[0].coinset || "[]");
localStorage.setItem("coinset", JSON.stringify(coinset));
settings = callback[0].settings.split(',');
localStorage.setItem("settings", settings.toString());
$('#onlineaccountregistration').val(account);
$('#onlineaccountregistration').prop('disabled', true);
$('#onlineaccountregistrationBTN').hide();
$('#onlineaccountgeneration').hide();
$('#cloudsavewrapper').append('<input class="accountinput" type="password" id="updatecloudaccount" placeholder="password"><button id="updatecloudaccountBTN">Update</button>');
callbackaccount();
});
}else{
callbackaccount();
}
}


function generateonlineaccount(callback) {
$.ajax({
				type: "POST",
				url: cloudserver+cloudserveraccountAPI,
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				data:{action : "generateaccount"},
				success: function(account){
				callback(account);
					},
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }else{
				errormessage("Account -- timeout while generating account");
				callback();
			}             
            return;
        } else {
				errormessage("Account -- html error "+xhr.status);
				callback();				
		}
	}			 
}); 
}


function getcloudaccount(account, callback) {
$.ajax({
				type: "POST",
				url: cloudserver+cloudserveraccountAPI,
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				data:{action : "getaccount", account: account},
				success: function(account){
					//console.log(account)
				callback(account);
					},
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }else{
				errormessage("Account <b>"+account+"</b> -- timeout while registering");
				callback();
			}             
            return;
        } else {
				errormessage("Account <b>"+account+"</b> -- html error "+xhr.status);
				callback();				
		}
	}			 
}); 
}


function updateaccount(account, pass, callback) {
	console.log(settings);
		console.log(coinset);
$.ajax({
				type: "POST",
				url: cloudserver+cloudserveraccountAPI,
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				data:{action : "update", account: account, pass : pass, addresslist: JSON.stringify(addresslist), coinset: JSON.stringify(coinset), settings: settings.toString() },
				success: function(account){
				callback(account);
					},
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }else{
				errormessage("Account <b>"+account+"</b> -- timeout while registering");
				callback();
			}             
            return;
        } else {
				errormessage("Account <b>"+account+"</b> -- html error "+xhr.status);
				callback();				
		}
	}			 
}); 
}

function registeraccount(account, pass, callback) {
if (pass == 0){	
$.ajax({
				type: "POST",
				url: cloudserver+cloudserveraccountAPI,
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				data:{action : "register", account: account},
				success: function(account){
				callback(account);
					},
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }else{
				errormessage("Account <b>"+account+"</b> -- timeout while registering");
				callback();
			}             
            return;
        } else {
				errormessage("Account <b>"+account+"</b> -- html error "+xhr.status);
				callback();				
		}
	}			 
}); 
}else if (pass.length > 3){
$.ajax({
				type: "POST",
				url: cloudserver+cloudserveraccountAPI,
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				data:{action : "registerwithpassword", account: account, pass: pass, addresslist: JSON.stringify(addresslist), coinset: JSON.stringify(coinset), settings: settings.toString()},
				success: function(account){
				callback(account);
				
					},
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }else{
				errormessage("Account <b>"+account+"</b> -- timeout while registering");
				callback();
			}             
            return;
        } else {
				errormessage("Account <b>"+account+"</b> -- html error "+xhr.status);
				callback();				
		}
	}			 
}); 
}else if (pass.length <= 3){
callback("tooshort");
}
}

function coinsettingsgen () {
$('#coinsettings').html("");
coinset.forEach(function(element, index) {
var thisenabled = "";
var thisdisabled = "";
if (element.enabled == 1){thisenabled = "checked"}else{thisdisabled = "checked"}
$('#coinsettings').append("<div><label class='coinlabel'>"+element.name+"</label><label class='radio radioon' for='radio"+element.coin+"on'><input class='coinonoffswitch' type='radio' id='radio"+element.coin+"on' name='"+element.coin+"' value='1' "+thisenabled+"><span>On</span></label><label class='radio radiooff' for='radio"+element.coin+"off'><input class='coinonoffswitch' type='radio' id='radio"+element.coin+"off' name='"+element.coin+"' value='0' "+thisdisabled+"><span>Off</span></label></div>");
});
}

function gettotalcoinbalance(coin){
var totalcoinbalance =  0;
for(var i = 0; i < addresslist.length; ++i){
    if(addresslist[i].coin == coin)
        totalcoinbalance = totalcoinbalance + addresslist[i].balance
}
return totalcoinbalance;
}


function coinenabler( coin, value ) {
   for (var i in addresslist) {
     if (addresslist[i].coin == coin) {
        addresslist[i].enabled = value;
		localStorage.setItem("addresslist", JSON.stringify(addresslist));
        break;
     }
   }
   for (var i in coinset) {
     if (coinset[i].coin == coin) {
        coinset[i].enabled = value;
		localStorage.setItem("coinset", JSON.stringify(coinset));
        break;
     }
   }
}


function updateprice( coin, value ) {
   for (var i in coinset) {
     if (coinset[i].coin == coin) {
        coinset[i].value = value;
        break;
     }
   }
}


function removeaddress( coin, address ) {
//console.log(coin+address);
   for (var i in addresslist) {
     if (addresslist[i].coin == coin && addresslist[i].address == address) {
        addresslist.splice(i, 1)
		buildaddresstable(function(){});
		localStorage.setItem("addresslist", JSON.stringify(addresslist));
        break; 
     }
   }
}

function updatebalance( coin, address, balance ) {
   for (var i in addresslist) {
     if (addresslist[i].coin == coin && addresslist[i].address == address) {
        addresslist[i].balance = balance;
		addresslist[i].lastupdate = Date.now();
        break; 
     }
   }
}


function gettrackedaddresses(coin){
var trackedaddresses =  0;
for(var i = 0; i < addresslist.length; ++i){
    if(addresslist[i].coin == coin)
        trackedaddresses++;
}
return trackedaddresses;
}


function dupecheck(inArr, coin, exists)
{
    for (i = 0; i < inArr.length; i++ )
    {
        if (inArr[i].coin == coin)
        {
            return (exists === true) ? true : inArr[i];
        }
    }
}


function dupecheckaddress(inArr, address, coin, exists){
    for (i = 0; i < inArr.length; i++ )
    {
        if (inArr[i].address == address && inArr[i].coin == coin)
        {
            return (exists === true) ? true : inArr[i];
        }
    }
}

$(document).on('click', '.coinonoffswitch', function() {
var selectedcoin = $(this).attr('name')
var setting = $(this).val();
//console.log(selectedcoin+" "+setting);
coinenabler(selectedcoin, setting);
});

function navigationmanager(target){
$('.navbutton').removeClass("activenav");
$('*[data-dest="'+target+'"]').addClass("activenav");
var animationspeed = 100;	
$( ".uilvl1" ).fadeOut(animationspeed);
setTimeout(function(){
$("#"+target).fadeIn(animationspeed);	
//$("#"+target).css('display', 'inline-block');
},animationspeed);
}


function builduntrackedcoinsettings(){
$.getJSON("https://api.coingecko.com/api/v3/coins/list", function(choices){
	//console.log(choices);
$('#staticbalancecoinsel').autoComplete({
    minChars: 2,
    source: function(term, suggest){
        term = term.toLowerCase();
        //var choices = ['ActionScript', 'AppleScript', 'Asp', ...];
        var matches = [];
        for (i=0; i<choices.length; i++)
//            if (~choices[i].name.toLowerCase().indexOf(term)) matches.push(choices[i]);
				if (~choices[i].name.toLowerCase().indexOf(term)) matches.push(choices[i]);
        suggest(matches);
		//console.log(matches);
    },
	renderItem: function (item, search){
        search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
		//console.log(item);
		//console.log(item.symbol);	
        return '<div class="autocomplete-suggestion" data-symbol="'+item.symbol+'" data-name="'+item.name+'" data-val="'+search+'"><b>'+item.symbol+'</b><span><img src="icons32/'+item.symbol.toLowerCase()+'.png" onError="this.onerror = \'\';this.style.display=\'none\';"> '+item.name+'</span></div>';
    },
	onSelect: function(e, term, item){
		//$('#staticbalancecoinsel')
		$('#staticbalancecoinsel').val("");
		$('#selectedstaticcoin').html("");
		$('#selectedstaticcoin').append("<div id='addstaticbalancerapper'></div>");
		$('#addstaticbalancerapper').append("<div class='heading3'>Coin: "+item.data('name')+" ("+item.data('symbol')+")</div>");
		$('#addstaticbalancerapper').append('<div class="field-wrap"><label for="staticbalance">Balance: </label><input id="staticbalance" type="number" placeholder="0.00" step="any"></div>');
		$('#addstaticbalancerapper').append('<div class="field-wrap"><label for="staticdescritpion">Description/Address: </label><input id="staticdescritpion" type="text" placeholder="description/address"></div>');
		$('#selectedstaticcoin').append("<button class='uibutton' data-coin='"+item.data('symbol')+"' data-coinname='"+item.data('name')+"' id='addstaticbalancebtn'>Add</button>");
        //console.log(item.data('symbol'));
        //console.log(item.data('symbol'));
    }
});
});
}


$(document).on('click', '#addstaticbalancebtn', function() {
var coinsymbol = $(this).data("coin");
var coinname = $(this).data("coinname");
var balance = $("#staticbalance").val();
var address = $("#staticdescritpion").val();
addstaticaddress(coinsymbol, coinname, balance, address, function(){
$("#addstaticbalancerapper").remove();
//
});
//console.log(coinsymbol);
});


function thememanager(theme){
$("body").removeClass();	
$( "body" ).addClass( theme );
$("html").removeClass();	
$( "html" ).addClass( theme );
if (theme == "eightbit"){iconfolder = "icons32/";}
//console.log("adding: "+theme);
}

function fontmanager(font, size){
        var fontID = font.replace(/\+/g,' ');
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.id = font;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'https://fonts.googleapis.com/css?family='+font+'&display=swap';
            link.media = 'all';
            head.appendChild(link);
		$('body').css("font-family", '"'+fontID+'"');
		$('body').css("font-size", size)					
			
		//$('body, input, textarea, button, select, option, select option').css("font-family", '"'+fontID+'"');
		//$('body, input, textarea, button, select, option, select option').css("font-size", size)		
	   //document.getElementById("motherwalrus").style.fontFamily = fontID.replace(/\+/g,' ');
	   //console.log("fontmanager: "+fontID);
    }


function loading(status){
if (status == 1){
$( "#addressimport" ).prop( "disabled", true );	
$( "#cointablewrapper" ).css('opacity', '0.1');
$( "#pindicator" ).fadeIn(500);
//$( "#pindicator" ).removeClass( "animated tada" );	
$( "#pindicator" ).addClass( "animated flash slower infinite" );	
//animateCSS('#wlogo', 'bounce')
	}
if (status == 0){
$( "#addressimport" ).prop( "disabled", false );		
$( "#cointablewrapper" ).css('opacity', '1');	
$( "#pindicator" ).removeClass( "animated flash slower infinite" );	
$( "#pindicator" ).fadeOut(500);
//animateCSS('#wlogo', 'tada')
	}
}