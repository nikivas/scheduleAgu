//////////////////////////////////////////////////HistoryAPI////////////////////////////////////////////////
import autocomplete  from '../js/jquery.ui.js';
import scrollTo  from '../js/jquery.scroll.js';
import '../js/jquery.scroll.js';
import { LocalStorage} from 'quasar';
import fs from 'fs';
import path from 'path';
var all_schedule;
$('document').ready(function(){
    
});

export function getContentForMobile()
{
    $.get('http://raspisanie.asu.edu.ru/note').done(function(data){
    console.log($(data).find("#divLittle").html());
      $('#divLittle').append($(data).find("#divLittle"));
    });
}

$(document).on('click','.studs',function() { 	//при переходе что отображать!
	transition('stud','note','aud','teach');
});
$(document).on('click','.teachs',function() { 
	transition('teach','stud','aud','note');
});
$(document).on('click','.auds',function() { 
	transition('aud','teach','stud','note');
});
$(document).on('click','.notes',function() { 
	transition('note','teach','aud','stud');
});

function setFocus() { //установка фокуса на группе
	document.getElementById('grup').focus();
}

function setFocusTea() {  //установка фокуса на преподавателе
	document.getElementById('birds').focus();
}

export function load_notes() {
	jQuery.ajax({
		url: 'http://raspisanie.asu.edu.ru/ajax_data/select_notes.php',
		type: 'POST',
		success: function(data) {
			data = jQuery.parseJSON(data);
			$(data).each(function(key, value) {
				var html =	"<p class='note_title'>"+value.title+
							"</p><span class='note_text'><div style='padding: 5px 0 5px 25px;'>"+value.text+
							"</div><div><span class='note_comments'>"+value.location+"</span></div></span>";
							$("#shedule").append(html);
			});
		}
	});
}


////////////////////////////////////////////////АУДИТОРИИ//////////////////////////////////////////////////////////////////////////////////////////

export function load_korpus() { /*загрузка корпусов*/
  $('#spinnerKorpus').addClass('visible');
	jQuery.ajax({
		url: 'http://raspisanie.asu.edu.ru/audience/korpus',
		type: 'POST',
		success: function(data) {
			var json = jQuery.parseJSON(data);
			for (var i = 0; i < json.length; i++) {
				$("#kor")
					.append($("<option></option>")
					.attr("value", json[i].id)
					.attr("id", json[i].abr)
					.text(json[i].name));
			}
			load_auditoriya($('#kor').val());
		},
    complete:function(){$('#spinnerKorpus').addClass('invisible');},
    error:function(){$('#spinnerKorpus').addClass('invisible');$('#shedule').html('Возникла ошибка. Повторите ошибку позже!');}
	});
}
///////////////////////////////////
function load_auditoriya(id_kor) {   /*загрузка аудиторий, по выбранным корпусам*/
  $('#spinnerKorpus').removeClass('invisible');
  $('#spinnerKorpus').addClass('visible');
	jQuery.ajax({
		url: 'http://raspisanie.asu.edu.ru/audience/audience',
		type: 'POST',
		data: {id_kor: id_kor},
		success: function(data) {
			var json = jQuery.parseJSON(data);
			$("#aud").empty();
			for (var i = 0; i < json.length; i++) {
				$("#aud")
					.append($("<option></option>")
					.attr("value", json[i].id)
					.text(json[i].name));
			}
		},
     complete:function(){$('#spinnerKorpus').addClass('invisible');}
	});
}
///////////////////////////////////
$(document).on('change','#kor',function() { /*при изменения корпуса*/	
	load_auditoriya($(this).val());
});
///////////////////////////////////

 $(document).on('click','.weekCheckboxAud',function() { //событие на выбор чекбоксов по группам и запсиь в weekMasAud
	load_grup_or_week_checkbox('weekCheckboxAud','[name = weekMasAud]');
 });  
  
