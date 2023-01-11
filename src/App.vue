<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { ref } from 'vue';
const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>


<template>
  <q-layout view="lHh lpR lFf">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" class="lt-md" />
      </q-toolbar>
      <q-toolbar inset></q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered :width=400>
      <q-toolbar>
        <q-spacer />
        <q-toolbar-title class="absolute-center q-mt-lg">
          <q-icon name="o_book" size="1.5em" />
          Encrypted Journal
        </q-toolbar-title>
      </q-toolbar>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<style scoped>

</style>
