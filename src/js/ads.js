export function load_notes () {
	if(navigator.connection.type==Connection.NONE)
	{
		$("#spinnerAds").removeClass("invisible");
		$("#spinnerAds").addClass("visible");
	 	jQuery.ajax({
	 		url:'http://raspisanie.asu.edu.ru/json_note',
	 		type:'GET',
	 		success:function (data) {
	 			var result = JSON.parse(data);
	 			localStorage.setItem('notes',data);
	 			result.forEach(function(ad)
	 			{
	 				$("#notes").append($("<p class='text-center'>"+ad.title+"</p>"));
	 				$("#notes").append($("<p class='text-justify'>"+ad.text+"</p>"));
	 			});
	 		}
	 		,
	 		complete:function(){
	 			$("#spinnerAds").addClass("invisible");
	 		},
	 		error:function(){
				var notes = jQuery.parseJSON(localStorage.getItem('notes'));
				notes.forEach(function(ad)
				{
				$("#notes").append($("<p class='text-center'>"+ad.title+"</p>"));
				$("#notes").append($("<p class='text-justify'>"+ad.text+"</p>"));
				});
	 			$("#spinnerAds").addClass("invisible");
	 		}
	 	});
	}
	else
	{	
		$("#spinnerAds").removeClass("invisible");
		$("#spinnerAds").addClass("visible");
		var notes = jQuery.parseJSON(localStorage.getItem('notes'));
		notes.forEach(function(ad)
		{
			$("#notes").append($("<p class='text-center'>"+ad.title+"</p>"));
			$("#notes").append($("<p class='text-justify'>"+ad.text+"</p>"));
		});
		$("#spinnerAds").addClass("invisible");

	}
}