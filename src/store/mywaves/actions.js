export  async function load_faculties(state)
{
	$("#spinnerDzyuba").removeClass("hidden");
	 state.getters.getFaculties.then((data)=>{
		for (var i = 0; i < data.length; i++)
		{
			$("#facul")
			.append($("<option></option>")
			.attr("value", $.trim(data[i].id))
			.text(data[i].name));
		}
		$("#spinnerDzyuba").addClass("hidden");
		load_speacilaty(state,$("#facul").val());
	});
}
export async function load_speacilaty(state,id_faculty)
{
	$("#spinnerDzyuba").removeClass("hidden");
	state.getters.getSpecialities.then((specialities)=>{
	var filtered_spec =	specialities.filter((item)=>{
			if(item.kod_spec == id_faculty) return true;
		});
		$("#spec").empty();
		filtered_spec.forEach( function(element, index) {
			$("#spec")
			.append($("<option></option>")
			.attr("value", $.trim(element.id))
			.text(element.name));
		});	
		var id_spec =$('#spec').val()!=null ? $('#spec').val().split('?') : '0';
		var kurs = $('input[name="kurs"]:checked').val();
		load_grup(state,id_spec[0],kurs);
		$("#spinnerDzyuba").addClass("hidden");
	});
}
export function spec_changed(state)
{
	var id_spec =$('#spec').val()!=null ? $('#spec').val().split('?') : '0';
	var kurs = $('input[name="kurs"]:checked').val();
	load_grup(state,id_spec[0],kurs);
}
export async function load_grup(state,id_spec,kurs){
	console.log('id_spec '+id_spec);
	console.log('id_kurs '+kurs);
	$("#spinnerDzyuba").removeClass("hidden");
	state.getters.getGroups.then((groups)=>{
		var filtered_groups =	groups.filter((item)=>{
		if(item.KURS == kurs &&  item.SHIFR_SPEC_NEW == id_spec) return true;
		});

		$("#groups").empty();
		var count_added=0;
		filtered_groups.forEach( function(element, index) {
			var appended_result ;
			appended_result = "<input type='checkbox' value='"+element.GRUP+ 
			"' name='grupovuha' class='grupCheckbox form-radio animated bounceIn' />"
			+ element.GRUP;
			$("#groups").append(appended_result);
       		count_added++;
        	if(count_added%3==0){$("#groups").append("<br>");}
		});	

		$("#spinnerDzyuba").addClass("hidden");
	});
}
export function preloaded_kurses(state)
{
	$('#kurs').empty();
	var str = "";
	for (var i = 1; i < 7; i++) 
	{
		str += "<input class='kursCheckbox form-radio' type='radio' name='kurs' value='"+i+"'>"
		+i+"&nbsp;&nbsp;&nbsp;" ;
		if(i%3==0 && $(document).width()<=400){str+="<br/>";}
	}
	$("#kurs").append(str);
	$(".kursCheckbox").on('click',function(event){
		kursChecked(state);
	});
}
export function kursChecked(state)
{
	spec_changed(state);
}