$(document).on('click','#audButton',function() { 	//загрузка расписания по аудиториям
	var idA = $('#aud').val(); 
	var audience1 = $('#kor option:selected').attr('id').replace('/',':').replace(/\s+/g,'-');
	var audience2 = ($('#aud option:selected').text()).replace('/',':').replace(/\s+/g,'-');
	var audience = audience1 + "_" + audience2;
	var typeWeek = $('[name=weekMasAud]').val();
  typeWeek = ((typeWeek=='1') || (typeWeek=='2')) ? "/"+ typeWeek : "";
	ajaxAudience(idA, typeWeek);
	/*var url = '/audience/'+audience+typeWeek;
	if(url != window.location){
		window.history.pushState(null, null, url);
	}*/
	return false;
});

function ajaxAudience(id, typeWeek) {
  $('#spinnerKorpus').removeClass('invisible');
  $('#spinnerKorpus').addClass('visible');
	jQuery.ajax({
		url: 'http://raspisanie.asu.edu.ru/audience/schedule/'+id+typeWeek,
		type: 'POST',
		data: {id: id},
		success: function(data) {
			var json = jQuery.parseJSON(data);
			$('#shedule').empty();
			$('#shedule').append(json);
		},
    complete:function(){ $('#spinnerKorpus').addClass('invisible');jQuery.scrollTo('#shedule',1000);},
    error:function(){ $('#spinnerKorpus').addClass('invisible');$('#shedule').html('Возникла ошибка. Повторите ошибку позже!');}
	});
}
////////////////////////////////////////////////ПРЕПОДАВАТЕЛИ//////////////////////////////////////////////////////////////////////////////////////
export function load_teacher() { //загрузка списка преподавателей
  $('#spinnerTeacher').addClass('invisible');
	$(function() {
		function log( message ) {
			$( "#log" ).empty();
			//$( "<div/>" ).text( message ).prependTo( "#log" );		
			$('[name = teacher]').val(message);
			$( "#log" ).scrollTop( 0 );
		}
		$( "#birds" ).autocomplete({
			source: "http://raspisanie.asu.edu.ru/function/teacher.php",
			minLength: 2,
			select: function( event, ui ) {
				log( ui.item ? ui.item.id : this.value );
			}			
		});
	});
}

$(document).on('click','.weekCheckboxTea',function() {  //событие на выбор чекбоксов по группам и запсиь в weekMasTea
	load_grup_or_week_checkbox('weekCheckboxTea','[name = weekMasTea]');
 });

$(document).on('click','#save',function() { 	//загрузка расписания по преподователям
	var teacher = $('#birds').val();
	var typeWeek = $('[name=weekMasTea]').val();
  typeWeek = ((typeWeek=='1') || (typeWeek=='2')) ? "/"+ typeWeek : "";
	teacher = teacher.replace(/\s+/g,'_');
	var idT = $('#log').val(); 
	ajaxTeacher(teacher, typeWeek, idT);
	var url = '/teacher/'+teacher+typeWeek;
	/*if(url != window.location){
		window.history.pushState(null, null, url);
	}*/
	return false;
});

function ajaxTeacher(teacher, typeWeek, id) {
  $("#spinnerTeacher").removeClass('invisible');
  $("#spinnerTeacher").addClass('visible');
	jQuery.ajax({
		url: 'http://raspisanie.asu.edu.ru/teacher/schedule/'+teacher+typeWeek,
		type: 'POST',
		data: {id: id},
    cache:true,
		success: function(data) {
			var json = jQuery.parseJSON(data);
			$('#schedule').empty();
			$('#schedule').append(json);
		},
    error:function(){$("#schedule").html('Прозошла ошибка. Проверьте,правильность ввода!')}
    ,
    complete:function(){ $("#spinnerTeacher").addClass('invisible');jQuery.scrollTo('#schedule',1000)}
	});
} 
 
