// (CC BY-SA) 2013 Arvis Lācis
// arvis.lacis@gmail.com | http://twitter.com/arvislacis (@arvislacis) | http://al.id.lv

/* jshint bitwise:true, curly:true, eqeqeq:true, forin:true, globalstrict:true, newcap:true, noarg:true, noempty:true, onevar: true, undef:true, unused:true, browser:true, jquery:true, indent:4 */
/* global chrome:false, webkitNotifications:false */

"use strict";

$(document).ready(function () {
	function zina (attels, nosaukums, teksts, taimeris) {
		var pazinojums = webkitNotifications.createNotification(attels, nosaukums, teksts);

		pazinojums.show();

		if (taimeris === true) {
			setTimeout(function () {
				pazinojums.cancel();
			}, 5000);
		}
	}

	function atjaunot () {
		$.get("http://www.draugiem.lv", function (data) {
			chrome.storage.local.get (null, function (iest) {
				var vards = $(data).find("#my-name a").text(),
					attels = $(data).find(".picture img").prop("src").replace("nm", "i"),
					teksts = " | ",
					dati = [
						["Vēstules", $(data).find("#menuMessages .badge").text(), iest.dr_vestules],
						["Profila jaunumi", $(data).find("#myProfileNews .badge").text(), iest.dr_jaunumi],
						["Statistika", $(data).find("#menuVisitors .badge").text(), iest.dr_statistika],
						["Galerijas", $(data).find("#menuGallery .badge").text(), iest.dr_galerijas],
						["Grupas", $(data).find("#menuGroups .badge").text(), iest.dr_grupas],
						["Dienasgrāmatas", $(data).find("#menuBlogs .badge").text(), iest.dr_dienasgramatas],
						["Citi", $(data).find("#menuCiti .badge").text(), iest.dr_citi],
						["Kalendārs", $(data).find("#calendarBox .badge").text(), iest.dr_kalendars],
						["Draugi online", $(data).find("#menuFriends .badge").text(), iest.dr_online]
					];

				$.each(dati, function (i) {
					if ((dati[i][1] !== "") && ((dati[i][2] === true) || (dati[i][2] === undefined))) {
						teksts = teksts + dati[i][0] + ": " + dati[i][1] + " | ";
					}
				});

				if (((vards === iest.dr_lietotajs) || (iest.dr_lietotajs === "")) && (teksts !== " | ")) {
					if (vards !== "") {
						zina(attels, vards, teksts, true);
					} else {
						zina("", "Kļūda iegūstot datus", "Atvainojiet, mēģinot iegūt datus no Draugiem.lv profila, radās kļūda. Pārliecinieties, ka Jums ir patstāvīgs savienojums ar Draugiem.lv profilu.", false);
					}
				}
			});
		});
	}

	chrome.alarms.onAlarm.addListener(function (alarm) {
		if (alarm.name === "dr_atjaunot") {
			atjaunot();
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