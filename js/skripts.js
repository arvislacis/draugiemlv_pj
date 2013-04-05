// (CC BY-SA) 2013 Arvis Lācis (@arvislacis)
// Versija 0.1.7 pārbaudīta ar JSHint (http://www.jshint.com/) - kļūdas netika atrastas

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

	function atjaunot () {
		$.get("http://www.draugiem.lv", function (data) {
			var vards = $(data).find("#my-name a").text(), teksts = " | ", dati = [
				{
					kategorija: "Vēstules",
					vertiba: $(data).find("#menuMessages .badge").text()
				},

				{
					kategorija: "Profila jaunumi",
					vertiba: $(data).find("#myProfileNews .badge").text()
				},

				{
					kategorija: "Statistika",
					vertiba: $(data).find("#menuVisitors .badge").text()
				},

				{
					kategorija: "Galerijas",
					vertiba: $(data).find("#menuGallery .badge").text()
				},

				{
					kategorija: "Grupas",
					vertiba: $(data).find("#menuGroups .badge").text()
				},

				{
					kategorija: "Dienasgrāmatas",
					vertiba: $(data).find("#menuBlogs .badge").text()
				},
				
				{
					kategorija: "Citi",
					vertiba : $(data).find("#menuCiti .badge").text()
				},

				{
					kategorija: "Kalendārs",
					vertiba : $(data).find("#calendarBox .badge").text()
				},

				{
					kategorija: "Draugi online",
					vertiba: $(data).find("#menuFriends .badge").text()
				}
			];

			$.each(dati, function (i) {
				if (dati[i].vertiba !== "") {
					teksts = teksts + dati[i].kategorija + ": " + dati[i].vertiba + " | ";
				}
			});

			if (vards !== "") {
				zina(vards, teksts, true);
			} else {
				zina("Kļūda iegūstot datus", "Atvainojiet, mēģinot iegūt datus no Jūsu Draugiem.lv profila, radās kļūda. Pārliecinieties, ka Jums ir patstāvīgs savienojums ar savu Draugiem.lv profilu.", false)
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

	$("#iestatijumi").css({"text-align" : "center"});
	$("#saglabat").onclick(function () {
		
	});

	chrome.alarms.onAlarm.addListener(function (alarm) {
		if (alarm.name === "dr_atjaunot") {
			atjaunot();
		}
	});

	chrome.alarms.create("dr_atjaunot", {periodInMinutes: 5});
});