export function load_faculty() { /*загрузка факультетов*/
  localStorage.clear();
  $(document).ready(function()
  {
    if(!localStorage.getItem('faculties'))
    {
        jQuery.ajax({
          url: 'http://raspisanie.asu.edu.ru/student/faculty',
          type: 'POST',
          crossDomain:true,
          cache:true,
          beforeSend:function(){  $('#spinnerFaculty').addClass('visible'); $("#message_info").text('Загрузка Факультетов');},
          success: function(data) {
            var json = jQuery.parseJSON(data);
            localStorage.setItem('faculties',data);
            for (var i = 0; i < json.length; i++) {
              $("#facul")
                .append($("<option></option>")
                .attr("value", $.trim(json[i].id))
                .text(json[i].name));
            }
            
            var choosen_faculty = localStorage.getItem('faculty_choosen') ? localStorage.getItem('faculty_choosen')
            : json.length!=0 ? $.trim(json[0].id) :'no' ;
            $("#facul").val(choosen_faculty);
            load_specialty($('#facul').val());
          },
          complete:function(){  /*$('#spinnerFaculty').addClass('invisible');*/},
          error:function(){$('#spinnerFaculty').addClass('invisible');}
        });
    }
    else
    {
        $('#spinnerFaculty').addClass('visible');
        $("#message_info").text('Загрузка Факультетов');
        var fac =  jQuery.parseJSON(localStorage.getItem('faculties'));
        for (var i = 0; i < fac.length; i++)
        {
            $("#facul")
            .append($("<option></option>")
            .attr("value", $.trim(fac[i].id))
            .text(fac[i].name));
        }
        var choosen_faculty = localStorage.getItem('faculty_choosen') ? localStorage.getItem('faculty_choosen') :
        fac.length!=0 ? $.trim(fac[0].id) :'no';
        $("#facul").val(choosen_faculty);
        $('#spinnerFaculty').addClass('invisible');
        load_specialty($('#facul').val());
    }
  });
}

function load_specialty(id_spec) {   //специальностей, по выбранному факультету
  //При первом запуске
  if(!localStorage.getItem('all_specialities'))//Подгружены ли все специальности
  {
      $('#spinnerFaculty').removeClass('invisible');
      $('#spinnerFaculty').addClass('visible');
      $("#message_info").text('Загрузка специальностей');
      jQuery.ajax({
        url: 'http://m.raspisanie.asu.edu.ru/student/specialty',
        type: 'POST',
        cache:true,
        //data: {id_spec: id_spec},
        success: function(data) {
          var json = jQuery.parseJSON(data);
          localStorage.setItem('all_specialities',data);
          localStorage.setItem('choosen_speciality',id_spec);
          $("#spec").empty();
          for (var i = 0; i < json.length; i++) {
            if(json[i].kod_spec==id_spec){
              $("#spec")
              .append($("<option></option>")
              .attr("value", $.trim(json[i].id))
              .text(json[i].name));
            }
          }
          var choosen_speciality_item = localStorage.getItem('choosen_speciality_item')
          ? localStorage.getItem('choosen_speciality_item') : $('#spec option').eq(0).val();
          $('#spec').val(choosen_speciality_item);
          localStorage.setItem('choosen_speciality_item',choosen_speciality_item);
          preloaded_kurses();
          load_grup($('input[name="kurs"]:checked').val());
        },
        complete:function(){/* $('#spinnerFaculty').addClass('invisible');*/},
        error:function(){/*$('#spinnerFaculty').addClass('invisible');$('#schedule').html('Возникла ошибка. Повторите попытку позже!');*/}
      });
  }
  else
  {
      $('#spinnerFaculty').removeClass('invisible');
      $('#spinnerFaculty').addClass('visible');
      $("#message_info").text('Загрузка специальностей');
      preloaded_kurses();
      var all_specialities = jQuery.parseJSON(localStorage.getItem('all_specialities'));
      localStorage.setItem('choosen_speciality',id_spec);
      $("#spec").empty();
      for (var i = 0; i < all_specialities.length; i++) {
        if(all_specialities[i].kod_spec==id_spec){
          $("#spec")
          .append($("<option></option>")
          .attr("value", $.trim(all_specialities[i].id))
          .text(all_specialities[i].name));
        }
      }
      if ( $("#spec option[value='" + localStorage.getItem('choosen_speciality_item') + "']").length!=0)
      {
        $('#spec').val(localStorage.getItem('choosen_speciality_item'));
      }
      $('#spinnerFaculty').addClaclearss('invisible');
     load_grup($('input[name="kurs"]:checked').val());
  }
}
export function preloaded_kurses()
{
  $('#kurs').empty();
  var str = "";
  for (var i = 1; i < 7; i++) {
    str += "<input class='kursCheckbox' type='radio' name='kurs' value='"+i+"'>"
    +i+"&nbsp;&nbsp;&nbsp;" ;
  }
  $("#kurs").append(str);
  $("input:radio[name='kurs'][value='"+localStorage.getItem('choosen_kurs')+"']").prop('checked', true);
}


