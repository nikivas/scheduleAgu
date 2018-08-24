/*
export const someGetter = (state) => {}
 */
import axios from 'axios'
export  function  getFaculties(state)
{
	if(!localStorage.getItem('faculties')||localStorage.getItem('faculties')=='')
	{
		return new Promise( function(resolve) {
			axios.get('http://raspisanie.asu.edu.ru/student/faculty')
			.then( function(json) {
			localStorage.setItem('faculties', JSON.stringify(json.data))
			resolve(json.data);	
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

export function getSpecialities(state)
{
	if(!localStorage.getItem('all_specialities')||localStorage.getItem('all_specialities').length==0)
	{
		return new Promise( function(resolve) {
			axios.get('http://m.raspisanie.asu.edu.ru/student/specialty')
			.then( function(json) {
			localStorage.setItem('all_specialities', JSON.stringify(json.data))
			resolve(json.data);	
			});
		});
	}
	else
	{
		return new Promise((resolve)=>{
			resolve (JSON.parse(localStorage.getItem('all_specialities')));
		});
	}
}

export function getGroups(state)
{
	if(!localStorage.getItem('all_groupies') || localStorage.getItem('all_groupies')=='')
	{
		return new Promise(function(resolve)
		{
			axios.get('http://raspisanie.asu.edu.ru/student/grup')
			.then( function(json) {
			localStorage.setItem('all_groupies', JSON.stringify(json.data))
			resolve(json.data);	
			});
		});
	}
	else
	{
		return new Promise((resolve)=>{
			resolve (JSON.parse(localStorage.getItem('all_groupies')));
		});
	}
}

