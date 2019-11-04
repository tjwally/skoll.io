function browserdetect(){
  var ua = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i),
      browser;
  if (navigator.userAgent.match(/Edge/i) || navigator.userAgent.match(/Trident.*rv[ :]*11\./i)) {
    browser = "msie";
  }
  else {
    browser = ua[1].toLowerCase();
  }
  successmessage("browser: "+browser);
  if (browser == "msie"){
	  errormessage("Browser not supported!");
	  $('body').append("<div id='browsernotsupported'>⚠ Unsupported Browser ⚠<br><br>skoll.io probably won't work great in "+browser+". We generally only support the recent versions of major browsers like Chrome, Firefox, Safari. Use this one at your own risk!<br><br><div id='notsupportedok' class='uibutton'>OK</div></div>");
	  $(document).on('click', '#notsupportedok', function() {
$('#browsernotsupported').fadeOut(100);
});
	  
  }
}


function SortByDay(a, b){
  var aday = a.day.toLowerCase();
  var bday = b.day.toLowerCase(); 
  return ((aday < bday) ? -1 : ((aday > bday) ? 1 : 0));
}


function getPercentageChange(oldNumber, newNumber){
    var decreaseValue = oldNumber - newNumber;
    return (decreaseValue / oldNumber) * 100;
}

