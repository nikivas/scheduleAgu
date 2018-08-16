import * as ui from '../js/jquery.ui.js';
import scrollTo  from '../js/jquery.scroll.js';
import '../js/jquery.scroll.js';
export function load_teacher() 
{ 
	//загрузка списка преподавателей
	try 
	{
		var birds=[];
		if(!localStorage.getItem('birds'))
		{
			$.ajax({
				url:'http://raspisanie.asu.edu.ru/teacher/all',
				type:'GET',
				success:function(data)
				{
					birds = JSON.parse(data);
					localStorage.setItem('birds',data);I
				},
				complete:function(){
					var rich_sex = {};
					rich_sex = $.map(birds,function(element){
						return {
							id:element.id,
							value:element.fio
						}
					});
					$("#birds").autocomplete(
					{
						source: rich_sex,
						minLength: 2,
						select: function( event, ui ) 
						{
							log( ui ? ui.item.id : this.value );
						}			
					});
				},
				error:function(){

				}
			});
		}
		else
		{
			birds = JSON.parse(localStorage.getItem('birds'));
			var rich_sex = $.map(birds,function(element)
			{
				return {
						id:element.id,
						value:element.fio
					}
			});
			$("#birds").autocomplete(
			{
				source: rich_sex,
				minLength: 2,
				select: function( event, ui ) 
				{
					log( ui ? ui.item.id : this.value );
				}			
			});

		}
	} 
	catch(e) 
	{
		$("#schedule").append(e);
	}
}
function log( message )
{
	$( "#log").val('');	
	$('[name = teacher]').val(message);
}
$(document).on('click','#search_teacher',function(){
	$("#schedule").empty();
	if($("#log")!='')
	{
		findScheduleOfTeacher($("#log").val());
	}
})
function findScheduleOfTeacher (id_teacher) {
	try 
	{
		$("#search_teacher").prop('disabled',true);
		$("#spinnerTeacher").removeClass('invisible');
		$("#spinnerTeacher").addClass('visible');
		$("#search_teacher").text('Идет загрузка...');
		var save_teacher = $("#birds").val();
		if(navigator.connection.type!=Connection.NONE)
		{
			$.ajax({
				url:'http://raspisanie.asu.edu.ru/teacher/getschedulejson/',
				type:'POST',
				data:{id:id_teacher},
				success:function (data) {
					var result = JSON.parse(data);
					if(!result.includes('отсутств'))
					{
						localStorage.setItem(save_teacher, data);
					}
					$("#schedule").append(result);
				},
				complete:function(){
					$("#spinnerTeacher").addClass('invisible');
					jQuery.scrollTo("#schedule",1000);
					$("#search_teacher").prop('disabled',false);
					$("#search_teacher").text('ПОКАЗАТЬ');
				},
				error:function (err) {
					var result = JSON.parse(localStorage.getItem(save_teacher));
					result!=null? $("#schedule").append(result) : $("#schedule").append(err);
					$("#spinnerTeacher").addClass('invisible');
					$("#search_teacher").prop('disabled',false);
					$("#search_teacher").text('ПОКАЗАТЬ');
				}
			});
		}
		else
		{
			var result = JSON.parse(localStorage.getItem(save_teacher));
			result!=null? $("#schedule").append(result)
			 : $("#schedule").append("<p>Отсутствует соединение с сервером</p>");
			$("#spinnerTeacher").addClass('invisible');
			$("#search_teacher").prop('disabled',false);
			jQuery.scrollTo("#schedule",1000);
			$("#search_teacher").text('ПОКАЗАТЬ');
		}
	} 
	catch(e) {
		$("#schedule").append(e);
	}
}