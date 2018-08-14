//////////////////////////////////////////////////HistoryAPI////////////////////////////////////////////////
import autocomplete  from '../js/jquery.ui.js';
import scrollTo  from '../js/jquery.scroll.js';
import '../js/jquery.scroll.js';

 $(document).ready(function(){
   $("#grup").val(localStorage.getItem('grup_name'));
 });
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
    str += "<input class='kursCheckbox form-radio'  type='radio' name='kurs' value='"+i+"'>"
    +i+"&nbsp;&nbsp;&nbsp;" ;
    if(i%3==0 && $(document).width()<=400){str+="<br/>";}
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
});


$(document).on('click','.kursCheckbox',function() { 
    if($(this).attr('value')!=localStorage.getItem('choosen_kurs'))
    {
        localStorage.setItem('choosen_kurs',$('input[name="kurs"]:checked').val());
        localStorage.removeItem('choosen_groups');
        load_grup($('input[name="kurs"]:checked').val());
    }
});
$(document).on('click','.grupCheckbox',function(){
    var choosen_groups = localStorage.getItem('choosen_groups')!=null ?
     jQuery.parseJSON(localStorage.getItem('choosen_groups')) : [];
     if($(this).prop('checked'))
     {
        choosen_groups.push($(this).attr('value'));
        localStorage.setItem('choosen_groups',JSON.stringify(choosen_groups));
     }
     else
     {
        var index = choosen_groups.indexOf($(this).attr('value'));
        choosen_groups.splice(index,1);
        localStorage.setItem('choosen_groups',JSON.stringify(choosen_groups));
     }
    
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
      for(var i=0;i<grupie.length;i++)
      {
        if(grupie[i].KURS == kurs && grupie[i].SHIFR_SPEC_NEW == spliter[0])
        {
          var appended_result ;
          if(choosen_groups.includes(grupie[i].GRUP)==true)
          {
            appended_result = "<input type='checkbox' value='"+grupie[i].GRUP+ 
            "' name='grupovuha' checked class='grupCheckbox form-radio' />"
                               + grupie[i].GRUP;
          }
          else
          {
              appended_result = "<input type='checkbox' value='"+grupie[i].GRUP+ 
            "' name='grupovuha' class='grupCheckbox form-radio' />"
                               + grupie[i].GRUP;
          }
          $("#groups").append(appended_result);
          count_added++;
          if(count_added%3==0){$("#groups").append("<br>");}
        }
      }
      $('#spinnerFaculty').addClass('invisible');
  }
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
  ajaxStudent();
  return false;
});

