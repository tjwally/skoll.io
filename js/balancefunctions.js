/*
function getaddressbalanceBTC(coin, address, callback) {
				$.ajax({
				type: "GET",
				url: "https://blockchain.info/q/addressbalance/"+address,
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				success: function(balance){
				var thisbalance = sb.toBitcoin(balance)
				updatebalance(coin, address, thisbalance)		
				$('#balance_'+coin+address).html(thisbalance);	
				successmessage("<b>"+coin+"</b> -- retrieved balance for address: "+address);
				callback();
					},
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }else{
				errormessage("<b>"+coin+"</b> -- timeout while fetching data for address: "+address);
				callback();
			}             
            return;
        }
		if (xhr.status == 500) {
				errormessage("<b>"+coin+"</b> -- html error 500 while fetching data for address: "+address);
				updatebalance(coin, address, 0)			
				callback();
        } else {
				errormessage("<b>"+coin+"</b> -- html error "+xhr.status+" while fetching data for address: "+address);
				callback();				
		}
	}			 
}); 
}
*/



/*
function getaddressbalanceBTC(coin, address, callback) {
				$.ajax({
				type: "GET",
				url: "https://api.blockchair.com/bitcoin/dashboards/address/"+address+"?limit=0",
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				success: function(balance){
				var thisbalance = sb.toBitcoin(balance.data[address].address.balance)
				updatebalance(coin, address, thisbalance)		
				$('#balance_'+coin+address).html(thisbalance);	
				successmessage("<b>"+coin+"</b> -- retrieved balance for address: "+address);
				callback();
					},
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }else{
				errormessage("<b>"+coin+"</b> -- timeout while fetching data for address: "+address);
				callback();
			}             
            return;
        }
		if (xhr.status == 500) {
				errormessage("<b>"+coin+"</b> -- html error 500 while fetching data for address: "+address);
				updatebalance(coin, address, 0)			
				callback();
        } else {
				errormessage("<b>"+coin+"</b> -- html error "+xhr.status+" while fetching data for address: "+address);
				callback();				
		}
	}			 
}); 
}
*/
function getaddressbalanceBTC(coin, address, callback) {
				$.ajax({
				type: "GET",
				url: "https://chainflyer.bitflyer.com/v1/address/"+address,
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				success: function(balance){
				var thisbalance = sb.toBitcoin(balance.confirmed_balance)
				updatebalance(coin, address, thisbalance)		
				$('#balance_'+coin+address).html(thisbalance);	
				successmessage("<b>"+coin+"</b> -- retrieved balance for address: "+address);
				callback();
					},
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }else{
				errormessage("<b>"+coin+"</b> -- timeout while fetching data for address: "+address);
				callback();
			}             
            return;
        }
		if (xhr.status == 500) {
				errormessage("<b>"+coin+"</b> -- html error 500 while fetching data for address: "+address);
				updatebalance(coin, address, 0)			
				callback();
        } else {
				errormessage("<b>"+coin+"</b> -- html error "+xhr.status+" while fetching data for address: "+address);
				callback();				
		}
	}			 
}); 
}


/*
function getaddressbalanceBTC(coin, address, callback) {
	var addr = {"addr": address}
	
				$.ajax({
				type: "POST",
				url: "https://www.blockonomics.co/api/balance",
				dataType: "json",
				data: JSON.stringify(addr),
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				success: function(balance){
				var thisbalance = sb.toBitcoin(balance.confirmed)
				updatebalance(coin, address, thisbalance)		
				$('#balance_'+coin+address).html(thisbalance);	
				successmessage("<b>"+coin+"</b> -- retrieved balance for address: "+address);
				callback();
					},
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }else{
				errormessage("<b>"+coin+"</b> -- timeout while fetching data for address: "+address);
				callback();
			}             
            return;
        }
		if (xhr.status == 500) {
				errormessage("<b>"+coin+"</b> -- html error 500 while fetching data for address: "+address);
				updatebalance(coin, address, 0)			
				callback();
        } else {
				errormessage("<b>"+coin+"</b> -- html error "+xhr.status+" while fetching data for address: "+address);
				callback();				
		}
	}			 
}); 
}
*/
function getaddresstokensBCH(coin, address, callbacktokens) {
var detectAddressFormat = bchaddr.detectAddressFormat;
var toCashAddress = bchaddr.toCashAddress;
var toSlpAddress = bchaddr.toSlpAddress;
var query = '{"v":3,"q":{"db":["a"],"aggregate": [{"$match": {"address": "'+toSlpAddress(address)+'"}},{"$sort": {"token_balance": -1}},{"$skip": 0},{"$limit": 10},{"$lookup": {"from": "tokens","localField": "tokenDetails.tokenIdHex","foreignField": "tokenDetails.tokenIdHex","as": "token"}}],"limit": 500}}';
var base64query = btoa(query);
				$.ajax({
				type: "GET",
				url: "https://slpdb.bitcoin.com/q/"+base64query,
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				success: function(balance){
				if(balance.a){
				//console.log(balance.a);
				balance.a.forEach(function(element, index) {
				if (!dupechecktoken(tokenset, address, coin, element.token[0].tokenDetails.tokenIdHex)){
				tokenset.push({"address":address, "coin":coin, tokenID: element.token[0].tokenDetails.tokenIdHex, "symbol": element.token[0].tokenDetails.symbol, "name": element.token[0].tokenDetails.name, "enabled" : 1, "balance": element.token_balance, "lastupdate": Date.now(), "tracked": 1})
				}else{
				updatetokenbalance(address, coin, element.token[0].tokenDetails.tokenIdHex, element.token_balance)	
				}
				

			});
				}
				successmessage("<b>"+coin+"</b> -- retrieved tokens for address: "+address);
				callbacktokens();
			},
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }else{
				errormessage("<b>"+coin+"</b> -- timeout while fetching data for address: "+address);
				callbacktokens();				
			}             
            return;
        }
		if (xhr.status == 500) {
				errormessage("<b>"+coin+"</b> -- html error 500 while fetching data for address: "+address);
				updatebalance(coin, address, 0)			
				callbacktokens();
        } else {
				errormessage("<b>"+coin+"</b> -- html error "+xhr.status+" while fetching data for address: "+address);
				callbacktokens();				
		}
	}							 
}); 
}


