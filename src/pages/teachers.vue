<template>
  <q-page>
    <br>
    <div class="text-center">
      <p>ФИО преподавателя</p>
      <input id="birds" class="ui-autocomplete-input txtInput" value="" autocomplete="off" placeholder="Введите ФИО преподавателя"
      role="textbox" aria-autocomplete="list" aria-haspopup="true"/><br/>
      <input type="text" name="teacher" id="log" hidden="true"><br/>
      <q-btn class="button" id="search_teacher" color="secondary" label="Показать"/>
      <div id="schedule"></div>
       <q-inner-loading id="spinnerTeacher" :visible="false">
          <div class="fixed fixed-center text-center">
            <q-spinner-gears class="relative-position" size="50px" style="color:#b30b5fff"></q-spinner-gears>
            <p style="color:red;font-weight: bold;">Подождите,идет загрузка данных</p>
          </div>
          </q-inner-loading>
    </div>
  </q-page>
</template>

<script>
  require ('../css/table.css');
  require('../css/jquery.ui.css');
  import * as teacher from '../js/teachers.js';
  export default
  {
      mounted()
      {
          teacher.load_teacher();
      }
  }
</script>