function ajaxStudent()
{
  try
  {
    $("#studentButton1").prop("disabled",true);
    $("#message_info").text('Загрузка расписания');
    $("#spinnerFaculty").removeClass("invisible");
    $("#spinnerFaculty").addClass("visible");
    $("#schedule").empty();
    var grupovuha = $("input[name='grupovuha']");
    var checked_grupovuha =  $("input[name='grupovuha']:checked");
    if(grupovuha.length!=0)
    {
      var connection_state = navigator.connection.type;
      if(connection_state!=Connection.NONE)
      {
          if(checked_grupovuha.length!=0)
          {
              checked_grupovuha.each(function(index,element)
              {
                var key = this.value;
                jQuery.ajax({
                    url:'http://raspisanie.asu.edu.ru/student/schedule/'+key,
                    type:'POST',
                    crossDomain:true,
                    async:true,
                    success: function(data){
                        var result = jQuery.parseJSON(data);
                        $("#schedule").append(result);
                        localStorage.setItem(key,result);
                    },
                    complete:function(){ 
                      if(index==checked_grupovuha.length-1)
                      {
                        jQuery.scrollTo("#schedule",1000);
                        $("#studentButton1").prop('disabled',false);
                        $("#spinnerFaculty").addClass("invisible");
                      }
                 
                    },
                    error:function(data) 
                    {
                      var result = localStorage.getItem(key);
                      if(result!=null)
                      {
                        $("#schedule").append(result);
                      }
                    }
                });
              });
          }
          else
          {
              grupovuha.each(function(index,val){
                  var key = val.value;
                  jQuery.ajax({
                      url:'http://raspisanie.asu.edu.ru/student/schedule/'+key,
                      type:'POST',
                      crossDomain:true,
                      async:true,
                      success:function(data){
                        var result = jQuery.parseJSON(data);
                        $("#schedule").append(result);
                        localStorage.setItem(key,result);
                      },
                      complete:function(){
                        if(index==grupovuha.length-1)
                        {
                          $("#studentButton1").prop('disabled',false);
                          $("#spinnerFaculty").addClass("invisible");
                          jQuery.scrollTo("#schedule",1000);
                        }
                      },
                      error:function()
                      {
                         var result = localStorage.getItem(key);
                         if(result!=null){$("#schedule").append(result);}
                      }
                  });
              });
          }
      }
      else
      {
          if(checked_grupovuha.length!=0)
          {
              checked_grupovuha.each(function () {
                var key = this.value;
                var result = localStorage.getItem(key);
                if(result!=null){$("#schedule").append(result);}
                else{$("#schedule").append("<p>Соединение с интернетом отсутсвует."+ 
                  "Локально расписание не сохраненно</p>");}
              });
          }
          else
          {
              grupovuha.each(function (key,val) {
              var key = val.value;
              var result = localStorage.getItem(key);
              if(result!=null){$("#schedule").append(result);}
               else{$("#schedule").append("<p>Локально расписание не сохраненно</p>");}

            });
          }
          $("#studentButton1").prop('disabled',false);
          $("#spinnerFaculty").addClass("invisible");
          jQuery.scrollTo("#schedule",1000);
      }
    }
    else
    {
      $("#schedule").append("<p>Расписание отсутсвует</p>");
      $("#studentButton1").prop('disabled',false);
      $("#spinnerFaculty").addClass("invisible");
      jQuery.scrollTo("#schedule",1000);

    }
  }
  catch(ex){
    $('#spinnerFaculty').addClass('invisible');
    $("#schedule").html(ex);
    $("#studentButton1").prop('disabled','false');
  }
}
$(document).on('click','#studentButton2',function(){
    $("#schedule2").empty();
    var groupName = $("#grup").val();
    groupName=groupName.replace('-','');
    groupName=groupName.trim();
    groupName=groupName.toUpperCase();
    if(groupName!='')
    {
      findScheduleByGroupName(groupName);
    }
    return true;
});
function findScheduleByGroupName (groupName)
{
    try
    {
        var group = groupName;
        localStorage.setItem('grup_name',groupName);
        $("#studentButton2").prop('disabled',true);
        $("#spinnerFaculty").removeClass("invisible");
        $("#spinnerFaculty").addClass("visible");
        $("#message_info").text('Поиск расписания');
        if(navigator.connection.type!=Connection.NONE)
        {
            jQuery.ajax({
              url:'http://raspisanie.asu.edu.ru/student/schedule/'+group,
              type:'POST',
              success:function(data)
              {
                var result = jQuery.parseJSON(data);
                if(!result.includes('Группа введена неверно'))
                {
                  localStorage.setItem(group,result);
                }
                $("#schedule2").append(result);
              },
              complete:function(){
                  $("#spinnerFaculty").addClass("invisible");
                  jQuery.scrollTo("#schedule2",1000);
                  $("#studentButton2").prop('disabled',false);
              },
              error:function(){
                  var result = localStorage.getItem(group);
                  if(result!=null){$("#schedule2").append(result);}
                  else
                  {
                    $("#schedule2").append('Расписание не найдено. Отсутствует запись в кэше.');
                  }
                  $("#studentButton2").prop('disabled',false);
              }
            });
        }
        else
        {
            var selected_schedule = localStorage.getItem(group);
            if(selected_schedule!=null)
            {
                $("#schedule2").append(selected_schedule);
            }
            else
            {
                $("#schedule2").append('Отсутствует Соединение с сервером. Отсутствует запись в кэше.');
            }
            $("#spinnerFaculty").addClass("invisible");
            jQuery.scrollTo("#schedule2",1000);
            $("#studentButton2").prop('disabled',false);
        }
    }
    catch(ex)
    {
        $("#schedule2").append(ex);
    }
}