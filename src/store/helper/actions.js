import { Dialog } from 'quasar'
import { Notify } from 'quasar'
export function load_change() {
	update();
}
var count_operations=0;
var general_operations=6;
export function update() {
	$("#update_button").prop("disabled", true);
	if (navigator.onLine) {
		$("#fidgetSpinner").removeClass("hidden");
		load_faculty();
		load_spec();
		load_grups();
		load_teachers();
		load_korpus();
		load_audi();
	}
	else {
		Dialog.create({
			title: 'Ошибка!',
			message: 'Проверьте интернет-соединение'
		});
	}
}
export function load_faculty() {
	var result;
	$.ajax({
		url: 'http://raspisanie.asu.edu.ru/student/faculty',
		type: 'POST',
		crossDomain: true,
		success: function (data) {
			result = JSON.parse(data);
			if (result != null && result.length != 0) {
				localStorage.setItem('faculties', data);
			}
		},
		error: function (data) {
			Notify.create({
				type: 'negative',
				message: 'Произошла ошибка с загрузкой факультетов'
			});
		},
		complete: function () {
			checkCount();
		}
	});
	return result;
}
export function load_spec() {
	$.ajax({
		url: 'http://m.raspisanie.asu.edu.ru/student/specialty',
		type: 'POST',
		success: function (data) {
			var result = JSON.parse(data);
			if (result != null && result.length != 0) {
				localStorage.setItem('all_specialities', data);
			}
		},
		complete: function () {
			checkCount();
		},
		error: function () {
			Notify.create({
				type: 'negative',
				message: 'Произошла ошибка с загрузкой специальностей'
			});
		}
	});
}
export function load_grups() {
	jQuery.ajax({
		url: 'http://raspisanie.asu.edu.ru/student/grup',
		type: 'POST',
		success: function (data) {
			var result = JSON.parse(data);
			if (result != null && result.length != 0) {
				localStorage.setItem('all_groupies', data);
			}
		},
		error: function () {
			Notify.create({
				type: 'negative',
				message: 'Ошибка при загрузке групп'
			});
		},
		complete: function(){
			checkCount();
		}

	});
}
export function load_teachers() {
	$.ajax({
		url: 'http://raspisanie.asu.edu.ru/teacher/all',
		type: 'GET',
		success: function (data) {
			var birds = JSON.parse(data);
			if (birds != null && birds.length != 0) {
				localStorage.setItem('birds', data);
			}
		},
		complete : function(){
			checkCount();
		},
		error:function(){
			Notify.create({
				type: 'negative',
				message: 'Произошла ошибка с загрузкой преподавателей'
			});
		}
	});
}
export function load_korpus() {
	jQuery.ajax({
		url: 'http://raspisanie.asu.edu.ru/audience/korpus',
		type: 'POST',
		success: function (data) {
			var korpuses = jQuery.parseJSON(data);
			if (korpuses != null && korpuses.length != 0) {
				localStorage.setItem('korpuses', data);
			}
		},
		complete : function(){
			checkCount();
		},
		error:function(){
			Notify.create({
				type: 'negative',
				message: 'Произошла ошибка с загрузкой корпусов'
			});
		}
	});
}
export function load_audi() {
	jQuery.ajax({
		url: 'http://raspisanie.asu.edu.ru/audience/audience',
		type: 'POST',
		success: function (data) {
			var result = jQuery.parseJSON(data);
			if (result != null && result.length != 0) { localStorage.setItem('all_aud', data); }
		},
		complete: function () {
			checkCount();
		},
		error: function () {
			Notify.create({
				type: 'negative',
				message: 'Произошла ошибка с загрузкой аудиторий'
			});
		}

	});
}
function checkCount()
{
	count_operations++;
	if(count_operations==general_operations)
	{
		$("#update_button").prop("disabled",false);
		$("#fidgetSpinner").addClass("hidden");
		Dialog.create({
			title:'Информация',
			message:"Загрузка завершена"
		});
		count_operations=0;
	}
}