function getaddressbalanceBCH(coin, address, callback) {
var detectAddressFormat = bchaddr.detectAddressFormat;
var toCashAddress = bchaddr.toCashAddress;	
				$.ajax({
				type: "GET",
				url: "https://rest.bitcoin.com/v2/address/details/"+toCashAddress(address),
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				success: function(balance){
					if (balance.balanceSat !== null){
				var thisbalance = sb.toBitcoin(balance.balanceSat)
					}else{
						thisbalance = 0;
					}
				updatebalance(coin, address, thisbalance)	
				successmessage("<b>"+coin+"</b> -- retrieved balance for address: "+address);				
				$('#balance_'+coin+address).html(thisbalance);		
				callback();
					},
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }else{
				errormessage("<b>"+coin+"</b> -- timeout while fetching data for address: "+address);
				callback();
			}             
            return;
        }
		if (xhr.status == 500) {
				errormessage("<b>"+coin+"</b> -- html error 500 while fetching data for address: "+address);
				updatebalance(coin, address, 0)			
				callback();
        } else {
				errormessage("<b>"+coin+"</b> -- html error "+xhr.status+" while fetching data for address: "+address);
				callback();				
		}
	}				 
}); 
}

/*
function getaddressbalanceBCH(coin, address, callback) {
				$.ajax({
				type: "GET",
				url: "https://bch-chain.api.btc.com/v3/address/"+address,
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				success: function(balance){
					if (balance.data !== null){
				var thisbalance = sb.toBitcoin(balance.data.balance)
					}else{
						thisbalance = 0;
					}
				updatebalance(coin, address, thisbalance)	
				successmessage("<b>"+coin+"</b> -- retrieved balance for address: "+address);				
				$('#balance_'+coin+address).html(thisbalance);		
				callback();
					},
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }else{
				errormessage("<b>"+coin+"</b> -- timeout while fetching data for address: "+address);
				callback();
			}             
            return;
        }
		if (xhr.status == 500) {
				errormessage("<b>"+coin+"</b> -- html error 500 while fetching data for address: "+address);
				updatebalance(coin, address, 0)			
				callback();
        } else {
				errormessage("<b>"+coin+"</b> -- html error "+xhr.status+" while fetching data for address: "+address);
				callback();				
		}
	}				 
}); 
}
*/


function getaddressbalanceLTC(coin, address, callback) {
				$.ajax({
				type: "GET",
				url: "https://chainz.cryptoid.info/ltc/api.dws?a="+address+"&q=getbalance",
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				success: function(balance){
				var thisbalance = parseFloat(balance, 10)
				updatebalance(coin, address, thisbalance)		
				$('#balance_'+coin+address).html(thisbalance);	
				successmessage("<b>"+coin+"</b> -- retrieved balance for address: "+address);				
				callback();
					},
     error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }else{
				errormessage("<b>"+coin+"</b> -- timeout while fetching data for address: "+address);
				callback();
			}             
            return;
        }
		if (xhr.status == 500) {
				errormessage("<b>"+coin+"</b> -- html error 500 while fetching data for address: "+address);
				//updatebalance(coin, address, 0)			
				callback();
        } else {
				errormessage("<b>"+coin+"</b> -- html error "+xhr.status+" while fetching data for address: "+address);
				callback();				
		}
	}			 
}); 
}


