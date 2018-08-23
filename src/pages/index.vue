<template>
  <q-page class="flex flex-center">
    <div class="text-center">
      <img src="../statics/logo_agu.png" class="animated zoomIn" id="logo_agu"><br/>
      <p class="text-center q-caption">
        Адрес : г.Астрахань, ул.Татищева 20А <br>
        Телефон : +7(8512)61-06-75 <br>
        Email: <a href="mailto:rastyam.aminov@asu.edu.ru">rastyam.aminov@asu.edu.ru</a>
      </p>
    </div>
  </q-page>
</template>

<script>
export default
{
  name: 'PageIndex',
  mounted(){

  }
}
</script>

<style>
  #logo_agu
  {
    max-width:10em;
  }
  #logo_dmasters
  {
    margin-left: 2em;
    margin-bottom: -2.5em;
    max-width: 8em;
  }
  .signature
  {
    font-size:0.75em;
  }

</style>