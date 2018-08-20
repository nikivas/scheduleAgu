import * as ui from '../js/jquery.ui.js';
import scrollTo  from '../js/jquery.scroll.js';
import '../js/jquery.scroll.js';
export function load_teacher() 
{ 
	//загрузка списка преподавателей
	try 
	{
		var birds=[];
		$("#teacher_spinner").removeClass("hidden");
		if(!localStorage.getItem('birds'))
		{
			$.ajax({
				url:'http://raspisanie.asu.edu.ru/teacher/all',
				type:'GET',
				success:function(data)
				{
					birds = JSON.parse(data);
					localStorage.setItem('birds',data);
				},
				complete:function(){
					var rich_sex = {};
					rich_sex = $.map(birds,function(element){
						return {
							id:element.id,
							value:element.fio
						};
					});
					$("#birds").autocomplete(
					{
						source: rich_sex,
						minLength: 3,
						select: function( event, ui ) 
						{
							log( ui ? ui.item.id : this.value );
						}			
					});
					$("#teacher_spinner").addClass("hidden");
				},
				error:function(err){
					$("#teacher_spinner").addClass("hidden");
					$("#schedule").append(err);
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
				minLength: 3,
				select: function( event, ui ) 
				{
					log( ui ? ui.item.id : this.value );
				}			
			});
			$("#teacher_spinner").addClass("hidden");
		}
	} 
	catch(e) 
	{
		$("#schedule").append(e);
	}
}
function log( message )
{
	$( "#log").empty();	
	$('[name = teacher]').val(message);
}
$(document).on('click','#search_teacher',function(){
	$("#schedule").empty();
	if(($("#log").val())!='')
	{
		findScheduleOfTeacher($("#log").val(),true);
	}
	else 
	{
		if($("#birds").val()!='' && $("#birds").val().length>=3)
		{
			var bird_name = $("#birds").val();
			var birds = JSON.parse(localStorage.getItem('birds'));
			var for_research_array = birds.filter(function(item){
			if(item.fio.toLowerCase().includes(bird_name.toLowerCase()))
			{
				return true;
			}
			});
			if(for_research_array.length!=0)
			{
				for_research_array.forEach( function(element, index) {
					$("#search_teacher").prop('disabled',true);
					$("#teacher_spinner").removeClass('hidden');
					findScheduleOfTeacher(element.id,false);
				});
			}
			else
			{
				$("#schedule").append("Данные Отсутствуют");
			}
		}
	}
});
function findScheduleOfTeacher (id_teacher,_scroll) {
	try 
	{
		$("#search_teacher").prop('disabled',true);
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
					$("#search_teacher").prop('disabled',false);
					$("#search_teacher").text('ПОКАЗАТЬ');
					$("#teacher_spinner").addClass('hidden');
					if(_scroll==true)
					{
						console.log('scroll');
						jQuery.scrollTo("#schedule",1000);
					}
				},
				error:function (err) {
					var result = JSON.parse(localStorage.getItem(save_teacher));
					result!=null? $("#schedule").append(result) : $("#schedule").append(err);
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
			$("#search_teacher").prop('disabled',false);
			jQuery.scrollTo("#schedule",1000);
			$("#search_teacher").text('ПОКАЗАТЬ');
		}
	} 
	catch(e) {
		$("#schedule").append(e);
	}
}