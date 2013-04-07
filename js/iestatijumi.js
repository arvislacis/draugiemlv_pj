// (CC BY-SA) 2013 Arvis Lācis (@arvislacis)
// Versija 0.2.0 pārbaudīta ar JSHint (http://www.jshint.com/) - kļūdas netika atrastas

/* jshint bitwise:true, curly:true, eqeqeq:true, forin:true, globalstrict:true, newcap:true, noarg:true, noempty:true, onevar: true, undef:true, unused:true, browser:true, jquery:true, indent:4 */
/* global chrome:false */

"use strict";

$(document).ready(function () {
	var laiks = [2, 5, 10, 15, 20, 30, 60],
		indekss;

	chrome.storage.local.get (null, function (iest) {
		if (iest.dr_indekss !== undefined) {
			indekss = iest.dr_indekss;
		} else {
			indekss = 1;
		}

		$("#intervals").val(indekss);
		$("#intervals_txt").html("ik pēc <b>" + laiks[indekss] + "</b> minūtēm");
	});

	$("#iestatijumi").css({"text-align" : "center"});

	$("#intervals").change(function () {
		$("#intervals_txt").html("ik pēc <b>" + laiks[$("#intervals").val()] + "</b> minūtēm");
	});

	$("#saglabat").click(function () {
		chrome.storage.local.set ({
			dr_indekss: $("#intervals").val(),
			dr_biezums: laiks[$("#intervals").val()]
		});

		chrome.alarms.clear("dr_atjaunot");
		chrome.alarms.create("dr_atjaunot", {periodInMinutes: laiks[$("#intervals").val()]});
	});
});