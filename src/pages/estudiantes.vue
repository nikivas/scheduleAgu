<template>
    <q-page expand position="top">
      <q-tabs v-model="tabsModel" align="center" color="blue-grey-14">
        <q-tab name="xtab-1" keep-alive class="fa fa-university" slot="title" label="Факультеты и направления"/>
        <q-tab name="xtab-2" keep-alive class="fa fa-users" slot="title" label="Поиск по группе"/>
        <!--Блок поиск по факультетам-->
        <q-tab-pane class="text-center" name="xtab-1" keep-alive>
          <span>Факультет</span><br/>
          <select class="select-style animated zoomIn"  v-on:change="faculChanged" id = "facul" name="Faculty"></select><br/><br/>
          <span>Специальность</span><br/>
          <select class="select-style animated zoomIn" id = "spec"
           v-on:change="specChanged($event)" name="specaility"></select><br/><br/>
          <span>Курс : </span>
          <div id="kurs" class="animated flash">
          </div><br/>
          <span>Группы</span><br>
            <div id="groups"></div>
          </p>
          <br/>
          <q-btn class="studentButton" v-on:click="ajaxStudent"  id="studentButton1"
           color="deep-orange-10"  label="Показать"/><br/><br/>
          <div id="schedule">
          </div>
        </q-tab-pane>
        <!-- Поиск по факультетам - конец-->
        
        <!-- Блок поиск по группам -->
        <q-tab-pane class="text-center" name="xtab-2" keep-alive>
            <span>Группа :</span><br/>
           <input type="text" name="grupa" class="txtInput animated pulse"  id="grup" v-model="cocksucker" placeholder="Например рт31" /><br/><br/>
           <q-btn color="amber" v-on:click="findByGroupNameClicked" class="text-black studentButton" label="Узнать" 
           id="studentButton2"/><br/><br/>
           <div id="schedule2" keep-alive>
             <div v-for="mamka_admina in mamkin"><div v-html="mamka_admina"></div></div>
           </div>
        </q-tab-pane>
        <!-- Конец-->
      </q-tabs>
      <q-inner-loading id="spinnerFaculty" :visible="true">
        <div class="fixed fixed-center text-center">
          <q-spinner-gears class="relative-position" size="50px"  color="red" ></q-spinner-gears>
          <p id="message_info" class="text-black" style="font-weight: bold;">Подождите,идет загрузка данных</p>
      </div>
      </q-inner-loading>
    </q-page>

</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
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
      this.$store.dispatch('estudiantes/load_faculty');
      this.load_schedule_choosen_kurs();
      this.load_schedule_byGroupName();
  },
  methods:
  {
    load_schedule_choosen_kurs()
    {
      //append previous selection
      if(localStorage.getItem("choosen_groups"))
      {
         $("#schedule").empty();
        $("#spinnerFaculty").removeClass("invisible");
        $("#spinnerFaculty").addClass("visible");
         var choosen_groups = JSON.parse(localStorage.getItem("choosen_groups"));
         $.each(choosen_groups, function(index,value){
            var schedule = localStorage.getItem(value);
            if(schedule!=null)
            {
              $("#schedule").append(schedule);
            }
         });
          $("#spinnerFaculty").addClass("invisible");
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
    ...mapActions({
        faculChanged: 'estudiantes/faculChanged',
        specChanged : 'estudiantes/specChanged',
        kursCheckboxClicked:"estudiantes/kursCheckboxClicked",
    }),
    ...mapMutations(
    {
        ajaxStudent:'estudiantes/ajaxStudent',
        findByGroupNameClicked : 'estudiantes/findByGroupNameClicked'
    }),
  },
}
</script>




