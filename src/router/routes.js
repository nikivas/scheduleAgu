export default [
  {

    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/mywaves'),name:'Мое расписание' },
      { path: '/estudiantes', component: () => import('pages/estudiantes'),name:'Студенты' },
      { path:'/teachers',component:()=> import('pages/teachers'),name:'Преподаватели'},
      { path: '/audiences', component:() => import('pages/audiences'),name:'Аудитории'},
      { path: '/ads', component:() => import('pages/ads'),name:'Объявление'},
      { path: '/info', component:() => import('pages/index'),name:'Контакты'},
      { path:'/help',component:()=>import('pages/helper'),name:'Помощь'},
      { path:'/mywaves',component:()=>import('pages/mywaves'),name:'Мое расписание'}
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