$(document).on('change','#facul',function() {  //событие на изменение факультета
  localStorage.setItem('faculty_choosen',$("#facul").val());
	load_specialty($(this).val());
});

$(document).on('change','#spec',function() {  //событие на изменение специальности
  localStorage.setItem('choosen_speciality_item',$(this).val());
  load_grup($('input[name="kurs"]:checked').val());
	//empty_grup();
});

function empty_grup() { //очищение выбранной группы
	$("#trGrup").remove();
	$('#grupStudent').val('');
}

$(document).on('click','.kursCheckbox',function() { //событие на выбор чекбоксов по курсам, (поиск по факультету и специальности), запись группы в grupMas
	$('#grupStudent').val('');
  localStorage.setItem('choosen_kurs',$('input[name="kurs"]:checked').val());
	load_grup($('input[name="kurs"]:checked').val());
});

function load_grup(kurs) { //загрузка группы, по умолчанию hidden, если грпп несколько, то видны для пользователя
  $('#spinnerFaculty').removeClass('invisible');
  $('#spinnerFaculty').addClass('visible');
  $("#message_info").text('Загрузка курсов');
  if(!localStorage.getItem('all_groupies'))
  {
    var val_spec = $("#spec").val();
    jQuery.ajax({
      url: 'http://raspisanie.asu.edu.ru/student/grup',
      type: 'POST',
      success: function(data) {
        var json = jQuery.parseJSON(data);
        localStorage.setItem('all_groupies',data);
        $('#grupStudent').empty();
        $('#spinnerFaculty').addClass('invisible');
      }
      ,
      error:function(){$("#spinnerFaculty").addclass('invisible');}
    });
  }
  else{
  
      var grupie = jQuery.parseJSON(localStorage.getItem('all_groupies'));
      //console.log(grupie);
      var str_grup="";
      var spliter;
      var spec =  $('#spec').val() ? $('#spec').val() :'';
      spliter = spec.split('?');
      $("#groups").empty();
      for(var i=0;i<grupie.length;i++)
      {
        if(grupie[i].KURS == kurs && grupie[i].SHIFR_SPEC_NEW == spliter[0])
        {
           str_grup += grupie[i].GRUP+":";
           /*$("#groups").append("<input type='checkbox' class='grupCheckbox' />"
                               + grupie[i].GRUP);*/
        }
      }
      str_grup = str_grup.substring(0, str_grup.length - 1);
      $('#grupStudent').empty();
      $('#grupStudent').val(str_grup);
      $('#spinnerFaculty').addClass('invisible');
  }
}

$(document).on('click','.grupCheckbox',function() { //событие на выбор чекбоксов по группам и запсиь в grupMas
	load_grup_or_week_checkbox('grupCheckbox','#grupStudent');
});

 $(document).on('click','.weekCheckbox',function(event) { //событие на выбор чекбоксов по группам и запсиь в weekMas
	load_grup_or_week_checkbox('weekCheckbox','[name = weekMas]');//[name = weekMas1]
 });
 
 $(document).on('click','.weekCheckbox1',function() { //событие на выбор чекбоксов по группам и запсиь в weekMas
	load_grup_or_week_checkbox('weekCheckbox1','[name = weekMas1]');
 });
 
function load_grup_or_week_checkbox(classCheckbox, name) { // запись в weekMas или grupMas выбранных недель, либо групп
  var str_chec='';
	var str_Nochec='';
	var str='';
	var flag=0;
	$('.'+classCheckbox).each(function(i,val){
		if ($("."+classCheckbox)[i].checked) {
			str_chec +=$(val).val()+':';
			flag=1;
		}
		else
    {
      str_Nochec +=$(val).val()+':';
    }
	});
  str = (flag==0) ? str_Nochec : str_chec;
	var kurs_mas = str.substring(0, str.length - 1);
  $(name).val(kurs_mas);
}

