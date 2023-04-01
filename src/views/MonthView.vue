<script setup lang="ts">
import JournalEntryView from "@/views/JournalEntryView.vue";
import { useCollection, useCurrentUser, type _RefFirestore } from "vuefire";
import { useRouter } from "vue-router";
import { watch } from "vue";
import {
  collection,
  query,
  where,
  type DocumentData,
} from "@firebase/firestore";
import { db } from "@/firebase/fb-init";

const user = useCurrentUser();
const router = useRouter();

const props = defineProps<{
  date: string;
}>();

watch(props, (new_date) => {
  console.log(`date has been changed to ${new_date.date}`);
  queryJournalEntries();
});

const journalMonthRef = collection(
  db,
  `/users/${user.value?.uid}/journal-months`
);

let entries: _RefFirestore<DocumentData[]>;

function queryJournalEntries() {
  const q = query(journalMonthRef, where("month", "==", props.date));
  entries = useCollection(q, { ssrKey: "month" });
}
queryJournalEntries();
</script>

<template>
  {{ props }} <br />
  <q-btn @click="router.replace('/journal/2023-02')">Back</q-btn><br />
  <q-btn @click="router.replace('/journal/2023-03')">Current</q-btn> <br />
  <q-btn @click="router.replace('/journal/2023-04')">Forward</q-btn>
  {{ entries }}
  <JournalEntryView />
</template>
