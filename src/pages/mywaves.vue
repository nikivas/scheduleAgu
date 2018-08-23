<template>
	<q-page expand position="top">
		<div class="text-center" >
			<span>Факультет</span><br/>
			<select class="select-style animated bounceInDown" id = "facul" name="Faculty"></select><br/><br/>
			<span>Специальность</span><br/>
			<select class="select-style animated bounceInUp" id = "spec" name="specaility"></select><br/><br/>
			<span>Курс : </span>
			<div id="kurs" class="animated pulse">
			</div><br/>
			<p>Группы</p>
			<div id="groups"></div>
			</p>
			<br/>
			<q-btn class="button" @click="setInvisible()" id="search_teacher" color="red" label="Принять"/>
		</div>
	</q-page>
</template>

<script>
	import axios from 'axios';
	import { Notify } from 'quasar';
	import {mapActions} from 'vuex'
	export default
	{
		data()
		{
			return{
				show_settings:true
			}
		},
		mounted()
		{
			
			this.load_faculties();
		},
		created()
		{

		},
		methods:
		{
			setInvisible()
			{
				this.show_settings = false;
			},
			...mapActions({
				load_faculties : 'mywaves/load_faculties'
			})

		}
	}
</script>
