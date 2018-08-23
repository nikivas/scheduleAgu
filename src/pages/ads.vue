<template>
  <q-page>
      <div id="notes" style="width:98%;" class="text-justify"></div>
	<q-inner-loading id="spinnerAds" :visible="true">
		<div class="fixed fixed-center text-center">
			<q-spinner-gears class="relative-position" size="50px" style="color:#b30b5fff"></q-spinner-gears>
			<p style="color:black;font-weight: bold;">Подождите,идет загрузка данных</p>
		</div>
	</q-inner-loading>
  </q-page>
</template>

<script>
	export default
	{
		mounted()
		{
			this.loadNotes();
		},
		methods:
		{
			loadNotes()
			{
				if(navigator.connection.type!=Connection.NONE)
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
		}
	}
</script>