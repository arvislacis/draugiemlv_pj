// (CC BY-SA) 2013 Arvis Lācis (@arvislacis)
// arvis.lacis@gmail.com | http://twitter.com/arvislacis | http://al.id.lv
// Versija 0.2.1 pārbaudīta ar JSHint (http://www.jshint.com/) - kļūdas netika atrastas

/* jshint bitwise:true, curly:true, eqeqeq:true, forin:true, globalstrict:true, newcap:true, noarg:true, noempty:true, onevar: true, undef:true, unused:true, browser:true, jquery:true, indent:4 */
/* global chrome:false */

"use strict";

$(document).ready(function () {
	var laiks = [2, 5, 10, 15, 20, 30, 60];

	chrome.storage.local.get (null, function (iest) {
		if (iest.dr_iestatijumi === true) {
			$("#lietotajs").val(iest.dr_lietotajs);
			$("#intervals").val(iest.dr_indekss);
		}

		$("#intervals_txt").html("ik pēc <b>" + laiks[$("#intervals").val()] + "</b> minūtēm");
	});

	$("h2, #autors").css({"text-align": "center"});
	$("#statuss").css({"color": "green"}).hide();
	$("#iestatijumi").hide().fadeTo(2000, 1);

	$("#intervals").change(function () {
		$("#intervals_txt").html("ik pēc <b>" + laiks[$("#intervals").val()] + "</b> minūtēm");
	});

	$("#saglabat").click(function () {
		chrome.storage.local.set ({
			dr_iestatijumi: true,
			dr_indekss: $("#intervals").val(),
			dr_lietotajs: $("#lietotajs").val(),
			dr_biezums: laiks[$("#intervals").val()]
		});

		chrome.alarms.clear("dr_atjaunot");
		chrome.alarms.create("dr_atjaunot", {periodInMinutes: laiks[$("#intervals").val()]});
		$("#statuss").html("<b>Iestatījumi saglabāti!</b>").hide().fadeTo(2000, 1).fadeOut(2000, 0);
	});
});