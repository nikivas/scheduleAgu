<template>
	<q-page expand position="top">
		<div class="text-center" v-show="">
			<span>Факультет</span><br/>
			<select class="select-style animated fadeInLeft" id = "facul" name="Faculty"></select><br/><br/>
			<span>Специальность</span><br/>
			<select class="select-style animated fadeInRight" id = "spec" name="specaility"></select><br/><br/>
			<span>Курс : </span>
			<div id="kurs" class="animated pulse">
			</div><br/>
			<p>Группы</p>
			<div id="groups"></div>
			</p>
			<br/>
		</div>
	</q-page>
</template>

<script>
	import {load_faculty} from '../js/estudiantes.js';
	require ('../css/table.css');
	export default
	{
		mounted()
		{
			load_faculty();
		}
	}
</script>