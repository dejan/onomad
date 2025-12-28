<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { timeago } from '../onomad';

const props = withDefaults(defineProps<{
  date: Date | string;
  updateInterval?: number;
}>(), {
  updateInterval: 60000
});

const formattedTime = ref(timeago(props.date));
let intervalId: ReturnType<typeof setInterval> | null = null;

const updateTime = () => {
  formattedTime.value = timeago(props.date);
};

onMounted(() => {
  intervalId = setInterval(updateTime, props.updateInterval);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});

// Update immediately if date prop changes
watch(() => props.date, updateTime);
</script>

<template>
  <span>{{ formattedTime }}</span>
</template>
