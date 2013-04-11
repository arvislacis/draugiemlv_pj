// (CC BY-SA) 2013 Arvis Lācis
// arvis.lacis@gmail.com | http://twitter.com/arvislacis (@arvislacis) | http://al.id.lv

/* jshint bitwise:true, curly:true, eqeqeq:true, forin:true, globalstrict:true, newcap:true, noarg:true, noempty:true, onevar: true, undef:true, unused:true, browser:true, jquery:true, indent:4 */
/* global chrome:false */

"use strict";

$(document).ready(function () {
	chrome.storage.local.get (null, function (iest) {
		if (iest.dr_iestatijumi === true) {
			$("#vestules").prop("checked", iest.dr_vestules);
			$("#jaunumi").prop("checked", iest.dr_jaunumi);
			$("#statistika").prop("checked", iest.dr_statistika);
			$("#galerijas").prop("checked", iest.dr_galerijas);
			$("#grupas").prop("checked", iest.dr_grupas);
			$("#dienasgramatas").prop("checked", iest.dr_dienasgramatas);
			$("#citi").prop("checked", iest.dr_citi);
			$("#kalendars").prop("checked", iest.dr_kalendars);
			$("#online").prop("checked", iest.dr_online);

			$("#laiks").val(iest.dr_laiks);
			$("#aizvert").prop(iest.dr_aizvert);

			$("#lietotajs").val(iest.dr_lietotajs);
			$("#foto").prop("checked", iest.dr_foto);
		}
	});

	$("#saglabat").click(function () {
		chrome.storage.local.set ({
			dr_iestatijumi: true,

			dr_vestules: $("#vestules").prop("checked"),
			dr_jaunumi: $("#jaunumi").prop("checked"),
			dr_statistika: $("#statistika").prop("checked"),
			dr_galerijas: $("#galerijas").prop("checked"),
			dr_grupas: $("#grupas").prop("checked"),
			dr_dienasgramatas: $("#dienasgramatas").prop("checked"),
			dr_citi: $("#citi").prop("checked"),
			dr_kalendars: $("#kalendars").prop("checked"),
			dr_online: $("#online").prop("checked"),

			dr_laiks: parseInt($("#laiks").val(), 10),
			dr_aizvert: $("#aizvert").prop("checked"),

			dr_lietotajs: $("#lietotajs").val(),
			dr_foto: $("#foto").prop("checked")
		});

		chrome.alarms.clear("dr_atjaunot");
		chrome.alarms.create("dr_atjaunot", {periodInMinutes: parseInt($("#laiks").val(), 10)});
	});

	$("#saglabat").popover({
		content: "Iestatījumi saglabāti!",
		placement: "top",
		animation: true
	});

	$("#lietotajs").popover({
		content: "Paziņojumi tiks rādīti tikai šim Draugiem.lv lietotājam.",
		placement: "right",
		animation: true
	});
});