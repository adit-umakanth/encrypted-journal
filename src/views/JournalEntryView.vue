<script setup lang="ts">
import { db } from "@/firebase/fb-init";
import { addDoc, collection } from "@firebase/firestore";
import { ref } from "vue";
import { useCurrentUser } from "vuefire";

let user = useCurrentUser();

type JournalEntryTab = {
  section_name: string;
  body: string;
  title: string;
  rating: number;
};
type JournalEntryTabs = Array<JournalEntryTab>;

const props = defineProps<{
  date?: string; // Date not provided means new entry is being created
}>();

let entry_date = ref("");
let selected_tab = ref("");
let tab_entries = ref<JournalEntryTabs>([]);

let new_dialog_status = ref(false);
let new_section_name = ref("");
function addNewSection() {
  tab_entries.value.push({
    section_name: new_section_name.value,
    title: "",
    body: "",
    rating: 0,
  });
  new_dialog_status.value = false;
  selected_tab.value = new_section_name.value;
  new_section_name.value = "";
}
async function addEntry() {
  await addDoc(collection(db, `users/${user.value?.uid}/entries`), {
    date: entry_date.value,
    sections: tab_entries.value,
  });
}
</script>
<template>
  <q-card>
    <q-card-section>
      <q-input
        v-model="entry_date"
        stack-label
        label="Entry Date"
        filled
        type="date"
      />
    </q-card-section>
    <q-card bordered>
      <q-tabs
        v-model="selected_tab"
        class="text-grey bg-blue-grey-10"
        active-color="primary"
        indicator-color="primary"
        outside-arrows
        align="center"
      >
        <q-tab
          v-for="tab_entry in tab_entries"
          :key="tab_entry.section_name"
          :label="tab_entry.section_name"
          :name="tab_entry.section_name"
        />
        <q-btn
          stretch
          flat
          label="Add Section"
          icon-right="add"
          color="secondary"
          @click="new_dialog_status = true"
        >
        </q-btn>
      </q-tabs>
      <q-tab-panels v-model="selected_tab" animated>
        <q-tab-panel
          v-for="tab_entry in tab_entries"
          :key="tab_entry.section_name"
          :name="tab_entry.section_name"
          class="q-gutter-y-md"
        >
          <div class="row justify-center">
            <div class="col-12">
              <q-input
                filled
                label="Title"
                hint="Short description of entry"
                hide-hint
                v-model="tab_entry.title"
              />
            </div>
          </div>
          <div class="row items-baseline">
            <div class="col-3">
              <p class="text-subtitle1 text-weight-thin">Rating:</p>
            </div>
            <div class="col-9">
              <q-rating
                icon="star_border"
                icon-selected="star"
                v-model="tab_entry.rating"
                size="md"
              ></q-rating>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <q-input autogrow label="Entry" filled v-model="tab_entry.body" />
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <q-card-actions align="right">
      <q-btn label="Add Entry" @click="addEntry" color="green-8" />
    </q-card-actions>
  </q-card>
  <q-dialog v-model="new_dialog_status" persistent>
    <q-card>
      <q-card-section align="center">
        <div class="text-h6">New Section</div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-ma-md">
        <q-input
          v-model="new_section_name"
          label="Section Name"
          filled
          @keyup.enter="addNewSection"
        />
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="red" v-close-popup />
        <q-btn flat label="Add" color="primary" @click="addNewSection" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
