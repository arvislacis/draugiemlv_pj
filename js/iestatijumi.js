// (CC BY-SA) 2013 Arvis Lācis
// arvis.lacis@gmail.com | http://twitter.com/arvislacis (@arvislacis) | http://al.id.lv

/* jshint bitwise:true, curly:true, eqeqeq:true, forin:true, globalstrict:true, newcap:true, noarg:true, noempty:true, onevar: true, undef:true, unused:true, browser:true, jquery:true, indent:4 */
/* global chrome:false */

"use strict";

$(document).ready(function () {
	chrome.storage.local.get (null, function (iest) {
		if (iest.dr_iestatijumi === true) {
			$("#lietotajs").val(iest.dr_lietotajs);

			$("#vestules").prop("checked", iest.dr_vestules);
			$("#jaunumi").prop("checked", iest.dr_jaunumi);
			$("#statistika").prop("checked", iest.dr_statistika);
			$("#galerijas").prop("checked", iest.dr_galerijas);
			$("#grupas").prop("checked", iest.dr_grupas);
			$("#dienasgramatas").prop("checked", iest.dr_dienasgramatas);
			$("#citi").prop("checked", iest.dr_citi);
			$("#kalendars").prop("checked", iest.dr_kalendars);
			$("#online").prop("checked", iest.dr_online);

			$("#intervals").val(iest.dr_laiks);
		}

		$("#intervals_txt").css({"font-weight": "bold"}).html($("#intervals").val());
	});

	$("#autors").css({"text-align": "center"});

	$("#intervals").change(function () {
		$("#intervals_txt").html($("#intervals").val());
	});

	$("#saglabat").click(function () {
		chrome.storage.local.set ({
			dr_iestatijumi: true,
			dr_lietotajs: $("#lietotajs").val(),

			dr_vestules: $("#vestules").prop("checked"),
			dr_jaunumi: $("#jaunumi").prop("checked"),
			dr_statistika: $("#statistika").prop("checked"),
			dr_galerijas: $("#galerijas").prop("checked"),
			dr_grupas: $("#grupas").prop("checked"),
			dr_dienasgramatas: $("#dienasgramatas").prop("checked"),
			dr_citi: $("#citi").prop("checked"),
			dr_kalendars: $("#kalendars").prop("checked"),
			dr_online: $("#online").prop("checked"),

			dr_laiks: $("#intervals").val()
		});

		chrome.alarms.clear("dr_atjaunot");
		chrome.alarms.create("dr_atjaunot", {periodInMinutes: $("#intervals").val()});
	});
});