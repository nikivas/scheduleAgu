/*
export const someGetter = (state) => {}
 */
import axios from 'axios'
const _instanse = axios.create({ timeout: 15000 });
import { Dialog } from 'quasar';
export function getFaculties(state) {
	if (!localStorage.getItem('faculties') || localStorage.getItem('faculties') == '') {
		return new Promise(function (resolve) {
			_instanse.get('http://raspisanie.asu.edu.ru/student/faculty')
				.then(function (json) {
					localStorage.setItem('faculties', JSON.stringify(json.data));
					resolve(json.data);
				}).catch(() => {
					Dialog.create({
						title: 'Информация',
						message: 'Что-то пошло не так. Проверьте интернет соединение' +
							' или обратитесь к администратору!'
					});
					resolve(null);
				});
		});
	}
	else {
		return new Promise((resolve) => {
			resolve(JSON.parse(localStorage.getItem('faculties')));
		});
	}
}

export function getSpecialities(state) {
	if (!localStorage.getItem('all_specialities') || localStorage.getItem('all_specialities') == '') {
		return new Promise(function (resolve) {
			_instanse.get('http://m.raspisanie.asu.edu.ru/student/specialty')
				.then(function (json) {
					localStorage.setItem('all_specialities', JSON.stringify(json.data))
					resolve(json.data);
				}).catch(() => {
					Dialog.create({
						title: 'Информация',
						message: 'Что-то пошло не так. Проверьте интернет соединение' +
							' или обратитесь к администратору!'
					});
					resolve(null);
				});
		});
	}
	else {
		return new Promise((resolve) => {
			resolve(JSON.parse(localStorage.getItem('all_specialities')));
		});
	}
}

export function getGroups(state) {
	if (!localStorage.getItem('all_groupies') || localStorage.getItem('all_groupies') == '') {
		return new Promise(function (resolve) {
			_instanse.get('http://raspisanie.asu.edu.ru/student/grup')
				.then(function (json) {
					localStorage.setItem('all_groupies', JSON.stringify(json.data))
					resolve(json.data);
				}).catch((err) => {
					Dialog.create({
						title: 'Информация',
						message: 'Что-то пошло не так. Проверьте интернет соединение' +
							' или обратитесь к администратору!'
					});
					resolve(null);
				});
		});
	}
	else {
		return new Promise((resolve) => {
			resolve(JSON.parse(localStorage.getItem('all_groupies')));
		});
	}
}

