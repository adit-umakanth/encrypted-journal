<script setup lang="ts">
import JournalEntryView from "@/views/JournalEntryView.vue";
import { useRouter } from "vue-router";
import { watch } from "vue";

import DateSelector from "@/components/DateSelector.vue";
import type { QTableProps } from "quasar";
import { useMonthlyEntriesStore } from "@/stores/monthly-entries";

const router = useRouter();

const props = defineProps<{
  date: string;
}>();

const monthlyStore = useMonthlyEntriesStore();
monthlyStore.getJournalEntries(props.date);

watch(props, (new_props) => {
  monthlyStore.getJournalEntries(new_props.date);
});

const columns: QTableProps["columns"] = [
  {
    name: "date",
    label: "Date",
    field: "date",
    align: "left",
  },
  {
    name: "section_name",
    label: "Sections",
    field: "sections",
    align: "left",
  },
  {
    name: "title",
    label: "Title",
    field: "sections",
    align: "left",
  },
  {
    name: "rating",
    label: "Rating",
    field: "sections",
    align: "left",
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
  <div class="q-ma-lg row flex-center">
    <div class="col-12 col-md-10">
      <q-table
        title="Entries"
        :rows="monthlyStore.monthlyEntries.value"
        :columns="columns"
        row-key="date"
      >
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
  </div>
</template>
