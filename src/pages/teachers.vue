<template>
  <q-page expand position="top">
    <br>
    <div class="text-center">
      <p>ФИО преподавателя</p>
      <input id="birds" @input="clear" class="ui-autocomplete-input txtInput animated bounceInRight" value="" 
      placeholder="Введите ФИО преподавателя"
      role="textbox"/><br/>
      <input type="text" name="teacher" id="log" hidden="" ><br/>
      <q-btn class="button" v-on:click="findTeacherClicked" id="search_teacher" color="secondary" label="Показать"/>
     <br/><br/>
      <div id="schedule"></div>
    </div>
    <q-inner-loading id="teacher_spinner" class="hidden" :visible="true">
      <div class="fixed fixed-center text-center">
      <q-spinner-audio color="red-10" :size="30" />
      <p style="color:black;font-weight: bold;">Подождите,идет загрузка данных</p>
      </div>
    </q-inner-loading>
  </q-page>
</template>

<script>
  import {mapActions, mapMutations} from 'vuex' 
  require ('../../node_modules/jquery-ui/themes/base/all.css');
  export default
  {
      mounted()
      {
        this.load_teacher();
        this.getMyLibenTeacher();
        this.findTeacherClicked();
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
<style scoped>
  main{
    overflow-x:hidden;
  }
</style>