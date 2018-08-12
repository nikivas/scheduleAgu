<template>
    <q-page expand position="top">
      <q-tabs v-model="tabsModel" align="center" color="dark">
        <q-tab name="xtab-1" class="fa fa-university" slot="title" label="Факультеты и направления"/>
        <q-tab name="xtab-2" class="fa fa-users" slot="title" label="Поиск по группе" :hidden='true'/>
        <!--Блок поиск по факультетам-->
        <q-tab-pane class="text-center" name="xtab-1" keep-alive>
          <span>Факультет</span><br/>
          <select class="select-style" id = "facul" name="Faculty"></select><br/><br/>
          <span>Специальность</span><br/>
          <select class="select-style" id = "spec" name="specaility"></select><br/><br/>
          <span>Курс : </span>
          <div id="kurs">
            
          </div><br/><br/>
          <p>Группы
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
           <input class="txtInput" id="grup" placeholder="Например рт31" /><br/>
            <p>Неделя :</p>
            Числитель<input class="weekCheckbox1" type="checkbox" name="numerator" value="1">
            Знаменатель<input class="weekCheckbox1" type="checkbox" name="denominator" value="2"><br/><br/>
           <q-btn color="amber" class="text-black studentButton" label="Узнать" id="studentButton2"/><br/><br/>
           <input type="text" name="weekMas1" hidden>
           <div id="schedule2"></div>
        </q-tab-pane>
        <!-- Конец-->
      </q-tabs>
      <q-inner-loading id="spinnerFaculty":visible="true">
        <div class="fixed fixed-center text-center">
          <q-spinner-gears class="relative-position" size="50px"  color="red" ></q-spinner-gears>
          <p id="message_info" style="color:black;font-weight: bold;">Подождите,идет загрузка данных</p>
      </div>
      </q-inner-loading>
    </q-page>

</template>

<script>
import * as module from'../js/loadData.js'
require ('../css/table.css')
export default
{
  data () {
    return {
      tabsModel: 'xtab-1',
      tabsOptions: [
        {label: 'Факультеты и направления', value: 'xtab-1'},
        {label: 'Поиск по группе', value: 'xtab-2'},
      ],
      module,
      loading:false
    }
  },
  mounted()
  {
      module.load_faculty()
  },
  created()
  {
     module.load_faculty()
  }
}
</script>


