<template>
	<q-page expand position="top">
		<div class="text-center" 
		 v-bind:class="{'animated fadeOut':!show_settings}" >
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
			load_faculties()
			{
				 if(!localStorage.getItem('faculties'))
				 {
				 	axios.post('http://raspisanie.asu.edu.ru/student/faculty')
				 	.then(function(data)
				 	{
				 		console.log(data);
				 		var json = data.data;
	       				localStorage.setItem('faculties',JSON.stringify(json));
						for (var i = 0; i < json.length; i++) 
						{
							$("#facul")
							.append($("<option></option>")
							.attr("value", $.trim(json[i].id))
							.text(json[i].name));
						}
				 	}).catch(function(error){
						Notify.create({
						message:"Произошла ошибка. Обратитесь к администратору.",
						type:'negative',
						position: 'bottom'
						});
				 	});
				 }
				 else
				 {
					var fac =  jQuery.parseJSON(localStorage.getItem('faculties'));
					for (var i = 0; i < fac.length; i++)
					{
					$("#facul")
					.append($("<option></option>")
					.attr("value", $.trim(fac[i].id))
					.text(fac[i].name));
					}
				 }
			},
			load_speciality()
			{

			}
		}
	}
</script>
