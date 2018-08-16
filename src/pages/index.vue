<template>
  <q-page class="flex flex-center">
    <div class="text-center">
      <img src="../statics/logo_agu.png" id="logo_agu"><br/>
      <div class="text-weight-medium">г.Астрахань ул.Татищева 20А,</div>
      <div class="text-weight-medium">Телефон : 8(8512) 610675</div>
      <div class="text-weight-medium">Email : <a href="mailto:ddmaster@mail.ru">
      ddmasters@mail.ru</a></div>
    </div>
    <div class="fixed-bottom-right">
       <img src="../statics/dmasters.png" id="logo_dmasters" />
      <div class="signature">© Developed by Serdar Durdyev</div>
    </div>
     
  </q-page>
</template>

<script>
export default
{
  name: 'PageIndex'
}
</script>

<style>
  #logo_agu
  {
    max-height: 42vh;
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