jQuery.fn.sortDivs = function sortDivs() {
    $("> div", this[0]).sort(dec_sort).appendTo(this[0]);
    function dec_sort(b, a){ return ($(b).data("sort")) < ($(a).data("sort")) ? 1 : -1; }
}
jQuery.fn.sortNav = function sortNav() {
    $("> div", this[0]).sort(asc_sort).appendTo(this[0]);
    function asc_sort(b, a){ return ($(b).data("sort")) > ($(a).data("sort")) ? 1 : -1; }
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

function rand(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}




function checkonlineaccount(callbackaccount){
if(getUrlVars()["id"]){
var account = getUrlVars()["id"]
debugmessage(account);
if ($.cookie('authtoken')){
	authtoken = $.cookie('authtoken');
}

getcloudaccount(account, function(callback){
$('#cloudsaveurl').html("URL: <a href='"+serverurl+"?id="+account+"'>"+serverurl+"?id="+account+"</a>");
debugmessage(callback[0].accountdata);
debugmessage(callback[0].addresslist);
addresslist = JSON.parse(callback[0].addresslist || "[]");
localStorage.setItem("addresslist", JSON.stringify(addresslist));
coinset = JSON.parse(callback[0].coinset || "[]");
localStorage.setItem("coinset", JSON.stringify(coinset));
//settings = callback[0].settings.split(',');
//localStorage.setItem("settings", settings.toString());

debugmessage(callback[0].settings)

if (JSON.parse(callback[0].settings.length > 5)){
settings = JSON.parse(callback[0].settings);
localStorage.setItem("settings", JSON.stringify(settings));
}


accountdata = JSON.parse(callback[0].accountdata || "[]");
localStorage.setItem("accountdata", JSON.stringify(accountdata));
$('#onlineaccountregistration').val(account);
$('#onlineaccountregistration').prop('disabled', true);
$('#onlineaccountregistrationBTN').hide();
$('#onlineaccountregistration').hide();
$('#onlineaccountgeneration').hide();
if (authtoken == 0){
$('#cloudsavewrapper').append('<input class="accountinput" type="password" id="updatecloudaccount" placeholder="password"><button class="uibutton" id="updatecloudaccountBTN">Update</button>');
}else{
$('#cloudsavewrapper').append('<button class="uibutton" id="unbindcloudaccountBTN">Unbind</button>');	
}
callbackaccount();
});
}else{
debugmessage("accountid:"+ settings.accountid);
if(settings.accountid !== 0){localStorage.clear();location.reload(true);}
callbackaccount();
}
}


function coinbalancechart() { 
if (localsettings.chartloading == 0){
if (localsettings.chartloaded > 0){chart_wealth.destroy();localsettings.chartloaded = 0;}
localsettings.chartloading = 1;
document.getElementById('wealthhistorychart').innerHTML = '';
  var options = {
      chart: {
        type: 'area',
        height: 100,
        sparkline: {
          enabled: true
        }
      },
	  stroke: {
        curve: 'straight'
      },
      fill: {
        opacity: 0.3
      },
      series: [{
        data: []
      }],
      tooltip: {
		  enabled : false,
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }
    }

if (settings.theme == "eightbit"){
options.colors = ['#00ff00']		
}
if (settings.theme == "bitcoin"){
options.colors = ['#F59722']		
}
		
if (accountwealthhistory.length > 1){
	successmessage("loading chart");
    var days = [];
	var balances = [];
	for (i = 0; i < accountwealthhistory.length; i++ )
    {
	days.push(accountwealthhistory[i].day)
	balances.push(accountwealthhistory[i].balance.toFixed(2))
	}
options.series[0].data = balances;
debugmessage(days);
debugmessage(balances);


setTimeout(function(){
			chart_wealth = new ApexCharts(
            document.querySelector("#wealthhistorychart"),
            options
        );
chart_wealth.render();
localsettings.chartloading = 0;	
localsettings.chartloaded = 1;	
},animationspeed+animationspeed);

//chart.render();
}     
}else{
//successmessage("chart already loading");	
}
}

function wealthchangereport(totalbalance) { 
var wealthcheckpoints = accountwealthhistory.length;
debugmessage("checkpoints:" +wealthcheckpoints);
debugmessage(accountwealthhistory);
if (accountwealthhistory.length > 1){
debugmessage("lastbalance:" +accountwealthhistory[accountwealthhistory.length - 2].balance);
debugmessage("newbalance:" +totalbalance);
var thispercentage = getPercentageChange(totalbalance, accountwealthhistory[accountwealthhistory.length - 2].balance);
debugmessage("percentage change: "+thispercentage);	
if (thispercentage > 0){
$('#totalbalance').append("<span class='wealthpositive'>(+"+thispercentage.toFixed(2)+"%)</span>");
}else if  (thispercentage < 0){
$('#totalbalance').append("<span class='wealthnegative'>("+thispercentage.toFixed(2)+"%)</span>");	
}
}
}

function accountwealthhistorylog(totalbalance) {
var today = moment().format("YYYY-MM-DD");

/*
if (settings.accountid == "demo"){
	var today = "2019-10-24";
	var totalbalance = 16252.20781667821
	}
	*/

//var today = "2019-10-27";
var todaylogged = 0;
debugmessage(today+" - "+totalbalance+" - "+selectedcurrencyicon);
var wealth = {day:today, balance:totalbalance, curreny: selectedcurrencyicon};
/*
var wealthcheckpoints = accountwealthhistory.length;
if (wealthcheckpoints > 0){
var thispercentage = getPercentageChange(accountwealthhistory[wealthcheckpoints - 1].balance, totalbalance);
if (thispercentage > 1){accountwealthhistory.push(wealth);}
if (thispercentage < -1){accountwealthhistory.push(wealth);}
}else{
accountwealthhistory.push(wealth);
}
*/


accountwealthhistory.sort(SortByDay);

    for (i = 0; i < accountwealthhistory.length; i++ )
    {
        if (accountwealthhistory[i].day == today)
        {
            todaylogged = 1;
			if (accountwealthhistory[i].balance !== totalbalance){
			//if (parseFloat(accountwealthhistory[i].balance, 10) !== parseFloat(totalbalance,10)){
			debugmessage("today: "+parseFloat(totalbalance, 10)+ "todayold: "+accountwealthhistory[i].balance );
			accountwealthhistory[i].balance = totalbalance;
			accountwealthhistory[i].curreny = selectedcurrencyicon;
			coinbalancechart();
			//buildstats();
			}
        }
    }
if (todaylogged == 0){
debugmessage("today not found");
accountwealthhistory.push(wealth);
debugmessage(accountwealthhistory);
}

var tokensetinit = 0;
var accountwealthinit = 0;
    for (i = 0; i < accountdata.length; i++ )
    {
        if (accountdata[i].accountwealthhistory)
        {
            debugmessage(accountdata[i].accountwealthhistory);
			accountdata[i].accountwealthhistory = accountwealthhistory;
			accountwealthinit = 1;
        }
		if (accountdata[i].tokenset)
        {
		accountdata[i].tokenset = tokenset;	
		tokensetinit = 1;
		}
    }
if (accountwealthinit == 0){accountdata.push({accountwealthhistory:accountwealthhistory});}
if (tokensetinit == 0){accountdata.push({tokenset:tokenset});}
localStorage.setItem("accountdata", JSON.stringify(accountdata));
debugmessage(accountdata);
}

function accwealthdupecheck(accountwealthhistory, today, coin, currency, exists){
    for (i = 0; i < inArr.length; i++ )
    {
        if (inArr[i].address == address && inArr[i].coin == coin)
        {
            return (exists === true) ? true : inArr[i];
        }
    }
}

function generateonlineaccount(callback) {
$.ajax({
				type: "POST",
				url: cloudserver+cloudserveraccountAPI,
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				data:{action : "generateaccount", addresslist: JSON.stringify(addresslist), coinset: JSON.stringify(coinset), accountdata: JSON.stringify(accountdata), settings: JSON.stringify(settings)},
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
					debugmessage(account)
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

function token_check(callback) {
if(getUrlVars()["id"]){
var account = getUrlVars()["id"]
$.ajax({
				type: "POST",
				datatype : "script", 
				url: cloudserver+cloudserveraccountAPI,
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				data:{action : "token_check", account: account, authtoken : authtoken},
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
				errormessage("Account <b>"+account+"</b> -- timeout while checking token");
				callback();
			}             
            return;
        } else {
				errormessage("Account <b>"+account+"</b> -- html error while checking token "+xhr.status);
				callback();				
		}
	}			 
}); 
}	
}

function token_updateaccount(callback) {
if(getUrlVars()["id"]){
var account = getUrlVars()["id"]
$.ajax({
				type: "POST",
				datatype : "script", 
				url: cloudserver+cloudserveraccountAPI,
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				data:{action : "token_update", account: account, authtoken : authtoken, addresslist: JSON.stringify(addresslist), coinset: JSON.stringify(coinset), accountdata: JSON.stringify(accountdata), settings: JSON.stringify(settings) },
				success: function(account){
				debugmessage(account);
				successmessage("updated online account with token");
					},
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }else{
				errormessage("Account <b>"+account+"</b> -- timeout while updating");
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
}

function updateaccount(account, pass, callback) {
debugmessage(settings);
debugmessage(coinset);
$.ajax({
				type: "POST",
				datatype : "script", 
				url: cloudserver+cloudserveraccountAPI,
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				data:{action : "update", account: account, pass : pass, addresslist: JSON.stringify(addresslist), coinset: JSON.stringify(coinset), accountdata: JSON.stringify(accountdata), settings: JSON.stringify(settings) },
				success: function(account){
				if ($.cookie('authtoken')){
				authtoken = $.cookie('authtoken');
				$('#updatecloudaccount').hide();
				$('#updatecloudaccountBTN').hide();
				$('#cloudsavewrapper').append('<button class="uibutton" id="unbindcloudaccountBTN">Unbind</button>');	
				}
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
settings.accountid = account;
$.ajax({
				type: "POST",
				url: cloudserver+cloudserveraccountAPI,
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				data:{action : "registerwithpassword", account: account, pass: pass, addresslist: JSON.stringify(addresslist), coinset: JSON.stringify(coinset), accountdata: JSON.stringify(accountdata), settings: JSON.stringify(settings)},
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


function buildaddresstable(callback) {
successmessage("building address table");
$('#coindaddressheader').fadeIn(0);
$('#addresstablewrapper').html('<div id="cointableheaders"></div><div id="cointables"></div>');
coinset.forEach(function(element, index) {
//var trackedaddresses =  gettrackedaddresses(element.coin);
if (gettrackedaddresses(element.coin) > 0 && element.token == 0 && element.enabled == 1){
$('#cointableheaders').append("<div class='container'><div class='addresstableheader' data-tabledest='"+element.coin+"cointable'><span class=''>"+element.name+"<span class='fontfifty iconindicator'>("+gettrackedaddresses(element.coin)+")</span></span><img class='img_addressheader' src='icons32/"+element.coin+".png'></div></div>");
$('#cointables').append("<div class='addresstablecontainer' id='"+element.coin+"cointable'><table><thead><tr><th>Address</th><th class='centeritem'>Coin</th><th>Balance</th><th class='centeritem'>Tracked</th><th>Value</th><th>Label</th><th class='centeritem'>Remove</th></tr></thead><tbody id='tablebody"+element.coin+"'></tbody></table></div>");
}
});

$(document).on('click', '.addresstableheader', function(evt) {
evt.stopImmediatePropagation();
$('.addresstableheader').removeClass('active');
$(this).addClass('active');
var target = $(this).data("tabledest")
$('.addresstablecontainer').fadeOut(animationspeed);
if ($('#'+target).is(":hidden")){
$('#'+target).fadeIn(animationspeed);

setTimeout(function(){
$('#'+target).get(0).scrollIntoView()
},animationspeed+animationspeed);


}else{
if ($('#'+target).is(":visible")){
$(this).removeClass('active');
$('#'+target).fadeOut(animationspeed);
}}
});


if(addresslist.length > 0){
$('#addresstablebody').html("");
addresslist.forEach(function(element, index) {
if (element.enabled == 1){
if (element.token == 0){
var append2 = element.coin;
}else{
var append2 = element.token;
}
var thisaddressvalue = 0;
thisaddressvalue = element.balance * coinset.find(x => x.coin === element.coin).value;

var thisaddress = element.address;
if(element.coin == "bch" && settings.bchformat !== "legacy"){
if (settings.bchformat == "cash"){
var toCashAddress = bchaddr.toCashAddress;
thisaddress = toCashAddress(element.address);	
}	
if (settings.bchformat == "slp"){
var toSlpAddress = bchaddr.toSlpAddress;
thisaddress = toSlpAddress(element.address);	
}	
if (settings.bchformat == "bitpay"){
var toBitpayAddress = bchaddr.toBitpayAddress;
thisaddress = toBitpayAddress(element.address);	
}	
}
var balanceupdater = "";
if (element.tracked == 0){balanceupdater = "balance_edit"}
$('#tablebody'+append2).append("<tr data-address='"+element.address+"' data-coin='"+element.coin+"'><td class='dontbreakout'>"+thisaddress+"</td><td class='centeritem'>"+element.coin+"</td><td class='"+balanceupdater+"' id='balance_"+element.coin+element.address+"'>"+element.balance+"</td><td class='centeritem'>"+element.tracked.toString().replace(0, '&#9744;').replace(1, '&#9745;')+"</td>"
+"<td class='valuecount' data-value='"+thisaddressvalue+"'>"+thisaddressvalue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+""+selectedcurrencyicon+"</td><td class='addresslabel addresslabel_edit dontbreakout'>"+getaddresslabel(element.coin, element.address)+"</td><td class='removebtn centeritem'>&#x2718;</td></tr>"); 
}
});
}
callback();
$(".img_addressheader").on("error", function() {$(this).attr('src', 'icons32/placeholder.png');});
}

$(document).on('click', '.balance_edit', function() {
	console.log("clicked");
$('.balanceupdate').click();
var thisupdate = $(this).removeClass('balance_edit');
var thiscoin = $(thisupdate).parent().data("coin");
var thisaddress = $(thisupdate).parent().data("address");
var thisbalance = $(thisupdate).text();
$(thisupdate).html("<input class='balanceupdate"+thisaddress+"' value='"+thisbalance+"' type='number' placeholder='0.00' step='any'><button class='uibutton balanceupdate'>OK</button>");
$('.balanceupdate'+thisaddress).focus();
$('.balanceupdate').click(function () {
thisbalance = $('.balanceupdate'+thisaddress).val().replace(/</g, "&lt;").replace(/>/g, "&gt;");	
updatebalance(thiscoin, thisaddress, thisbalance);
$(thisupdate).html(thisbalance).addClass('balance_edit');
updateaddressbalances();
});
$('.balanceupdate'+thisaddress).keyup(function(e){
    if(e.keyCode == 13)
    {
        $('.balanceupdate').click();
    }
});
});

$(document).on('click', '.addresslabel_edit', function() {
	$('.labelupdate').click();
var thisupdate = $(this).removeClass('addresslabel_edit');
var thiscoin = $(thisupdate).parent().data("coin");
var thisaddress = $(thisupdate).parent().data("address");
var thislabel = $(thisupdate).text();
$(thisupdate).html("<input class='addresslabelupdate addresslabelupdate"+thisaddress+"' value='"+thislabel+"' maxlength='256'><button class='uibutton labelupdate'>OK</button>");
$('.addresslabelupdate'+thisaddress).focus();
$('.labelupdate').click(function () {
thislabel = $('.addresslabelupdate'+thisaddress).val().replace(/</g, "&lt;").replace(/>/g, "&gt;");	
updatelabel(thiscoin, thisaddress, thislabel);
$(thisupdate).html(thislabel).addClass('addresslabel_edit');
updateaddressbalances();
});
$('.addresslabelupdate'+thisaddress).keyup(function(e){
    if(e.keyCode == 13)
    {
        $('.labelupdate').click();
    }
});
});


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


function updateprice( coin, value, percentage_change_24h ) {
   for (var i in coinset) {
     if (coinset[i].coin == coin) {
        coinset[i].value = value;
		coinset[i].percentage_change_24h = percentage_change_24h;
        break;
     }
   }
}


function removeaddress( coin, address ) {
   for (var i in addresslist) {
     if (addresslist[i].coin == coin && addresslist[i].address == address) {
        addresslist.splice(i, 1)
		successmessage("Address:"+address+" ("+coin+") removed");
		//buildaddresstable(function(){});
		localStorage.setItem("addresslist", JSON.stringify(addresslist));
        break; 
     }
   }
}

function updatebalance( coin, address, balance ) {
	var newbalance = parseFloat(balance, 10)
   for (var i in addresslist) {
     if (addresslist[i].coin == coin && addresslist[i].address == address) {
        addresslist[i].balance = newbalance;
		addresslist[i].lastupdate = Date.now();
        break; 
     }
   }
}

function updatelabel( coin, address, label ) {
   for (var i in addresslist) {
     if (addresslist[i].coin == coin && addresslist[i].address == address) {
        addresslist[i].label = label;
		successmessage("label:"+label+" for address "+address+" ("+coin+") updated");
		token_updateaccount();
        break; 
     }
   }
}

function getaddresslabel(coin, address){
var thislabel =  "";
for(var i = 0; i < addresslist.length; ++i){
	if (addresslist[i].coin == coin && addresslist[i].address == address) {
	if (addresslist[i].hasOwnProperty("label")){
		thislabel = addresslist[i].label;
	}else{
		addresslist[i].label = "";
	}
}
}
return thislabel;
}


function gettrackedaddresses(coin){
var trackedaddresses =  0;
for(var i = 0; i < addresslist.length; ++i){
    if(addresslist[i].coin == coin)
        trackedaddresses++;
}
return trackedaddresses;
}

/*
function gettrackedtokens(coin){
var trackedaddresses =  0;
for(var i = 0; i < addresslist.length; ++i){
    if(addresslist[i].coin == coin)
        trackedaddresses++;
}
return trackedaddresses;
}
*/

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

function dupechecktoken(inArr, address, coin, tokenID, exists){
    for (i = 0; i < inArr.length; i++ )
    {
        if (inArr[i].address == address && inArr[i].coin == coin && inArr[i].tokenID == tokenID)
        {
            return (exists === true) ? true : inArr[i];
        }
    }
}

function updatetokenbalance( address, coin, tokenID, balance ) {
   for (var i in addresslist) {
     if (tokenset[i].address == address && tokenset[i].coin == coin && tokenset[i].tokenID == tokenID) {
        tokenset[i].balance = balance;
		tokenset[i].lastupdate = Date.now();
        break; 
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
debugmessage(selectedcoin+" "+setting);
coinenabler(selectedcoin, setting);
});

function navigationmanager(target){
if (target == "addressmanager"){
localsettings.addressupdatebock = 1
}else{
localsettings.addressupdatebock = 0
}
$('.navbutton').removeClass("activenav");
$('*[data-dest="'+target+'"]').addClass("activenav");
$( ".uilvl1" ).fadeOut(animationspeed);
setTimeout(function(){
$("#"+target).fadeIn(animationspeed);	
//$("#"+target).css('display', 'inline-block');
},animationspeed);
}


function builduntrackedcoinsettings(){
$.getJSON("https://api.coingecko.com/api/v3/coins/list", function(choices){
	debugmessage(choices);
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
		debugmessage(matches);
    },
	renderItem: function (item, search){
        search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
		debugmessage(item);
		debugmessage(item.symbol);	
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
		$('#addstaticbalancerapper').append("<button class='uibutton' data-coin='"+item.data('symbol')+"' data-coinname='"+item.data('name')+"' id='addstaticbalancebtn'>Add</button>");
        debugmessage(item.data('symbol'));
        debugmessage(item.data('symbol'));
    }
});
});
}


$(document).on('click', '#addstaticbalancebtn', function() {
var coinsymbol = $(this).data("coin");
var coinname = $(this).data("coinname");
var balance = $("#staticbalance").val();	
if (parseFloat(balance, 10)){

var address = $("#staticdescritpion").val().replace(/</g, "&lt;").replace(/>/g, "&gt;");
addstaticaddress(coinsymbol, coinname, balance, address, function(){
$("#addstaticbalancerapper").remove();
//$("#addstaticbalancebtn").remove();
//
});
}
debugmessage(coinsymbol);
});

function genpriceupdater (){
		successmessage("price update");
		getcoinrates(function(){
		if (localsettings.addressupdatebock == 0){buildaddresstable(function(){});}
		updategrandbalance();
		buildcointable();
		coinsettingsgen();
		});	
}


function thememanager(theme){
$("body").removeClass();	
$( "body" ).addClass( theme );
$("html").removeClass();	
$( "html" ).addClass( theme );
if (theme == "eightbit"){iconfolder = "icons32/";}
//coinbalancechart();
debugmessage("adding: "+theme);
//buildstats();
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
	   debugmessage("fontmanager: "+fontID);
    }


function loading(status){
if (status == 1){
$( "#addressimport" ).prop( "disabled", true );	
$( "#cointablewrapper" ).css('opacity', '0.1');
$( "#pindicator" ).fadeIn(500);
//$( "#pindicator" ).removeClass( "animated tada" );	
$( "#pindicator" ).addClass( "animated flash infinite" );	
//animateCSS('#wlogo', 'bounce')
	}
if (status == 0){
$( "#addressimport" ).prop( "disabled", false );		
$( "#cointablewrapper" ).css('opacity', '1');	
$( "#pindicator" ).removeClass( "animated flash infinite" );	
$( "#pindicator" ).fadeOut(500);
//animateCSS('#wlogo', 'tada')
	}
}