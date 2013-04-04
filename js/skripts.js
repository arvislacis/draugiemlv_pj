$(document).ready(function () {
	function zina (nosaukums, teksts) {
		var zina = webkitNotifications.createNotification("", nosaukums, teksts);

		zina.show();

		setTimeout(function () {
			zina.cancel();
		}, 5000);
	}

	function atjaunot () {
		$.get("http://www.draugiem.lv", function (data) {
			var jaunumi = {"Vēstules" : $(data).find("#menuMessages .badge").text(),
				"Profila jaunumi" : $(data).find("#myProfileNews .badge").text(),
				"Statistika" : $(data).find("#menuVisitors .badge").text(),
				"Galerijas" : $(data).find("#menuGallery .badge").text(),
				"Grupas" : $(data).find("#menuGroups .badge").text(),
				"Dienasgrāmatas" : $(data).find("#menuBlogs .badge").text(),
				"Citi" : $(data).find("#menuCiti .badge").text(),
				"Kalendārs" : $(data).find("#calendarBox .badge").text(),
				"Draugi online" : $(data).find("#menuFriends .badge").text()
			};
				
			var teksts = " | ";
	
			$.each(jaunumi, function (kategorija, skaits) {
				if (skaits != 0) {
					teksts = teksts + kategorija + ": " + skaits + " | ";
				}
			});

			zina($(data).find("#my-name a").text() + " (jaunumi Draugiem.lv profilā)", teksts);
		});
	}

	chrome.alarms.onAlarm.addListener(function (alarm) {
		if (alarm.name === "dr_atjaunot") {
			atjaunot();
		}
	});

	chrome.alarms.create("dr_atjaunot", {periodInMinutes : 2});
});