function getaddressbalanceBTG(coin, address, callback) {
				$.ajax({
				type: "GET",
				url: "https://explorer.bitcoingold.org/insight-api/addr/"+address,
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				success: function(balance){
				var thisbalance = sb.toBitcoin(balance.balanceSat)
				updatebalance(coin, address, thisbalance)		
				$('#balance_'+coin+address).html(thisbalance);	
				successmessage("<b>"+coin+"</b> -- retrieved balance for address: "+address);				
				callback();
					},
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }else{
				errormessage("<b>"+coin+"</b> -- timeout while fetching data for address: "+address);
				callback();
			}             
            return;
        }
		if (xhr.status == 500) {
				errormessage("<b>"+coin+"</b> -- html error 500 while fetching data for address: "+address);
				updatebalance(coin, address, 0)			
				callback();
        } else {
				errormessage("<b>"+coin+"</b> -- html error "+xhr.status+" while fetching data for address: "+address);
				callback();				
		}
	}
}); 
}

function addstaticaddress(coinsymbol, coinname, balance, address, callback){
if (!dupecheckaddress(addresslist, address, coinsymbol.toLowerCase())){
if (!dupecheck(coinset, coinsymbol.toLowerCase())){
coinset.push({'coin':coinsymbol.toLowerCase(), 'enabled' : 1, 'token' : 0, 'name':coinname.toLowerCase(), 'value':0, 'tracked':0});
}
addresslist.push({"address":address, "coin":coinsymbol.toLowerCase(), "enabled" : 1, "balance": parseFloat(balance, 10), "lastupdate": Date.now(), "token": 0, "tracked": 0})
		localStorage.setItem("addresslist", JSON.stringify(addresslist));
		localStorage.setItem("coinset", JSON.stringify(coinsetdefault));
		token_updateaccount();
		getcoinrates(function(){
		buildaddresstable(function(){});
		updategrandbalance();
		buildcointable();
		coinsettingsgen();
		});

callback();
}
}


function getaddressbalanceETH(coin, address, callback) {
				$.ajax({
				type: "GET",
				url: "https://api.ethplorer.io/getAddressInfo/"+address+"?apiKey=freekey",
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				success: function(balance){
				if(balance.tokens){
				balance.tokens.forEach(function(element, index) {
				//console.log(balance.tokens);
				var thisbalancex = web3.toBigNumber(element.balance).div(10**element.tokenInfo.decimals).toFixed(3)
				var thisbalance = parseFloat(thisbalancex, 10)
				
				if (!dupechecktoken(tokenset, address, coin, element.tokenInfo.address)){
				tokenset.push({"address":address, "coin":coin, "tokenID": element.tokenInfo.address, "symbol": element.tokenInfo.symbol, "name": element.tokenInfo.name, "enabled" : 1, "balance": thisbalance, "lastupdate": Date.now(), "tracked": 1})
				}	
					
				if(element.tokenInfo.price){	
				if (element.tokenInfo.name == "eosDAC Community Owned EOS Block Producer ERC20 Tokens"){element.tokenInfo.name = "eosDAC"}
				if (!dupecheckaddress(addresslist, address, element.tokenInfo.symbol.toLowerCase())){
				if (!dupecheck(coinset, element.tokenInfo.symbol.toLowerCase())){
				coinset.push({'coin':element.tokenInfo.symbol.toLowerCase(), 'enabled' : 1, 'token' : "eth", 'name':element.tokenInfo.name, 'value':0, 'tracked':0});
				}
				addresslist.push({"address":address, "coin":element.tokenInfo.symbol.toLowerCase(), "enabled" : 1, "balance": thisbalance, "lastupdate": Date.now(), "token": "eth", "tracked": 0})
				successmessage("<b>"+element.tokenInfo.symbol.toLowerCase()+"</b> -- retrieved balance for token: "+element.tokenInfo.name);
				}
				}
				});					
				}
				if(balance.ETH){
				var thisbalance = balance.ETH.balance
				updatebalance(coin, address, thisbalance)		
				$('#balance_'+coin+address).html(thisbalance);		
				successmessage("<b>"+coin+"</b> -- retrieved balance for address: "+address);
				callback();
				}else{
				errormessage("<b>"+coin+"</b> -- no balance found while fetching data for address: "+address);	
				callback();
				}
				
					},
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }else{
				errormessage("<b>"+coin+"</b> -- timeout while fetching data for address: "+address);
				callback();
			}             
            return;
        }
		if (xhr.status == 500) {
				errormessage("<b>"+coin+"</b> -- html error 500 while fetching data for address: "+address);
				updatebalance(coin, address, 0)			
				callback();
        } else {
				errormessage("<b>"+coin+"</b> -- html error "+xhr.status+" while fetching data for address: "+address);
				callback();				
		}
	}				 
}); 
}



