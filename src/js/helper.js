import { Dialog } from 'quasar'
import {$q} from 'quasar'
$(document).on('click','#load_changes',function(){
	update();
});
function update () {
	if(navigator.connection.type!=Connection.NONE)
	{
		$("#fidgetSpinner").removeClass("hidden");
		load_faculty();
		load_spec();
	}
}
function load_faculty()
{
	$.ajax({
		url:'http://raspisanie.asu.edu.ru/student/faculty',
		type:'POST',
		crossDomain:true,
		success:function(data){
			var result = JSON.parse(data);
			if(result!=null)
			{
				localStorage.setItem('faculties',data);
			}
		},
		error:function (data) {
			$("#fidgetSpinner").addClass("hidden");
		}
	});
}
function load_spec () {
	$.ajax({
		 url: 'http://m.raspisanie.asu.edu.ru/student/specialty',
		 type:'POST',
		 success:function (data) {
		 	var result = JSON.parse(data);
		 	if(result!=null)
			{
				localStorage.setItem('all_specialities',data);
			}
		 },
		 complete:function () {
		 	$("#fidgetSpinner").addClass("hidden");
			$q.Dialog.dialog({
			title: 'Alert',
			message: 'Modern HTML5 front-end framework on steroids.'
			});
		 },
		 error:function () {
			$("#fidgetSpinner").addClass("hidden");
		}
	});
}