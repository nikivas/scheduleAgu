//////////////////////////////////////////////////HistoryAPI////////////////////////////////////////////////
import autocomplete  from '../../js/jquery.ui.js';
import scrollTo  from '../../js/jquery.scroll.js';
export function levikorpus()
{		
	try
	{
		$("#spinnerKorpus").removeClass("invisible");
		$("#spinnerKorpus").addClass("visible");
		if(!localStorage.getItem('korpuses'))
		{
			$("#korpus").empty();
			jQuery.ajax({
				url:'http://raspisanie.asu.edu.ru/audience/korpus',
				type:'POST',
				success : function(data){
				var korpuses = jQuery.parseJSON(data);
				localStorage.setItem('korpuses',data);
				for (var i = 0; i < korpuses.length; i++)
				{
					$("#korpus").append($("<option></option>")
					.attr("value",$.trim(korpuses[i].id)).text($.trim(korpuses[i].name)));
				}
				var choosen_korpus = localStorage.getItem('choosen_korpus') ? 
				localStorage.getItem('choosen_korpus')
				: korpuses.length!=0 ? $.trim(korpuses[0].id) :'no' ;
				$("#korpus").val(choosen_korpus);
					load_aud(choosen_korpus);
				},
				complete:function(){
				$("#spinnerKorpus").addClass("invisible");
				},
				error:function(){
				$("#spinnerKorpus").addClass("invisible");
				}
			});
		}
		else
		{
			$("#korpus").empty();
			$("#spinnerKorpus").removeClass("invisible");
			$('#spinnerKorpus').addClass('visible');
			var korpuses =  jQuery.parseJSON(localStorage.getItem('korpuses'));
			for(var i=0;i<korpuses.length;i++)
			{
				$("#korpus")
				.append($("<option></option>")
				.attr("value", $.trim(korpuses[i].id))
				.text(korpuses[i].name));
			}
			var choosen_korpus = localStorage.getItem('choosen_korpus') ? 
			localStorage.getItem('choosen_korpus') :
			korpuses.length!=0 ? $.trim(korpuses[0].id) :'no';

			$("#korpus").val(choosen_korpus);
			load_aud(choosen_korpus);
			$('#spinnerKorpus').addClass('invisible');
		}
	}
	catch(ex)
	{
		$("#schedule").append(ex);
	}
};
export function korpusChanged()
{
	localStorage.setItem('choosen_korpus',$("#korpus").val());
  	load_aud($("#korpus").val());
}

export function load_aud(korpus)
{
	if(!localStorage.getItem('all_aud'))
	{
		$("#aud").empty();
		$('#spinnerKorpus').removeClass('invisible');
      	$('#spinnerKorpus').addClass('visible');
      	jQuery.ajax({
      		url:'http://raspisanie.asu.edu.ru/audience/audience',
      		type:'POST',
      		success : function(data){
      			var result = jQuery.parseJSON(data);
      			localStorage.setItem('all_aud', data);
      			for (var i = 0; i < result.length; i++) 
      			{
					if(result[i].id_build==korpus)
					{
						$("#aud").append($("<option></option").
						attr("value",$.trim(result[i].id)).text(result[i].name));
					}
      			}
				var choosen_aud = localStorage.getItem('choosen_aud')
				? localStorage.getItem('choosen_aud') : $('#aud option').eq(0).val();
				$('#spec').val(choosen_aud);
				localStorage.setItem('choosen_aud',choosen_aud);
      		},
      		complete:function(){
				$('#spinnerKorpus').addClass('invisible');
      		}
      	});
	}
	else{
		$('#spinnerKorpus').removeClass('invisible');
		$('#spinnerKorpus').addClass('visible');
		$("#aud").empty()
		var all_aud = JSON.parse(localStorage.getItem('all_aud'));
		for (var i = 0; i < all_aud.length; i++)
		{
			if(all_aud[i].id_build==korpus)
			{
				$("#aud").append($("<option></option").
				attr("value",$.trim(all_aud[i].id)).text(all_aud[i].name));	
			}
		}
		if ( $("#aud option[value='" + localStorage.getItem('choosen_aud') + "']").length!=0)
		{
			$('#aud').val(localStorage.getItem('choosen_aud'));
		}
		$('#spinnerKorpus').addClass('invisible');
	}
}
export function audChanged()
{
	console.log('aud changed');
	console.log('aud val '+$("#aud").val());
	localStorage.setItem('choosen_aud',$("#aud").val());
}
