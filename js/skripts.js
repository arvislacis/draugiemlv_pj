// (CC BY-SA) 2013 Arvis Lācis
// arvis.lacis@gmail.com | http://twitter.com/arvislacis | http://al.id.lv
// Versija 0.2.3 pārbaudīta ar JSHint (http://www.jshint.com/) - kļūdas netika atrastas

/* jshint bitwise:true, curly:true, eqeqeq:true, forin:true, globalstrict:true, newcap:true, noarg:true, noempty:true, onevar: true, undef:true, unused:true, browser:true, jquery:true, indent:4 */
/* global chrome:false, webkitNotifications:false */

"use strict";

$(document).ready(function () {
	function zina (nosaukums, teksts, taimeris) {
		var pazinojums = webkitNotifications.createNotification("", nosaukums, teksts);

		pazinojums.show();

		if (taimeris === true) {
			setTimeout(function () {
				pazinojums.cancel();
			}, 5000);
		}
	}

	function atjaunot (lietotajs, vestules, jaunumi, statistika, galerijas, grupas, dienasgramatas, citi, kalendars, online) {
		$.get("http://www.draugiem.lv", function (data) {
			var vards = $(data).find("#my-name a").text(),
				teksts = " | ",
				dati = [
					["Vēstules", $(data).find("#menuMessages .badge").text(), vestules],
					["Profila jaunumi", $(data).find("#myProfileNews .badge").text(), jaunumi],
					["Statistika", $(data).find("#menuVisitors .badge").text(), statistika],
					["Galerijas", $(data).find("#menuGallery .badge").text(), galerijas],
					["Grupas", $(data).find("#menuGroups .badge").text(), grupas],
					["Dienasgrāmatas", $(data).find("#menuBlogs .badge").text(), dienasgramatas],
					["Citi", $(data).find("#menuCiti .badge").text(), citi],
					["Kalendārs", $(data).find("#calendarBox .badge").text(), kalendars],
					["Draugi online", $(data).find("#menuFriends .badge").text(), online]
				];

			$.each(dati, function (i) {
				if ((dati[i][1] !== "") && (dati[i][2] === true)) {
					teksts = teksts + dati[i][0] + ": " + dati[i][1] + " | ";
				}
			});

			if (((vards === lietotajs) || (lietotajs === "")) && (teksts !== " | ")) {
				if (vards !== "") {
					zina(vards, teksts, true);
				} else {
					zina("Kļūda iegūstot datus", "Atvainojiet, mēģinot iegūt datus no Jūsu Draugiem.lv profila, radās kļūda. Pārliecinieties, ka Jums ir patstāvīgs savienojums ar savu Draugiem.lv profilu.", false);
				}
			}
		});
	}

	chrome.alarms.onAlarm.addListener(function (alarm) {
		if (alarm.name === "dr_atjaunot") {
			chrome.storage.local.get (null, function (iest) {
				if (iest.dr_iestatijumi === true) {
					atjaunot(iest.dr_lietotajs, iest.dr_vestules, iest.dr_jaunumi, iest.dr_statistika, iest.dr_galerijas, iest.dr_grupas, iest.dr_dienasgramatas, iest.dr_citi, iest.dr_kalendars, iest.dr_online);
				} else {
					atjaunot("", true, true, true, true, true, true, true, true, true);
				}
			});
		}
	});

	chrome.storage.local.get (null, function (iest) {
		if (iest.dr_iestatijumi === true) {
			chrome.alarms.create("dr_atjaunot", {periodInMinutes: iest.dr_biezums});
		} else {
			chrome.alarms.create("dr_atjaunot", {periodInMinutes: 5});
		}
	});
});