<template>
  <q-layout view="lHh Lpr lFf" >
    <q-layout-header>
      <q-toolbar
        color="blue-grey"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu"  color="black"/>
        </q-btn>

        <q-toolbar-title class="text-white">
          Расписание
          <div slot="subtitle" class="text-white">Астраханский государственный университет</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer slide="left"
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
      <!--q-item to="/mywaves">
          <q-item-side class="fa fa-book" />
          <q-item-main label="Мое Расписание" />
        </q-item-->

        <q-item to="/estudiantes">
          <q-item-side class="fa fa-users" />
          <q-item-main label="Студенты" />
        </q-item>
        <q-item to="/teachers" >
          <q-item-side class="fas fa-chalkboard-teacher" />
          <q-item-main label="Преподаватели" />
        </q-item>
        
        <q-item to="/audiences">
          <q-item-side class="fas fa-building" />
          <q-item-main label="Аудитории"/>
        </q-item>

        <q-item to="/ads">
          <q-item-side class="fas fa-exclamation"/>
          <q-item-main label="Объявления" />
        </q-item>

       <q-item to="/help">
          <q-item-side class="fas fa-question"/>
          <q-item-main label="Помощь" />
        </q-item>

        <q-item to="/info">
          <q-item-side class="fa fa-info"/>
          <q-item-main label="Информация"/>
        </q-item>
      
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
