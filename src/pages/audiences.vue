<template>
  <q-page>
    <br>
    <div class="text-center">
      <span>Корпус</span><br>
      <select class="select-style" id="kor" name="housing"></select><br/><br/>
      <span>Аудитория</span>
      <select class="select-style" id="aud" name="audience"></select><br /><br/>
      <p>Неделя :</p>
      Числитель<input class="weekCheckboxAud" type="checkbox" name="numerator" value="1">
      Знаменатель<input class="weekCheckboxAud" type="checkbox" name="denominator" value="2"><br /><br/>
      <input type="text" name="weekMasAud" hidden>
      <q-btn color="primary" id="audButton" label="Показать" />
      <div id="shedule"></div>
      </div>
      <q-inner-loading id="spinnerKorpus" :visible="true">
         <div class="fixed fixed-center text-center">
            <q-spinner-gears class="relative-position" size="50px" style="color:#b30b5fff"></q-spinner-gears>
            <p style="color:red;font-weight: bold;">Подождите,идет загрузка данных</p>
         </div>
      </q-inner-loading>
  </q-page>
</template>

<script>
    //import * as module from'../js/loadData.js'
    require ('../css/table.css')
    export default{
      mounted()
      {
         //module.load_korpus()
      }
    }
</script>