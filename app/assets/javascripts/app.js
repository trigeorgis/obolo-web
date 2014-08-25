$(function(){

	$.clearNofications = function( element ) {
		$(element).find("div.notifications").html("").hide();
	}

	$.maskLoading = function(selector, opt){
		if(opt.showLoading){
			$(selector).attr("disabled","disabled").text(opt.msg).val(opt.msg);
		}else{
			$(selector).removeAttr("disabled").text(opt.msg).val(opt.msg);
		}
	}


	$.isUndefined = function(ref){
		return typeof(ref)==='undefined';
	}

	$.getNewTextArea = function(referenceId){
		return CodeMirror.fromTextArea(document.getElementById(referenceId), {
			theme: "eclipse",
			lineWrapping:true,
			lineNumbers: true,
			mode: "application/json"
		});
	}


	//initialize TextArea's
 	var editCobSessionToken = $.getNewTextArea("response-cobSessionToken");
	var editUserSessionToken = $.getNewTextArea("response-userSessionToken");

	var editSearchSite = $.getNewTextArea("response-searchSite");
	var editGetSiteLoginForm = $.getNewTextArea("response-getSiteLoginForm");
	var editAddSiteAccount = $.getNewTextArea("response-addSiteAccount");
	var editGetItemSummaries = $.getNewTextArea("response-getItemSummaries");

	/************************************************************************************/
	/************************************************************************************/
	/************************************************************************************/
	//Get Cobrand Session Token
	/************************************************************************************/
	/************************************************************************************/

	$(".btn-cobSession-Token").click(function(){
		$.clearNofications("div.cobSessionToken");
		
		if($("#cobrandLogin").val() == ""){
			alert("You must Enter the cobrandLogin");
			$("#cobrandLogin").focus();
			return false;
		}

		if($("#cobrandPassword").val() == ""){
			alert("You must Enter the cobrandPassword");
			$("#cobrandPassword").focus();
			return false;
		}

		$.maskLoading(this,{showLoading:true, msg:"Loading..."});

		$.ajax({
			method: "POST",
			data:   {
				'cobrandLogin'   : $("#cobrandLogin").val(),
				'cobrandPassword': $("#cobrandPassword").val()
			},
			url: "cobrandSessionToken",
			success: function(data, textStatus, jqXHR){
				try{
					var response =  data;
					if (!$.isUndefined(response.Body)){
						response.Body = (typeof(response.Body) == "object")? response.Body : JSON.parse(response.Body);
					}
					if (!$.isUndefined(response.Body.cobrandConversationCredentials)) {
						$("#cobSessionToken, input.ref-cobSessionToken").val(response.Body.cobrandConversationCredentials.sessionToken);
					}
					editCobSessionToken.setOption("value", JSON.stringify(response.Body, null, 4));
				}catch(e){}
				$.maskLoading(".btn-cobSession-Token",{showLoading:false, msg:"Get CobSession Token"});
			},
			error: function(){
				$.maskLoading(".btn-cobSession-Token",{showLoading:false, msg:"Send data"});
			}
		});
		return false;
	});


	/************************************************************************************/
	/************************************************************************************/
	/************************************************************************************/
	//Get Cobrand Session Token
	/************************************************************************************/
	/************************************************************************************/

	$(".btn-userSession-Token").click(function(e){
		$.clearNofications("div.userSessionToken");
		
		if($("#login").val() == ""){
			alert("You must Enter the User name");
			$("#cobrandLogin").focus();
			return false;
		}

		if($("#password").val() == ""){
			alert("You must Enter the password");
			$("#passoword").focus();
			return false;
		}

		if($("#cobSessionToken").val() == ""){
			alert("You must get the Cobrand session token first.");
			return false;
		}
		$.maskLoading(this,{showLoading:true, msg:"Loading..."});
		$.ajax({
			method: "POST",
			data:   {
				'login'   :  	   $("#login").val(),
				'password': 	   $("#password").val(),
				'cobSessionToken': $("#cobSessionToken").val()
			},
			url:    "userSessionToken",
			success: function(data, textStatus, jqXHR){
				try{
					var response = data;
					if (!$.isUndefined(response.Body)){
						response.Body = (typeof(response.Body) == "object")? response.Body : JSON.parse(response.Body);
					}
					if (!$.isUndefined(response.Body.userContext)) {
						$("#userSessionToken, input.ref-userSessionToken").val(response.Body.userContext.conversationCredentials.sessionToken);
					}
					editUserSessionToken.setOption("value", JSON.stringify(response.Body, null, 4));
				}catch(e){}
				$.maskLoading(".btn-userSession-Token",{showLoading:false, msg:"Get CobSession Token"});
			},
			error: function(){
				$.maskLoading(".btn-userSession-Token",{showLoading:false, msg:"Send data"});
			}
		});
		return false;
	});


	/************************************************************************************/
	/************************************************************************************/
	/************************************************************************************/
	//Get Search Site
	/************************************************************************************/
	/************************************************************************************/
	$(".btn-searchSite").click(function(e){
		if($("#cobSessionToken").val() == ""){
			alert("You must get the Cobrand session token.");
			return false;
		}

		if($("#userSessionToken").val() == ""){
			alert("You must get the User Session Token.");
			return false;
		}

		$("div.searchSite").find(".response").val("");
		$.maskLoading("button.btn-searchSite",{showLoading:true, msg:"Loading..."});
		$.ajax({
			method: "POST",
			data: {
				'cobSessionToken': $("#cobSessionToken").val(),
				'userSessionToken': $("#userSessionToken").val(),
				'siteSearchString': $("input.ref-SearchSites-siteSearchString").val()
			},
			url: "searchSites",
			success: function(data, textStatus, jqXHR){
				try{
					var response = data;
					if (!$.isUndefined(response.Body)){
						response.Body = (typeof(response.Body) == "object")? response.Body : JSON.parse(response.Body);
					}
					editSearchSite.setOption("value", JSON.stringify(response.Body, null, 4));
				}catch(e){
					editSearchSite.setOption("value", response.Body);
				}
				$.maskLoading("button.btn-searchSite",{showLoading:false, msg:"Send data"});
			},
			error: function(){
				$.maskLoading("button.btn-searchSite",{showLoading:false, msg:"Send data"});
			}
		});
		return false;
	});


	/************************************************************************************/
	/************************************************************************************/
	/************************************************************************************/
	//Get Site Login Form
	/************************************************************************************/
	/************************************************************************************/

	$(".btn-getSiteLoginForm").click(function(e){
		if($("#cobSessionToken").val() == ""){
			alert("You must get the Cobrand session token.");
			return false;
		}

		if($("#userSessionToken").val() == ""){
			alert("You must get the User Session Token.");
			return false;
		}

		$("div.getSiteLoginForm").find(".response").val("");
		$.maskLoading("button.btn-getSiteLoginForm",{showLoading:true, msg:"Loading..."});
		$.ajax({
			method: "POST",
			data:   {
				'cobSessionToken': $("#cobSessionToken").val(),
				'userSessionToken': $("#userSessionToken").val(),
				'siteId': $("input.ref-getSiteLoginForm-siteId").val()
			},
			url: "getSiteLoginForm",
			success: function(data, textStatus, jqXHR){
				try{
					var response = data;
					if (!$.isUndefined(response.Body)){
						response.Body = (typeof(response.Body) == "object")? response.Body : JSON.parse(response.Body);
					}
					editGetSiteLoginForm.setOption("value", JSON.stringify(response.Body, null, 4));
				}catch(e){
					editGetSiteLoginForm.setOption("value", response.Body);
				}
				$.maskLoading("button.btn-getSiteLoginForm",{showLoading:false, msg:"Send data"});
			},
			error: function(){
				$.maskLoading("button.btn-getSiteLoginForm",{showLoading:false, msg:"Send data"});
			}
		});
		return false;
	});

	/************************************************************************************/
	/************************************************************************************/
	/************************************************************************************/
	//Get addSiteAccount
	/************************************************************************************/
	/************************************************************************************/
	$(".btn-addSiteAccount").click(function(e){
		if($("#cobSessionToken").val() == ""){
			alert("You must get the Cobrand session token.");
			return false;
		}

		if($("#userSessionToken").val() == ""){
			alert("You must get the User Session Token.");
			return false;
		}

		var parameters = $("#IDaddSiteAccount").serialize();

		$("div.addSiteAccount").find(".response").val("");
		$.maskLoading("button.btn-addSiteAccount",{showLoading:true, msg:"Loading..."});
		$.ajax({
			method: "POST",
			data:   {
				'params': parameters
			},
			url: "addSiteAccount",
			success: function(data, textStatus, jqXHR){
				try{
					var response = data;
					if (!$.isUndefined(response.Body)){
						response.Body = (typeof(response.Body) == "object")? response.Body : JSON.parse(response.Body);
					}
					editAddSiteAccount.setOption("value", JSON.stringify(response.Body, null, 4));
				}catch(e){
					editAddSiteAccount.setOption("value", response.Body);
				}
				$.maskLoading("button.btn-addSiteAccount",{showLoading:false, msg:"Send data"});
			},
			error: function(){
				$.maskLoading("button.btn-addSiteAccount",{showLoading:false, msg:"Send data"});
			}
		});
		return false;
	});

	/************************************************************************************/
	/************************************************************************************/
	/************************************************************************************/
	//Get getItemSummaries
	/************************************************************************************/
	/************************************************************************************/
	$(".btn-getItemSummaries").click(function(e){
		if($("#cobSessionToken").val() == ""){
			alert("You must get the Cobrand session token.");
			return false;
		}

		if($("#userSessionToken").val() == ""){
			alert("You must get the User Session Token.");
			return false;
		}

		$("div.getItemSummaries").find(".response").val("");
		$.maskLoading("button.btn-getItemSummaries",{showLoading:true, msg:"Loading..."});
		$.ajax({
			method: "POST",
			data:   {
				'cobSessionToken': $("#cobSessionToken").val(),
				'userSessionToken': $("#userSessionToken").val()
			},
			url: "getItemSummaries",
			success: function(data, textStatus, jqXHR){
				try{
					var response = data;
					if (!$.isUndefined(response.Body)){
						response.Body = (typeof(response.Body) == "object")? response.Body : JSON.parse(response.Body);
					}				
					editGetItemSummaries.setOption("value", JSON.stringify(response.Body, null, 4));
				}catch(e){
					editGetItemSummaries.setOption("value", response.Body);
				}
				$.maskLoading("button.btn-getItemSummaries",{showLoading:false, msg:"Send data"});
			},
			error: function(){
				$.maskLoading("button.btn-getItemSummaries",{showLoading:false, msg:"Send data"});
			}
		});
		return false;
	});

});