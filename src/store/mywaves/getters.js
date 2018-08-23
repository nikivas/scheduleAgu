/*
export const someGetter = (state) => {}
 */
import axios from 'axios'
export  function  getFaculties(state)
{
	if(!localStorage.getItem('faculties'))
	{
		return new Promise( function(resolve) {
			axios.get('http://raspisanie.asu.edu.ru/student/faculty')
			.then( function(json) {
			localStorage.setItem('faculties', JSON.stringify(json.data))
			resolve(json);	
		});
		});
	}
	else
	{
		return new Promise((resolve)=>{
			resolve (JSON.parse(localStorage.getItem('faculties')));
		});
	}
}

export function getSpecialities(state,id_faculty)
{
	if(!localStorage.getItem('all_specialities'))
	{
		return new Promise( function(resolve) {
			axios.get('http://m.raspisanie.asu.edu.ru/student/specialty')
			.then( function(json) {
			localStorage.setItem('all_specialities', JSON.stringify(json.data))
			resolve(json);	
			});
		});
	}
	else
	{
		return new Promise((resolve)=>{
			console.log(JSON.parse(localStorage.getItem('all_specialities')));
			resolve (JSON.parse(localStorage.getItem('all_specialities')));
		});
	}
}