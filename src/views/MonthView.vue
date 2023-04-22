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

const columns = [
  {
    name: "date",
    required: true,
    align: "left",
    label: "Date",
  },
  {
    name: "section_name",
    align: "left",
    label: "Sections",
  },
  {
    name: "title",
    align: "left",
    label: "Title",
  },
  {
    name: "rating",
    align: "left",
    label: "Rating",
  },
];
</script>

<template>
  <div class="q-ma-lg">
    <DateSelector
      @date-change="(new_date) => router.push(`/journal/${new_date}`)"
      :selected_date="props.date"
    />
  </div>
  <div class="q-ma-lg">
    <q-table title="Entries" :rows="entries" :columns="columns" row-key="date">
      <template v-slot:body="props">
        <q-tr :props="props" @click="router.push(`${props.row.date}`)">
          <q-td key="date" :props="props">
            {{ props.row.date }}
          </q-td>
          <q-td :props="props" key="date">
            <ul style="list-style-type: none; padding: 0; margin: 0">
              <li
                v-for="section in props.row.sections"
                :key="section.section_name"
              >
                {{ section.section_name }}
              </li>
            </ul>
          </q-td>
          <q-td :props="props" key="date">
            <ul style="list-style-type: ''; padding: 0; margin: 0">
              <li v-for="section in props.row.sections" :key="section.title">
                {{ section.title }}
              </li>
            </ul>
          </q-td>
          <q-td :props="props" key="date">
            <ul style="list-style-type: ''; padding: 0; margin: 0">
              <li v-for="section in props.row.sections" :key="section.rating">
                {{ section.rating }}
              </li>
            </ul>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
