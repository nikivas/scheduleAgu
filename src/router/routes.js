export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/estudiantes') },
      { path: 'estudiantes', component: () => import('pages/estudiantes') },
      { path:'teachers',component:()=> import('pages/teachers')},
      { path: 'audiences', component:() => import('pages/audiences')},
      { path: 'ads', component:() => import('pages/ads')},
      { path: 'info', component:() => import('pages/index')},
      {path:'help',component:()=>import('pages/helper')}
    ]
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
