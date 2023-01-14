<script setup lang="ts">
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
} from "@firebase/auth";

function redirectForOAuth() {
  signInWithRedirect(getAuth(), new GoogleAuthProvider());
}
</script>

<template>
  <div class="row">
    <q-card class="fixed-center text-center col-xs-10 col-md-3">
      <q-card-section class="q-py-lg">
        <div class="text-h5">Encrypted Journal</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pt-lg q-px-lg text-left"
        >Use your Google account to securely load your encryped journal entries
        from the cloud. <br /><br />
        Encrypted Journal uses OAuth and does not store your Google email or
        password.
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-btn color="blue" @click="redirectForOAuth">
          <q-avatar icon="img:google.svg"></q-avatar>
          Sign in with Google</q-btn
        >
      </q-card-section>
    </q-card>
  </div>
</template>
