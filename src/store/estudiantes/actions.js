//////////////////////////////////////////////////HistoryAPI////////////////////////////////////////////////
import autocomplete  from '../../js/jquery.ui.js';
import scrollTo  from '../../js/jquery.scroll.js';

export function current_group()
{
  var grupa = localStorage.getItem('grup_name');
   $("#grup").val(grupa);  
}
export function load_faculty() { /*загрузка факультетов*/
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
          error:function()
          {

            $('#spinnerFaculty').addClass('invisible');
          }
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

export function load_specialty(id_spec) {   //специальностей, по выбранному факультету
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
      $('#spinnerFaculty').addClass('invisible');
     load_grup($('input[name="kurs"]:checked').val());
  }
}

export function preloaded_kurses()
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
  $("input:radio[name='kurs'][value='"+localStorage.getItem('choosen_kurs')+"']").prop('checked', true);
  $(".kursCheckbox").on('click',function(event){
    var new_value = $(this).attr("value");
    kursCheckboxClicked(new_value);
  });
}

export function faculChanged()
{
	localStorage.setItem('faculty_choosen',$("#facul").val());
	load_specialty($("#facul").val());
}
export function specChanged(){
  localStorage.setItem('choosen_speciality_item',$("#spec").val());
  load_grup($('input[name="kurs"]:checked').val());
  localStorage.removeItem('choosen_groups');
}
export function kursCheckboxClicked(new_value)
{
    if(new_value!=localStorage.getItem('choosen_kurs'))
    {
        localStorage.setItem('choosen_kurs',$('input[name="kurs"]:checked').val());
        localStorage.removeItem('choosen_groups');
        load_grup($('input[name="kurs"]:checked').val());
    }
}
export function grupChecked(_object)
{
    var choosen_groups = localStorage.getItem('choosen_groups')!=null ?
    jQuery.parseJSON(localStorage.getItem('choosen_groups')) : [];
    if(_object.prop('checked'))
    {
      choosen_groups.push(_object.attr('value'));
      localStorage.setItem('choosen_groups',JSON.stringify(choosen_groups));
    }
    else
    {
      var index = choosen_groups.indexOf(_object.attr('value'));
      choosen_groups.splice(index,1);
      localStorage.setItem('choosen_groups',JSON.stringify(choosen_groups));
    }
}
export function load_grup(kurs) { //загрузка группы, по умолчанию hidden, если грпп несколько, то видны для пользователя
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
        localStorage.setItem('all_groupies',data);
        $('#spinnerFaculty').addClass('invisible');
      }
      ,
      error:function(){$("#spinnerFaculty").addclass('invisible');}
    });
  }
  else{
  
      var grupie = jQuery.parseJSON(localStorage.getItem('all_groupies'));
      var spliter;
      var spec =  $('#spec').val() ? $('#spec').val() :'';
      spliter = spec.split('?');
      $("#groups").empty();
      var count_added=0;
      var choosen_groups = localStorage.getItem('choosen_groups')!=null?
      jQuery.parseJSON(localStorage.getItem('choosen_groups')) : [];
      var filtered_groups = grupie.filter(function(item){
        return item.KURS==kurs && item.SHIFR_SPEC_NEW == spliter[0]
      });
      for(var i=0;i<filtered_groups.length;i++)
      {
        var appended_result ;
        if(choosen_groups.includes(filtered_groups[i].GRUP)==true)
        {
          appended_result = "<input type='checkbox' value='"+filtered_groups[i].GRUP+ 
          "' name='grupovuha' checked class='grupCheckbox form-radio animated bounceIn' />"
                             + filtered_groups[i].GRUP;
        }
        else
        {
            appended_result = "<input type='checkbox' value='"+filtered_groups[i].GRUP+ 
          "' name='grupovuha' class='grupCheckbox form-radio animated bounceIn' />"
                             + filtered_groups[i].GRUP;
        }
        $("#groups").append(appended_result);
        count_added++;
        if(count_added%3==0){$("#groups").append("<br>");}
      }
      $('#spinnerFaculty').addClass('invisible');
      if(filtered_groups.length==0)
      {
        setTimeout(function()
        {
          $("#studentButton1").addClass("animated fadeOut");
        },
        500);
        $("#studentButton1").addClass("hidden");
      }
      else
      {
         $("#studentButton1").removeClass("animated fadeOut");
        $("#studentButton1").removeClass("hidden");
          setTimeout(function()
            {

              $("#studentButton1").addClass("animated bounceIn");
            },
          100);
      }
      $(".grupCheckbox").on('click',function(){
          var _object = $(this);
          grupChecked(_object);
      });
  }
}
 

/*показ расписание общее, и отдельно по расписанию, блочное расписание*/
$(".block_first").on('click','.block_first',function() {
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
