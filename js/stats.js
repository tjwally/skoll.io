
function statsgen () {
var settingselement = "stats";
$('#contentwrapper').append('<div id="'+settingselement+'wrapper" class="uilvl1"></div>');
var thisenabled = "";
var thisdisabled = "";
if (settings.stats.enabled == 1){thisenabled = "checked"}else{thisdisabled = "checked"}
$('#settingsgenmarker').after('<div class="container"><div class="heading2">Statistics</div><div id="'+settingselement+'settings"></div></div>');
$('#'+settingselement+'settings').append("<div><label class='radio radioon' for='radio"+settingselement+"on'><input class='"+settingselement+"onoffswitch' type='radio' id='radio"+settingselement+"on' name='"+settingselement+"' value='1' "+thisenabled+"><span>"
+"On</span></label><label class='radio radiooff' for='radio"+settingselement+"off'><input class='"+settingselement+"onoffswitch' type='radio' id='radio"+settingselement+"off' name='"+settingselement+"' value='0' "+thisdisabled+"><span>Off</span></label></div>");

if (settings.stats.enabled == 1){
statssetup();
}
}


$(document).on('click', '.statsonoffswitch', function() {
$("[data-dest='statswrapper']").remove();
var setting = $(this).val();
settings.stats.enabled = setting;
if (setting == 1){statssetup();}
if (authtoken !== 0){token_updateaccount();}
localStorage.setItem("settings", JSON.stringify(settings));
});


function statssetup () {
if (settings.stats.enabled == 1){
if (!$("[data-dest='statswrapper']").length) {	
$('#navelements').append('<div class="navbutton" data-sort="3" data-dest="statswrapper">Statistics</div>');
$("#navelements").sortNav();
}
//buildstats();
}
}

function buildstats() {
if (settings.stats.enabled == 1){
if (addresslist.length > 1){	
$('#statswrapper').html("");
$('#statswrapper').append('<div class="container"><div class="heading2">Wealth/Coin Distribution</div><div id="chart_assetdistribution" class="statschartcontainer"></div></div>');	
if (localsettings.distibutionchartloading < 1){
if (localsettings.distibutionchartloaded > 0){chart_assetdistribution.destroy();localsettings.distibutionchartloaded = 0;}
localsettings.distibutionchartloading = 1;
successmessage("loading statistics");

	
var options = {
            chart: {
				width: '100%',
                type: 'donut',
				foreColor: '#fff'
			},
            series: [],
            labels: [],
            theme: {
                monochrome: {
                    enabled: false
                }
            },

/*            title: {
                text: "Value/Coin Distribution",
				align: 'left',
				                style: {
                    fontSize: "64px;"
                }
            },
*/		            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
						width: '100%'
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }


options.colors = ["#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177" ,"#0d5ac1" ,"#f205e6" ,"#1c0365" ,"#14a9ad" ,"#4ca2f9" ,"#a4e43f" ,"#d298e2" ,"#6119d0","#d2737d" ,"#c0a43c" ,"#f2510e" ,"#651be6" ,"#79806e" ,"#61da5e" ,"#cd2f00" ,"#9348af" ,"#01ac53" ,"#c5a4fb" ,"#996635","#b11573" ,"#4bb473" ,"#75d89e" ,"#2f3f94" ,"#2f7b99" ,"#da967d" ,"#34891f" ,"#b0d87b" ,"#ca4751" ,"#7e50a8" ,"#c4d647" ,"#e0eeb8" ,"#11dec1" ,"#289812" ,"#566ca0" ,"#ffdbe1" ,"#2f1179" ,"#935b6d" ,"#916988" ,"#513d98" ,"#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d","#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977"];

if (settings.theme == "eightbit"){
var hue = 120;
var colors = [];
	for (i = 0; i < coinset.length; i++ )
    {	
	colors.push(hslToHex(hue, rand(20,90), rand(30, 50)));
	}
options.chart.foreColor = '#00ff00';
options.colors = colors

}
if (settings.theme == "bitcoin"){
options.chart.foreColor = '#F59722';
}
		
options.chart.fontFamily = settings.fontfamily;
	successmessage("loading chart");
    var coins = [];
	var balances = [];
	for (i = 0; i < coinset.length; i++ )
    {
	if (coinset[i].enabled == 1){
	var thicoinbalance = gettotalcoinbalance(coinset[i].coin);
	var thicoinvalue = (thicoinbalance * coinset[i].value).toFixed(0);
	//console.log(thicoinbalance);
	//console.log(thicoinvalue);
	if (thicoinvalue > 0){
	coins.push(coinset[i].name)
	balances.push(parseInt(thicoinvalue))
	}
	}
	}
options.series = balances;
options.labels = coins;
//console.log(balances);
//console.log(coins);
setTimeout(function(){
		chart_assetdistribution = new ApexCharts(
            document.querySelector("#chart_assetdistribution"),
            options
        );
chart_assetdistribution.render();
localsettings.distibutionchartloading = 0;	
localsettings.distibutionchartloaded = 1;	
},animationspeed+animationspeed);

successmessage("building asset distribution chart");	
}
}else{
$('#statswrapper').html("no stats available yet");	

}
}
}

