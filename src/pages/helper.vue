<template>
	<q-page expand position="top">
		<p class="text-justify">
			Если ваша группа отсутсвует в нашем приложении, попробуйте подгрузить
			ее вручную с сервера, нажав на кнопку "Обновить"
		</p>
		<br>
		<div class="text-center"> <q-btn color="primary" id="load_changes" label="Обновить" /> </div>
		<q-inner-loading id="fidgetSpinner"  class="hidden" :visible="true">
			<div class="fixed fixed-center text-center">
			<q-spinner-gears class="relative-position" size="50px" style="color:#b30b5fff"></q-spinner-gears>
			<p style="color:black;font-weight: bold;">Подождите,идет загрузка данных</p>
			</div>
		</q-inner-loading>
	</q-page>
</template>

<script>
    import * as module from'../js/helper.js'
    export default{
      mounted()
      {
        
      }
    }
</script>