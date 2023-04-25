import { db } from "@/firebase/fb-init";
import {
  collection,
  query,
  orderBy,
  startAt,
  endAt,
} from "@firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { useCollection, useCurrentUser, type _RefFirestore } from "vuefire";

export const useMonthlyEntriesStore = defineStore("monthly-entries", () => {
  const monthlyEntries: Ref<any> = ref([]);

  let currently_loaded_month = "";
  const user = useCurrentUser();
  const journalMonthRef = collection(db, `/users/${user.value?.uid}/entries`);

  function getJournalEntries(month: string) {
    if (month != currently_loaded_month) {
      currently_loaded_month = month;
      console.log("Updating monthly view from server!");
      monthlyEntries.value = useCollection(
        query(
          journalMonthRef,
          orderBy("date"),
          startAt(`${month}-01`),
          endAt(`${month}-31`)
        ),
        {
          ssrKey: "date",
        }
      );
    }
  }
  return { monthlyEntries, getJournalEntries };
});
