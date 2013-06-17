/*

Mazie draugi - Paplašinājums, kas informē par jaunumiem Draugiem.lv profilā.
Copyright (C) 2013 Arvis Lācis

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

/* jshint bitwise:true, curly:true, eqeqeq:true, forin:true, globalstrict:true, newcap:true, noarg:true, noempty:true, onevar: true, undef:true, unused:true, browser:true, jquery:true, indent:4 */
/* global chrome:false, webkitNotifications:false */

"use strict";

$(document).ready(function () {
	function zina () {
		$.get("http://www.draugiem.lv/messages/", function (data) {
			var info = $(data).find(".unread");

			$(info).each(function () {
				var pazinojums = webkitNotifications.createNotification("",
					"Vēstule no " + $(this).find(".ml_user").text() + " (" + $(this).find(".ml_time").text() + ")",
					$(this).find(".ml_subject").text());

				pazinojums.show();

				setTimeout(function () {
					pazinojums.cancel();
				}, 10000);
			});
		});
	}

	function atjaunot () {
		chrome.browserAction.setBadgeBackgroundColor({color: "#009900"});
		chrome.browserAction.setBadgeText({text: "..."});

		$.get("http://www.draugiem.lv", function (data) {
				if ($(data).find("#my-name a").text() === "") {
					chrome.browserAction.setBadgeBackgroundColor({color: "#000000"});
					chrome.browserAction.setBadgeText({text: "XXX"});

					$("#info").html("<div class='btn-group btn-group-vertical'><a class='btn btn-success' href='http://www.draugiem.lv' target='_window'>Pieslēgties Draugiem.lv<strong></div>");
				}

				var attels = $(data).find(".picture img").prop("src").replace("nm", "i"),
				info = "<div class='btn-group btn-group-vertical'><a class='btn btn-mini' href='http://www.draugiem.lv' target='_window'><strong>" + $(data).find("#my-name a").text() +"</strong></a><a class='btn' href='http://www.draugiem.lv/account/' target='_window'><img src='" + attels + "'></a>",

				d = [
/* 00 */				["Profila jaunumi", "", $(data).find("#myProfileNews .badge").text()],
/* 01 */				["Uzaicinājumi", "invitations/", $(data).find(".friendshipIcon .badge").text()],
/* 02 */				["Galerijas", "gallery/", $(data).find("#menuGallery .badge").text()],
/* 03 */				["Aplikācijas", "applications/", $(data).find("#menuApp .badge").text()],
/* 04 */				["Grupas", "groups/", $(data).find("#menuGroups .badge").text()],
/* 05 */				["Lapas", "lapas/", $(data).find("#menuLapas .badge").text()],
/* 06 */				["Mūzika", "music/", $(data).find("#menuMusic .badge").text()],
/* 07 */				["Citi", "", $(data).find("#menuCiti .open .badge").text()],
/* 08 */				["Statistika", "visitors/", $(data).find("#menuVisitors .badge").text()],
/* 09 */				["Draugi online", "friends/", $(data).find("#menuFriends .badge").text()],
/* 10 */				["Dienasgrāmatas", "blogs/", $(data).find("#menuBlogs .badge").text()],
/* 11 */				["Vēstules", "messages/", $(data).find("#menuMessages .badge").text()],
					],

					statistika = d[8][2],
					vestules = d[11][2];

				$.each(d, function (i) {
					if (d[i][2] !== "") {
						info = info + "<a class='btn btn-mini' href='http://www.draugiem.lv/" + d[i][1] + "' target='_window'>" + d[i][0] + ": <strong>" + d[i][2] + "</strong></a>";
					}
				});

				$("#info").html(info + "</div>");

				if ((d[2][2] !== "") || (d[7][2] !== "") || (d[10][2] !== "")) {
					chrome.browserAction.setBadgeBackgroundColor({color: "#999900"});
				}

				if ((d[0][2] !== "") || (d[1][2] !== "") || (d[4][2] !== "") || (d[5][2] !== "")) {
					chrome.browserAction.setBadgeBackgroundColor({color: "#000099"});
				}

				if (statistika === "") {
					statistika = "0";
				}

				if (vestules === "") {
					vestules = "0";
				} else {
					chrome.browserAction.setBadgeBackgroundColor({color: "#990000"});
					zina();
				}

				chrome.browserAction.setBadgeText({text: statistika + " " + vestules});
			});
	}

	atjaunot();

	chrome.alarms.onAlarm.addListener(function (alarm) {
		if (alarm.name === "mazie_draugi") {
			atjaunot();
		}
	});

	chrome.alarms.create("mazie_draugi", {periodInMinutes: 2});
});