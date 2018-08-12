<template>
  <q-page>
      <div id="divLittle"></div>
  </q-page>
</template>

<script>
    import * as module from'../js/loadData.js'
    require ('../css/table.css')
    export default{
      mounted()
      {
         module.getContentForMobile()
      }
    }
</script>