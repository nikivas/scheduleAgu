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
	console.log(id_faculty)
	$("#spinnerDzyuba").removeClass("hidden");
	state.getters.getSpecialities.then((specialities)=>{
		specialities.filter((item)=>{
			return item.kod_spec == id_faculty;
		});
		specialities.forEach( function(element, index) {
			$("#spec")
			.append($("<option></option>")
			.attr("value", $.trim(element.id))
			.text(element.name));
		});	
		$("#spinnerDzyuba").addClass("hidden");
	});
}