<script setup lang="ts">
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
      class="col-3"
    >
      <template v-slot:prepend>
        <div>
          <q-btn
            @click="navigateMonth(-1)"
            flat
            round
            color="primary"
            icon="chevron_left"
            class="col-2"
          />
        </div>
      </template>
      <template v-slot:append>
        <div>
          <q-btn
            @click="navigateMonth(1)"
            flat
            round
            color="primary"
            icon="chevron_right"
            class="col-2"
          />
        </div>
      </template>
    </q-input>
  </div>
</template>
