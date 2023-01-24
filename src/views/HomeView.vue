<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import { ref } from "vue";
import { getAuth } from "@firebase/auth";

const leftDrawerOpen = ref(false);
const commitID = import.meta.env.VITE_GITHUB_SHA;

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
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :width="350"
    >
      <div class="column items-center justify-between" style="height: 100%">
        <div class="col-1 text-h5 q-py-xl">
          <q-icon name="o_book" size="1.5em" /> Encrypted Journal
        </div>
        <div class="col-grow"></div>
        <div class="col-1 text-caption text-weight-light">
          Commit ID - {{ commitID }}
        </div>
      </div>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped></style>
