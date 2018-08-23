/*
export const someGetter = (state) => {}
 */
export async function  getFaculties() {
	if(localStorage.getItem('faculties'))
	{
		this.dispatch('helper/load_faculty').then((result)=>{
			return result;
		});
	}
}