//////////////////////////////////////////////////HistoryAPI////////////////////////////////////////////////
import autocomplete  from '../js/jquery.ui.js';
import scrollTo  from '../js/jquery.scroll.js';
import '../js/jquery.scroll.js';
export function load_audiences()
{
	$(document).ready(function(){
		try
		{
			$("#spinnerKorpus").removeClass("invisible");
			$("#spinnerKorpus").addClass("visible");
			if(!localStorage.getItem('korpuses'))
			{
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
					},
					complete:function(){
						$("#spinnerKorpus").addClass("invisible");
					}
				});
			}
			else
			{
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
				var choosen_korpus = localStorage.getItem('choosen_korpus') ? localStorage.getItem('choosen_korpus') :
				korpuses.length!=0 ? $.trim(korpuses[0].id) :'no';
				$("#korpus").val(choosen_korpus);
				$('#spinnerKorpus').addClass('invisible');
			}
		}
		catch(ex)
		{

		}
	});

}
$(document).on('change','#korpus',function() { 
  	localStorage.setItem('choosen_korpus',$("#korpus").val());
});