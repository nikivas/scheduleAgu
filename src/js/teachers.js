  import * as jq from '../../node_modules/jquery/dist/jquery.min.js';
  import * as ui from '../js/jquery.ui.js';

  export function load_teacher() 
  { //загрузка списка преподавателей
	$(function() {
		function log( message ) {
			$( "#log" ).empty();	
			$('[name = teacher]').val(message);
		}
		$( "#birds" ).autocomplete({
			source: "http://raspisanie.asu.edu.ru/function/teacher.php",
			minLength: 2,
			select: function( event, ui ) 
			{
				log( ui.item ? ui.item.id : this.value );
			}			
		});
	});
}