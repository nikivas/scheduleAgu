<template>
  <q-page>
    <br>
    <div class="text-center">
      <p>ФИО преподавателя</p>
      <input id="birds" @input="clear" class="ui-autocomplete-input txtInput animated bounceInRight" value="" autocomplete="off" placeholder="Введите ФИО преподавателя"
      role="textbox" aria-autocomplete="list" aria-haspopup="true"/><br/>
      <input type="text" name="teacher" id="log" hidden="" ><br/>
      <q-btn class="button" v-on:click="findTeacherClicked" id="search_teacher" color="secondary" label="Показать"/>
      <div id="schedule"></div>
      <q-inner-loading id="teacher_spinner" class="hidden" :visible="true">
        <div class="fixed fixed-center text-center">
        <q-spinner-gears class="relative-position" size="50px" style="color:#b30b5fff"></q-spinner-gears>
        <p style="color:black;font-weight: bold;">Подождите,идет загрузка данных</p>
        </div>
      </q-inner-loading>
    </div>
  </q-page>
</template>

<script>
  import {mapActions, mapMutations} from 'vuex' 
  export default
  {
      mounted()
      {
        this.load_teacher();
        this.getMyLibenTeacher();
      },
      methods:
      {
        clear()
        {
            if( $("#log").val()!='')
            {
              $("#log").val('');
            }
        },
        ...mapActions({
          load_teacher : 'teacher/load_teacher',
        }),
        ...mapMutations({
          findTeacherClicked : 'teacher/findTeacherClicked'
        }),
        getMyLibenTeacher()
        {
            if(localStorage.getItem('my_liben_teacher'))
            {
                $("#birds").val(localStorage.getItem('my_liben_teacher'));
            }
        }
      }
  }
</script>