<template>
	<q-page expand position="top">
		<div class="text-center" v-bind:class="{hidden:checkVisibility==false}"
		 id="settings_block" >
			<span>Факультет</span><br/>
			<select v-on:change="load_speacilaty($event.target.value)" class="select-style animated bounceInDown" id = "facul" name="Faculty">
			</select><br/><br/>
			<span>Специальность</span><br/>
			<select v-on:change="spec_changed" class="select-style animated bounceInUp" id = "spec" name="specaility"></select><br/><br/>
			<span>Курс : </span>
			<div id="kurs" class="animated zoomInLeft">
			</div><br/>
			<span>Группы</span><br/>
			<div id="groups"></div>
			</p>
			<br/>
			<q-btn class="button" @click="acceptar" id="search_teacher" color="red" label="Принять"/>
		</div>

		<div class="text-center" id="meine_groups" 
		v-bind:class="{hidden:checkVisibility==true}">
		<div id="meine_liben_groups"></div>
			<ul id="list_buttons">
			<li><q-btn class="button" size="sm"  color="secondary" label="Найти"/></li>
			<li><q-btn class="button" size="sm"  color="tertiary" label="Изменить группы"/>
			</li>
			</ul>
		</div>

		<q-inner-loading id="spinnerDzyuba":visible="true" class="hidden">
		<div class="fixed fixed-center text-center">
		<q-spinner-gears class="relative-position" size="50px"  color="red" ></q-spinner-gears>
		<p id="message_info" class="text-black" style="font-weight: bold;">Подождите,идет загрузка данных</p>
		</div>
		</q-inner-loading>
	</q-page>
</template>

<script>
	import axios from 'axios';
	import {mapActions,mapMutations} from 'vuex'
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
			this.preloaded_kurses();
			this.preloadMeineKurses();
		},
		created()
		{

		},
		methods:
		{
			...mapActions({
				load_faculties : 'mywaves/load_faculties',
				load_speacilaty : 'mywaves/load_speacilaty',
				preloaded_kurses : 'mywaves/preloaded_kurses',
				spec_changed : 'mywaves/spec_changed'
			}),
			...mapMutations({
				acceptar : 'mywaves/acceptar',
				preloadMeineKurses : 'mywaves/preloadMeineKurses'
			}),
		},
		computed:{
			checkVisibility(){
				var meine_groups= localStorage.getItem('meine_liben_groups');
				if(!meine_groups && meine_groups.length!=0)
				{
					return true;
				}
				else{
					return false;
				}
			}
		}
	}
</script>

<style>
#list_buttons
{
	list-style:none;
}
#list_buttons li{
	display:inline;
	padding-left:1em;
}
</style>