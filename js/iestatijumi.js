// (CC BY-SA) 2013 Arvis Lācis (@arvislacis)
// arvis.lacis@gmail.com | http://twitter.com/arvislacis | http://al.id.lv
// Versija 0.2.2 pārbaudīta ar JSHint (http://www.jshint.com/) - kļūdas netika atrastas

/* jshint bitwise:true, curly:true, eqeqeq:true, forin:true, globalstrict:true, newcap:true, noarg:true, noempty:true, onevar: true, undef:true, unused:true, browser:true, jquery:true, indent:4 */
/* global chrome:false */

"use strict";

$(document).ready(function () {
	var laiks = [2, 5, 10, 15, 20, 30, 60];

	chrome.storage.local.get (null, function (iest) {
		if (iest.dr_iestatijumi === true) {
			$("#lietotajs").val(iest.dr_lietotajs);

			$("#vestules").prop("checked", iest.dr_vestules);
			$("#jaunumi").prop("checked", iest.dr_jaunumi);
			$("#statistika").prop("checked", iest.dr_statistika);
			$("#galerijas").prop("checked", iest.dr_galerijas);
			$("#dienasgramatas").prop("checked", iest.dr_dienasgramatas);
			$("#citi").prop("checked", iest.dr_citi);
			$("#kalendars").prop("checked", iest.dr_kalendars);
			$("#online").prop("checked", iest.dr_online);

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
			dr_lietotajs: $("#lietotajs").val(),

			dr_vestules: $("#vestules").prop("checked"),
			dr_jaunumi: $("#jaunumi").prop("checked"),
			dr_statistika: $("#statistika").prop("checked"),
			dr_galerijas: $("#galerijas").prop("checked"),
			dr_dienasgramatas: $("#dienasgramatas").prop("checked"),
			dr_citi: $("#citi").prop("checked"),
			dr_kalendars: $("#kalendars").prop("checked"),
			dr_online: $("#online").prop("checked"),

			dr_indekss: $("#intervals").val(),
			dr_biezums: laiks[$("#intervals").val()]
		});

		chrome.alarms.clear("dr_atjaunot");
		chrome.alarms.create("dr_atjaunot", {periodInMinutes: laiks[$("#intervals").val()]});
		$("#statuss").html("<b>Iestatījumi saglabāti!</b>").hide().fadeTo(2000, 1).fadeOut(2000, 0);
	});
});