function getaddressbalanceNXT(coin, address, callback) {
				$.ajax({
				type: "GET",
				url: "https://multiexplorer.com/api/address_balance/22?address="+address+"&currency=nxt",
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				success: function(balance){
				if(balance){
				var thisbalance = parseFloat(balance.balance, 10)
				updatebalance(coin, address, thisbalance)		
				$('#balance_'+coin+address).html(thisbalance);		
				callback();
				successmessage("<b>"+coin+"</b> -- retrieved balance for address: "+address);
				}
			},
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }else{
				errormessage("<b>"+coin+"</b> -- timeout while fetching data for address: "+address);
				callback();				
			}             
            return;
        }
		if (xhr.status == 500) {
				errormessage("<b>"+coin+"</b> -- html error 500 while fetching data for address: "+address);
				updatebalance(coin, address, 0)			
				callback();
        } else {
				errormessage("<b>"+coin+"</b> -- html error "+xhr.status+" while fetching data for address: "+address);
				callback();				
		}
	}							 
}); 
}


function getaddressbalanceBSV(coin, address, callback) {
	setTimeout(function(){
				$.ajax({
				type: "GET",
				url: "https://api.blockchair.com/bitcoin-sv/dashboards/address/"+address+"?limit=0",
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				success: function(balance){
				if(balance.data[address].address.balance > 0){
				var thisbalance = sb.toBitcoin(balance.data[address].address.balance)
				updatebalance(coin, address, thisbalance)		
				$('#balance_'+coin+address).html(thisbalance);		
				callback();
				successmessage("<b>"+coin+"</b> -- retrieved balance for address: "+address);
				}else{
				errormessage("<b>"+coin+"</b> -- no balance found for address: "+address);	
				updatebalance(coin, address, 0)	
				callback();	
				}
			},
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }else{
				errormessage("<b>"+coin+"</b> -- timeout while fetching data for address: "+address);
				callback();				
			}             
            return;
        }
		if (xhr.status == 500) {
				errormessage("<b>"+coin+"</b> -- html error 500 while fetching data for address: "+address);
				updatebalance(coin, address, 0)			
				callback();
        } else {
				errormessage("<b>"+coin+"</b> -- html error "+xhr.status+" while fetching data for address: "+address);
				callback();				
		}
	}							 
}); 
}, 1000);
}




function getaddressbalanceDOGE(coin, address, callback) {
				$.ajax({
				type: "GET",
				//https://dogechain.info/chain/Dogecoin/q/addressbalance
				url: "https://dogechain.info/chain/Dogecoin/q/addressbalance/"+address,
				//url: "https://multiexplorer.com/api/address_balance/18?address="+address+"&currency=doge",
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				success: function(balance){
				if(balance){
				var thisbalance = parseFloat(balance, 10)
				updatebalance(coin, address, thisbalance)		
				$('#balance_'+coin+address).html(thisbalance);		
				callback();
				successmessage("<b>"+coin+"</b> -- retrieved balance for address: "+address);
				}
			},
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }else{
				errormessage("<b>"+coin+"</b> -- timeout while fetching data for address: "+address);
				callback();				
			}             
            return;
        }
		if (xhr.status == 500) {
				errormessage("<b>"+coin+"</b> -- html error 500 while fetching data for address: "+address);
				updatebalance(coin, address, 0)			
				callback();
        } else {
				errormessage("<b>"+coin+"</b> -- html error "+xhr.status+" while fetching data for address: "+address);
				callback();				
		}
	}							 
}); 
}


/*
function getaddressbalanceNXS(coin, address, callback) {

				$.ajax({
				type: "GET",
				url: "https://nexplorer.io/addresses/getaddressbalance?addressHash="+address+"&days=1",
				tryCount : 0,
				timeout: 60000,
				retryLimit : 3,
				success: function(balance){
				if(balance[0].balance){
				var thisbalance = parseFloat(balance[0].balance, 10)
				updatebalance(coin, address, thisbalance)		
				$('#balance_'+coin+address).html(thisbalance);		
				callback();
				successmessage("<b>"+coin+"</b> -- retrieved balance for address: "+address);
				}
			},
    error : function(xhr, textStatus, errorThrown ) {
        if (textStatus == 'timeout') {
            this.tryCount++;
            if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
                return;
            }else{
				errormessage("<b>"+coin+"</b> -- timeout while fetching data for address: "+address);
				callback();				
			}             
            return;
        }
		if (xhr.status == 500) {
				errormessage("<b>"+coin+"</b> -- html error 500 while fetching data for address: "+address);
				updatebalance(coin, address, 0)			
				callback();
        } else {
				errormessage("<b>"+coin+"</b> -- html error "+xhr.status+" while fetching data for address: "+address);
				callback();				
		}
	}							 
}); 
}
*/