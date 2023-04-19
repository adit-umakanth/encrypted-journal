<script setup lang="ts">
import JournalEntryView from "@/views/JournalEntryView.vue";
import { useCollection, useCurrentUser, type _RefFirestore } from "vuefire";
import { useRouter } from "vue-router";
import { watch } from "vue";
import {
  collection,
  query,
  type DocumentData,
  orderBy,
  startAt,
  endAt,
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

const journalMonthRef = collection(db, `/users/${user.value?.uid}/entries`);

let entries: _RefFirestore<DocumentData[]>;

function queryJournalEntries() {
  const q = query(
    journalMonthRef,
    orderBy("date"),
    startAt("2022-01-01"),
    endAt("2023-04-15")
  );
  entries = useCollection(q, { ssrKey: "date" });
}
queryJournalEntries();
</script>

<template>
  <div class="q-ma-lg">
    <JournalEntryView date="" />
  </div>
</template>