/*показ расписание общее, и отдельно по расписанию, блочное расписание*/
$(document).on('click','.block_first',function() {
	var str = $(this).attr('id');
	str = str.substring(str.lastIndexOf("_")+1, str.length);
	visibility_block('block_first_'+str,'block_second_'+str,'full_schedule_'+str);
	visibility_date('oneDate','twoDate');
	$('#date_learning').addClass('hide_schedule');
});
$(document).on('click','.block_second',function() {
	var str = $(this).attr('id');
	var str = str.substring(str.lastIndexOf("_")+1, str.length);
	visibility_block('block_second_'+str,'block_first_'+str,'full_schedule_'+str);
	visibility_date('twoDate','oneDate');
	$('#date_learning').addClass('hide_schedule');
});
$(document).on('click','.full_schedule',function() {
	var str = $(this).attr('id');
	var str = str.substring(str.lastIndexOf("_")+1, str.length);
	visibility_block('full_schedule_'+str,'block_first_'+str,'block_second_'+str);
	visibility_date('','oneDate');
	visibility_date('','twoDate');
	$('#date_learning').removeClass('hide_schedule');
});
	
function visibility_date(oneDate, twoDate) {
	$("#"+twoDate).removeClass('view_schedule');
	$("#"+oneDate).removeClass('hide_schedule');
	$("#"+oneDate).addClass('view_schedule');
	$("#"+twoDate).addClass('hide_schedule');
}	
	
export function visibility_block(oneBlock, twoBlock, threeBlock) {
  console.log(oneBlock+" "+twoBlock+" "+threeBlock);
	$("#"+oneBlock).css('color','black');
	$("#"+twoBlock).css('color','#919397');
	$("#"+threeBlock).css('color','#919397');
	$("#"+oneBlock+'_div').removeClass('hide_schedule');
	$("#"+twoBlock+'_div').removeClass('view_schedule');
	$("#"+threeBlock+'_div').removeClass('view_schedule');
	$("#"+oneBlock+'_div').addClass('view_schedule');
	$("#"+twoBlock+'_div').addClass('hide_schedule');
	$("#"+threeBlock+'_div').addClass('hide_schedule');
}	

$(document).on('click','#studentButton1',function() 
{
  console.log('зашли');
  ajaxStudent();
  return false;
});

function ajaxStudent()
{
  try
  {
    var grupmas = $("#grupStudent").val();
    $("#schedule").empty();
    if(grupmas!='')
    {
      var connection_state = navigator.connection.type;
      if(connection_state!=Connection.NONE)
      {
          console.log('коннект');
          $("#message_info").text('Загрузка расписания');
          $("#spinnerFaculty").removeClass("invisible");
          $("#spinnerFaculty").addClass("visible");
          var grup_separator = grupmas.split(':');
          for (var i = 0; i <grup_separator.length ; i++) 
          {
              var result;
              jQuery.ajax({
                  url:'http://raspisanie.asu.edu.ru/student/schedule/'+grup_separator[i],
                  type:'POST',
                  success: function(data){
                  result = jQuery.parseJSON(data);
                  $("#schedule").append(result);
                  localStorage.setItem(grup_separator[i],result);
                  },
                  error:function(data) {
                  $("#schedule").append(localStorage.getItem(grup_separator[i]));
                  }
              });
          }
          $("#spinnerFaculty").addClass("invisible");
      }
      else
      {
          console.log('disconnect');
          var grup_separator = grupmas.split(':');
          for(var i=0;i<grup_separator.length;i++)
          {
              var result = localStorage.getItem(grup_separator[i]);
              if(result!=null)
              {
                 $("#schedule").append(result);
              }
          }
      }
    }
    else
    {
      $("#schedule").empty();
      $("#schedule").append('<p>Расписание курсов отсутствует</p>');
    }
    jQuery.scrollTo('#schedule',1000);
  }
  catch(ex){
    $('#spinnerFaculty').addClass('invisible');
    $("#schedule").html('Возникла непредвиденная ошибка. Обратитесь к администратору');
  }
}
