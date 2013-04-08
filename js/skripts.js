// (CC BY-SA) 2013 Arvis Lācis
// arvis.lacis@gmail.com | http://twitter.com/arvislacis | http://al.id.lv
// Versija 0.2.1 pārbaudīta ar JSHint (http://www.jshint.com/) - kļūdas netika atrastas

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

	function atjaunot (lietotajs) {
		$.get("http://www.draugiem.lv", function (data) {
			var vards = $(data).find("#my-name a").text(),
				teksts = " | ",
				dati = [
					["Vēstules", $(data).find("#menuMessages .badge").text()],
					["Profila jaunumi", $(data).find("#myProfileNews .badge").text()],
					["Statistika", $(data).find("#menuVisitors .badge").text()],
					["Galerijas", $(data).find("#menuGallery .badge").text()],
					["Grupas", $(data).find("#menuGroups .badge").text()],
					["Dienasgrāmatas", $(data).find("#menuBlogs .badge").text()],
					["Citi", $(data).find("#menuCiti .badge").text()],
					["Kalendārs", $(data).find("#calendarBox .badge").text()],
					["Draugi online", $(data).find("#menuFriends .badge").text()]
				];

			$.each(dati, function (i) {
				if (dati[i][1] !== "") {
					teksts = teksts + dati[i][0] + ": " + dati[i][1] + " | ";
				}
			});

			if ((vards === lietotajs) || (lietotajs === "")) {
				if (vards !== "") {
					zina(vards, teksts, true);
				} else {
					zina("Kļūda iegūstot datus", "Atvainojiet, mēģinot iegūt datus no Jūsu Draugiem.lv profila, radās kļūda. Pārliecinieties, ka Jums ir patstāvīgs savienojums ar savu Draugiem.lv profilu.", false);
				}
			}
		});
	}

	function cilne (adrese) {
		chrome.tabs.create({url: "http://www.draugiem.lv/" + adrese + "/"});
	}

	chrome.omnibox.onInputEntered.addListener(function (ievade) {
		switch (ievade) {
		case "die":
		case "dienasgrāmatas":
		case "blogi":
		case "emuāri":
		case "dienasgramatas":
		case "emuari":
			cilne("blogs");
			break;
		case "dra":
		case "draugi":
		case "online":
		case "tiešsaistē":
			cilne("friends");
			break;
		case "gal":
		case "galerijas":
		case "galerija":
			cilne("gallery");
			break;
		case "gru":
		case "grupas":
		case "grupa":
			cilne("groups");
			break;
		case "lap":
		case "lapas":
		case "lapa":
			cilne("lapas");
			break;
		case "sta":
		case "statistika":
		case "apmeklētāji":
		case "skatījumi":
		case "apmeklejumi":
		case "skatijumi":
			cilne("visitors");
			break;
		case "vēs":
		case "ves":
		case "vēstules":
		case "vēstule":
		case "vestules":
		case "vestule":
			cilne("messages");
			break;
		default:
			cilne("");
		}
	});

	chrome.alarms.onAlarm.addListener(function (alarm) {
		if (alarm.name === "dr_atjaunot") {
			chrome.storage.local.get (null, function (iest) {
				if (iest.dr_iestatijumi === true) {
					atjaunot(iest.dr_lietotajs);
				} else {
					atjaunot("");
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