<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { timeago } from 'onomad';

const props = withDefaults(defineProps<{
  date: Date | string;
  updateInterval?: number;
  maxAgeUpdate?: number;
}>(), {
  updateInterval: 60,
  maxAgeUpdate: Infinity
});

const formattedTime = ref(timeago(new Date(props.date)));
let intervalId: ReturnType<typeof setInterval> | null = null;

const updateTime = () => {
  formattedTime.value = timeago(new Date(props.date));
};

const getAgeInMs = () => {
  return Date.now() - new Date(props.date).getTime();
};

onMounted(() => {
  const ageInMs = getAgeInMs();
  if (ageInMs <= props.maxAgeUpdate * 1000) {
    intervalId = setInterval(updateTime, props.updateInterval * 1000);
  }
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
