// (CC BY-SA) 2013 Arvis Lācis (@arvislacis)
// Versija 0.1.9 pārbaudīta ar JSHint (http://www.jshint.com/) - kļūdas netika atrastas

/* jshint bitwise:true, curly:true, eqeqeq:true, forin:true, globalstrict:true, newcap:true, noarg:true, noempty:true, onevar: true, undef:true, unused:true, browser:true, jquery:true, indent:4 */
/* global chrome:false */

"use strict";

$(document).ready(function () {
	var laiks = [2, 5, 10, 15, 20, 30, 60],
		indekss;

	if (localStorage.dr_indekss !== undefined) {
		indekss = localStorage.dr_indekss;
	} else {
		indekss = 1;
	}

	$("#iestatijumi").css({"text-align" : "center"});

	$("#intervals").val(indekss);
	$("#intervals_txt").html("ik pēc <b>" + laiks[indekss] + "</b> minūtēm");

	$("#intervals").change(function () {
		$("#intervals_txt").html("ik pēc <b>" + laiks[$("#intervals").val()] + "</b> minūtēm");
	});

	$("#saglabat").click(function () {
		localStorage.dr_indekss = $("#intervals").val();
		localStorage.dr_biezums = laiks[$("#intervals").val()];

		chrome.alarms.clear("dr_atjaunot");
		chrome.alarms.create("dr_atjaunot", {periodInMinutes: laiks[$("#intervals").val()]});
	});
});