<template>
	<q-page expand position="top">
		<br>
		<div class="text-center" id="settings_block">
			<span class="label text-italic text-red">Выберите группу</span><br/><br/>
			<span>Факультет</span><br/>
			<select v-on:change="load_speacilaty($event.target.value)" class="select-style animated fadeIn" 
			id = "facul" name="Faculty">
			</select><br/><br/>
			<span>Специальность</span><br/>
			<select v-on:change="spec_changed" class="select-style animated fadeIn" id = "spec" name="specaility"></select><br/><br/>
			<span>Курс : </span>
			<div id="kurs" class="animated zoomInLeft">
			</div><br/>
			<span>Группы</span><br/>
			<div id="groups"></div>
			<ul class="list_buttons">
				<li><q-btn class="button" @click="acceptar" 
				id="search_teacher" color="red" label="Принять"/>
			</li>
			<li>
				<q-btn class="button" @click="returnToGroups" color="dark" label="Назад"/>
			</li>
			</ul>
		</div>

		<div class="text-center" id="meine_groups">
			<div>Ваша группа</div>
		<div id="meine_liben_groups"></div>
			<ul class="list_buttons">
			<li><q-btn class="button" size="md" @click="findSchedule" color="secondary"
			 label="Найти"/></li>
			<li><q-btn class="button" size="md" v-on:click="goToSettings"  color="dark" label="Изменить группу"/>
			</li>
			</ul>
			<div id="schedule"></div>
		</div>
		<q-inner-loading id="spinnerDzyuba" :visible="true" class="hidden">
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
			}
		},
		mounted()
		{
			this.checkVisibilty();
			this.load_faculties();
			this.preloaded_kurses();
			this.preloadMeineKurses();
			this.findSchedule();
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
				spec_changed : 'mywaves/spec_changed',
				checkVisibilty : 'mywaves/checkVisibilty',
				goToSettings : 'mywaves/goToSettings',
				returnToGroups: 'mywaves/returnToGroups'
			}),
			...mapMutations({
				acceptar : 'mywaves/acceptar',
				preloadMeineKurses : 'mywaves/preloadMeineKurses',
				findSchedule : 'mywaves/findSchedule'
			}),
		},
		computed:{
		}
	}
</script>

<style>
.list_buttons
{
	list-style:none;

}
.list_buttons li{
	display:inline;
	padding-left : 0.75em;
}
</style>