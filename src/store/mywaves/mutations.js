import { Notify } from 'quasar';
import axios from 'axios';
import { Dialog } from 'quasar'
export function acceptar (state) {
	var checked_grupovuha =  $("input[name='grupovuha']:checked");
	if(checked_grupovuha.length<=0)
	{
		Notify.create({
			type:'negative',
			message: 'Выберите группы',
			position : 'bottom'
		});
	}
	else
	{	
		localStorage.removeItem('meine_liben_groups');
		var meine_liben_groups=[];
		checked_grupovuha.each((index,element)=>{
			meine_liben_groups.push(element.value);
		});
		localStorage.setItem('meine_liben_groups',JSON.stringify(meine_liben_groups));
		$("#settings_block").addClass("animated fadeOutLeft");
		setTimeout(()=>{
			$("#settings_block").addClass("hidden");
			$("#meine_groups").removeClass("hidden");
		},1000);
		preloadMeineKurses(state);
		findSchedule(state);
	}
	return true;
}

export function preloadMeineKurses(state){
	if(localStorage.getItem('meine_liben_groups'))
	{
		var meine_liben_groups = JSON.parse(localStorage.getItem('meine_liben_groups'));
		$("#meine_liben_groups").empty();
		meine_liben_groups.forEach( function(element, index) {
			var appended_result ;
			var count_added=0;
			appended_result = "<input type='radio' checked='true' value='"+element+ 
			"' name='liebenGroups' class='liebenGroupsCheckbox form-radio animated bounceIn' />"
			+ element;
			$("#meine_liben_groups").append(appended_result);
	   		count_added++;
	    	if(count_added%3==0){$("#meine_liben_groups").append("<br>");}
		});	
	}
}

export function findSchedule(state)
{
	try {
		$("#schedule").empty();
		var checked_grupovuha =  $("input[name='liebenGroups']:checked");
		$("#spinnerDzyuba").removeClass("hidden");
		if(navigator.connection.type==Connection.NONE)
		{	
			axios.get('http://raspisanie.asu.edu.ru/student/schedule/'+checked_grupovuha[0].value)
			.then((response)=>{
				$("#schedule").append(response.data);
				localStorage.setItem(checked_grupovuha[0].value, JSON.stringify(response.data));
				$("#spinnerDzyuba").addClass("hidden");
				//jQuery.scrollTo("#schedule",1000);
				Notify.create({
					type:'positive',
					message: 'Расписание загруженно успешно',
					position : 'bottom'
				});
			}).catch((err)=>{
				Dialog.create({
					title:'Ошибка!',
  					message:err.toString()
				});
				$("#spinnerDzyuba").addClass("hidden");
			});
		}
		else
		{
			var schedule = localStorage.getItem(checked_grupovuha[0].value.toString());
			if(schedule!=null)
			{
				$("#schedule").append(schedule);
			}
			else
			{
				$("#schedule").append("<p class='text-center'>Расписание отсутствует. Проверьте интернет соединение</p>");
			}
			$("#spinnerDzyuba").addClass("hidden");
		}
	} catch(e) {
		
	}
}