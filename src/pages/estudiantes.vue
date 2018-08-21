<template>
    <q-page expand position="top">
      <q-tabs v-model="tabsModel" align="center" color="dark">
        <q-tab name="xtab-1" class="fa fa-university" slot="title" label="Факультеты и направления"/>
        <q-tab name="xtab-2" class="fa fa-users" slot="title" label="Поиск по группе"/>
        <!--Блок поиск по факультетам-->
        <q-tab-pane class="text-center" name="xtab-1" keep-alive>
          <span>Факультет</span><br/>
          <select class="select-style animated fadeInLeft" v-on:change="changedFacul($event)" id = "facul" name="Faculty"></select><br/><br/>
          <span>Специальность</span><br/>
          <select class="select-style animated fadeInRight" v-on:change="specChanged($event)" id = "spec" name="specaility"></select><br/><br/>
          <span>Курс : </span>
          <div id="kurs" class="animated pulse">
          </div><br/>
          <p>Группы</p>
            <div id="groups"></div>
          </p>
          <br/>
          <q-btn class="studentButton"  id="studentButton1" color="positive"  label="Показать"/><br/><br/>
          <div id="schedule">
          </div>
        </q-tab-pane>
        <!-- Поиск по факультетам - конец-->
        
        <!-- Блок поиск по группам -->
        <q-tab-pane class="text-center" name="xtab-2" keep-alive>
            <span>Группа :</span><br/>
           <input type="text" name="grupa" class="txtInput animated pulse"  id="grup" v-model="cocksucker" placeholder="Например рт31" /><br/><br/>
           <q-btn color="amber" class="text-black studentButton" label="Узнать" 
           id="studentButton2"/><br/><br/>
           <div id="schedule2" keep-alive>
             <div v-for="mamka_admina in mamkin"><div v-html="mamka_admina"></div></div>
           </div>
        </q-tab-pane>
        <!-- Конец-->
      </q-tabs>
      <q-inner-loading id="spinnerFaculty":visible="true">
        <div class="fixed fixed-center text-center">
          <q-spinner-gears class="relative-position" size="50px"  color="red" ></q-spinner-gears>
          <p id="message_info" class="text-black" style="font-weight: bold;">Подождите,идет загрузка данных</p>
      </div>
      </q-inner-loading>
    </q-page>

</template>

<script>

export default
{
  data () {
    return {
      tabsModel: 'xtab-1',
      tabsOptions: [
        {label: 'Факультеты и направления', value: 'xtab-1'},
        {label: 'Поиск по группе', value: 'xtab-2'},
      ],
      loading:false,
      checked:false,
      cocksucker:localStorage.getItem("grup_name"),
      mamkin:[]
    }
  },
  mounted()
  {
      this.load_schedule_choosen_kurs();
      this.load_schedule_byGroupName();
      this.load_faculty();
      this.clickedKurs();
  },
  created()
  {

  },
  methods:
  {
    changedFacul(event)
    {
      console.log(event.target.value);
      localStorage.setItem('faculty_choosen',event.target.value);
      this.load_specialty(event.target.value);
      localStorage.removeItem('choosen_groups');
    },
    specChanged()
    {
      localStorage.setItem('choosen_speciality_item',event.target.value);
      this.load_grup($('input[name="kurs"]:checked').val());
      localStorage.removeItem('choosen_groups');
    },
    clickedKurs()
    {
      $(".kursCheckbox").on('click',function(event){
        console.log('oxxxy takoy sasnyi');
        if(event.target.value!=localStorage.getItem('choosen_kurs'))
        {
          localStorage.setItem('choosen_kurs',$('input[name="kurs"]:checked').val());
          localStorage.removeItem('choosen_groups');
          load_grup($('input[name="kurs"]:checked').val());
        }
      });
    },
    load_schedule_choosen_kurs()
    {
      //append previous selection
      if(localStorage.getItem("choosen_groups"))
      {
         $("#schedule").empty();
         var choosen_groups = JSON.parse(localStorage.getItem("choosen_groups"));
         $.each(choosen_groups, function(index,value){
            var schedule = localStorage.getItem(value);
            if(schedule!=null)
            {
              $("#schedule").append(schedule);
            }
         });
      }
    },
    load_schedule_byGroupName()
    {
      if(localStorage.getItem('grup_name'))
      {
          var group = localStorage.getItem('grup_name');
          var get_schedule = localStorage.getItem(group);
          if(get_schedule!=null)
          {
              this.mamkin.push(get_schedule)
          }
      }
    },
    load_faculty()
    {
      if(!localStorage.getItem('faculties'))
      {      
        jQuery.ajax({
          url: 'http://raspisanie.asu.edu.ru/student/faculty',
          type: 'POST',
          crossDomain:true,
          cache:true,
          beforeSend:function(){  $('#spinnerFaculty').addClass('visible'); $("#message_info").text('Загрузка Факультетов');},
          success: function(data) 
          {
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
            this.load_specialty($('#facul').val());
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
        this.load_specialty($('#facul').val());
      }
    },
     load_specialty(id_spec)
     {
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
            this.preloaded_kurses();
            this.load_grup($('input[name="kurs"]:checked').val());
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
            this.preloaded_kurses();
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
            this.load_grup($('input[name="kurs"]:checked').val());
        }
     },
     preloaded_kurses()
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
        $("input:radio[name='kurs'][value='"+localStorage.getItem('choosen_kurs')+"']")
        .prop('checked', true);
     },
     load_grup(kurs)
     {  
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
        else
        {
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
          "' name='grupovuha' checked class='grupCheckbox form-radio animated bounceIn' />"
           + grupie[i].GRUP;
          }
          else
          {
          appended_result = "<input type='checkbox' value='"+grupie[i].GRUP+ 
          "' name='grupovuha' class='grupCheckbox form-radio animated bounceIn' />"
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
  },
  destroyed()
  {
   
  }
}
</script>




