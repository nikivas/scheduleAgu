  import * as jq from '../../node_modules/jquery/dist/jquery.min.js';
  import * as ui from '../js/jquery.ui.js';

  export function load_teacher() 
  { //загрузка списка преподавателей
	$(function() {
		function log( message ) {
			$( "#log" ).empty();	
			$('[name = teacher]').val(message);
		}
		var birds =[{"id":'huisos',"value":"sucker"}];
		console.log(birds);
		$( "#birds" ).autocomplete({
			source: birds,
			minLength: 2,
			select: function( event, ui ) 
			{
				log( ui.item ? ui.item.id : this.value );
			}			
		});
	});
}