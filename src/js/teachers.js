  import * as jq from '../../node_modules/jquery/dist/jquery.min.js';
  import * as ui from '../js/jquery.ui.js';

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
	$( "#log" ).empty();	
	$('[name = teacher]').val(message);
}