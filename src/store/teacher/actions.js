
import scrollTo from '../../js/jquery.scroll.js';
export function load_teacher() {
	//загрузка списка преподавателей
	try {
		var birds = [];
		$("#teacher_spinner").removeClass("hidden");
		if (!localStorage.getItem('birds')) {
			$.ajax({
				url: 'http://raspisanie.asu.edu.ru/teacher/all',
				type: 'GET',
				timeout:15000,
				success: function (data) {
					birds = JSON.parse(data);
					localStorage.setItem('birds', data);
				},
				complete: function () {
					var rich_sex = {};
					rich_sex = $.map(birds, function (element) {
						return {
							id: element.id,
							value: element.fio
						};
					});
					$("#birds").autocomplete(
						{
							source: rich_sex,
							minLength: 3,
							select: function (event, ui) {
								log(ui ? ui.item.id : this.value);
							}
						});
					$("#teacher_spinner").addClass("hidden");
				},
				error: function (err) {
					$("#teacher_spinner").addClass("hidden");
					$("#schedule").append(err);
				}
			});
		}
		else {
			birds = JSON.parse(localStorage.getItem('birds'));
			var rich_sex = $.map(birds, function (element) {
				return {
					id: element.id,
					value: element.fio
				}
			});
			$("#birds").autocomplete(
				{
					source: rich_sex,
					minLength: 3,
					select: function (event, ui) {
						log(ui ? ui.item.id : this.value);
					}
				});
			$("#teacher_spinner").addClass("hidden");
		}
	}
	catch (e) {
		$("#schedule").append(e);
		$("#teacher_spinner").addClass("hidden");
	}
}
export function log(message) {
	$("#log").empty();
	$('[name = teacher]').val(message);
}
