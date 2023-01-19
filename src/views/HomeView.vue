<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import { ref } from "vue";
import { getAuth } from "@firebase/auth";

const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const router = useRouter();
function signOut() {
  getAuth().signOut();
  router.replace("/login");
}
</script>

<template>
  <q-layout view="lHh lpR lFf">
    <q-header reveal class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
          class="lt-md"
        />
        <q-toolbar-title></q-toolbar-title>
        <q-btn flat label="Sign Out" @click="signOut" />
      </q-toolbar>
      <q-toolbar inset></q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :width="350"
    >
      <q-toolbar>
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

<style scoped></style>
