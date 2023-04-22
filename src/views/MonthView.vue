<script setup lang="ts">
import JournalEntryView from "@/views/JournalEntryView.vue";
import { useCollection, useCurrentUser, type _RefFirestore } from "vuefire";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
import {
  collection,
  query,
  type DocumentData,
  orderBy,
  startAt,
  endAt,
} from "@firebase/firestore";
import { db } from "@/firebase/fb-init";
import DateSelector from "@/components/DateSelector.vue";

const user = useCurrentUser();
const router = useRouter();

const props = defineProps<{
  date: string;
}>();

watch(props, (new_date) => {
  queryJournalEntries();
});

const journalMonthRef = collection(db, `/users/${user.value?.uid}/entries`);

let entries: _RefFirestore<DocumentData[]>;

function queryJournalEntries() {
  const q = query(
    journalMonthRef,
    orderBy("date"),
    startAt(`${props.date}-01`),
    endAt(`${props.date}-31`)
  );
  entries = useCollection(q, { ssrKey: "date" });
}
queryJournalEntries();
</script>

<template>
  <div class="q-ma-lg">
    <DateSelector
      @date-change="(new_date) => router.push(`/journal/${new_date}`)"
      :selected_date="props.date"
    />
  </div>
  <div class="q-ma-lg">
    {{ entries }}
    <!-- <JournalEntryView date="" /> -->
  </div>
</template>
