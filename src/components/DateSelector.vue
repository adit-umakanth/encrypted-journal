<script setup lang="ts">
//@ts-nocheck
import { ref, watch } from "vue";
import dayjs from "dayjs";

const props = defineProps<{
  selected_date: string;
}>();
const emit = defineEmits<{
  (e: "dateChange", date: string): void;
}>();

let model_date = ref(props.selected_date);

watch(props, (new_props) => {
  model_date.value = new_props.selected_date;
});
watch(model_date, (new_model_date) => {
  emit("dateChange", new_model_date);
});

function navigateMonth(delta: number) {
  let current = dayjs(`${model_date.value}-01`);
  model_date.value = current.add(delta, "month").format("YYYY-MM");
}
</script>

<template>
  <div class="row flex-center">
    <q-input
      filled
      v-model="model_date"
      type="month"
      style="text-align: center"
      class="col-12 col-md-3"
    >
      <template v-slot:prepend>
        <div class="q-pr-md">
          <q-btn-group flat>
            <q-btn
              @click="navigateMonth(-1)"
              flat
              round
              color="primary"
              icon="chevron_left"
            /><q-btn
              @click="navigateMonth(1)"
              flat
              round
              color="primary"
              icon="chevron_right"
            />
          </q-btn-group>
        </div>
      </template>
    </q-input>
  </div>
</template>
