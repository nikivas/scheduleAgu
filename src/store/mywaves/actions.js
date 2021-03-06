import {Notify} from 'quasar'

export async function load_faculties(state) {
	state.getters.getFaculties.then((data) => {
		for (var i = 0; i < data.length; i++) {
			$("#facul")
				.append($("<option></option>")
					.attr("value", $.trim(data[i].id))
					.text(data[i].name));
		}
		load_speacilaty(state, $("#facul").val());
	}).catch((ex)=>{
		$("#spinnerDzyuba").addClass("hidden");
	});
}
export async function load_speacilaty(state, id_faculty) {
	state.getters.getSpecialities.then((specialities) => {
		var filtered_spec = specialities.filter((item) => {
			if (item.kod_spec == id_faculty) return true;
		});
		$("#spec").empty();
		filtered_spec.forEach(function (element, index) {
			$("#spec")
				.append($("<option></option>")
					.attr("value", $.trim(element.id))
					.text(element.name));
		});
		var id_spec = $('#spec').val() != null ? $('#spec').val().split('?') : '0';
		var kurs = $('input[name="kurs"]:checked').val();
		load_grup(state, id_spec[0], kurs);
	}).catch(()=>{
		$("#spinnerDzyuba").addClass("hidden");
	});
}
export function spec_changed(state) {
	var id_spec = $('#spec').val() != null ? $('#spec').val().split('?') : '0';
	var kurs = $('input[name="kurs"]:checked').val();
	load_grup(state, id_spec[0], kurs);
}
export async function load_grup(state, id_spec, kurs) {
	state.getters.getGroups.then((groups) => {
		var filtered_groups = groups.filter((item) => {
			if (item.KURS == kurs && item.SHIFR_SPEC_NEW == id_spec) return true;
		});

		$("#groups").empty();
		var count_added = 0;
		filtered_groups.forEach(function (element, index) {
			var appended_result;
			appended_result = "<input type='radio' value='" + element.GRUP +
				"' name='grupovuha' class='grupCheckbox form-radio animated bounceIn' />"
				+ element.GRUP;
			$("#groups").append(appended_result);
			count_added++;
			if (count_added % 3 == 0) { $("#groups").append("<br>"); }
		});
		if(!localStorage.getItem('meine_liben_groups'))
		{
			$("#spinnerDzyuba").addClass("hidden");
		}
	}).catch((err)=>{
		console.log(err);
		$("#spinnerDzyuba").addClass("hidden");
	});
}
export function preloaded_kurses(state) {
	$('#kurs').empty();
	var str = "";
	for (var i = 1; i < 7; i++) {
		str += "<input class='kursCheckbox form-radio' type='radio' name='kurs' value='" + i + "'>"
			+ i + "&nbsp;&nbsp;&nbsp;";
		if (i % 3 == 0 && $(document).width() <= 400) { str += "<br/>"; }
	}
	$("#kurs").append(str);
	$(".kursCheckbox").on('click', function (event) {
		kursChecked(state);
	});
}
export function kursChecked(state) {
	spec_changed(state);
}
export function checkVisibilty() {
	if (localStorage.getItem('meine_liben_groups') || localStorage.getItem('meine_liben_groups') == 0) {
		$("#settings_block").addClass("hidden");
	}
	else {
		$("#settings_block").removeClass("hidden");
		$("#meine_groups").addClass("hidden");
	}
}
export function goToSettings() {
	$("#settings_block").removeClass("hidden");
	$("#meine_groups").addClass("hidden");
	$("#settings_block").removeClass("animated fadeOutLeft");

}
export function returnToGroups() {
	$("#settings_block").addClass("hidden");
	$("#meine_groups").removeClass("hidden");
}
