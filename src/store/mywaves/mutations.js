/*
export const someMutation = (state) => {}
 */
import { Notify } from 'quasar';
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
		Notify.create({
			type:'positive',
			message: 'Группы выбраны успешно',
			position : 'bottom'
		});
	}
	return true;
}

export function preloadMeineKurses(state){
	var meine_liben_groups = JSON.parse(localStorage.getItem('meine_liben_groups'));
	meine_liben_groups.forEach( function(element, index) {
		var appended_result ;
		var count_added=0;
		appended_result = "<input type='checkbox' value='"+element+ 
		"' name='liebenGroups' class='liebenGroupsCheckbox form-radio animated bounceIn' />"
		+ element;
		$("#meine_liben_groups").append(appended_result);
   		count_added++;
    	if(count_added%3==0){$("#meine_liben_groups").append("<br>");}
	});	
}

