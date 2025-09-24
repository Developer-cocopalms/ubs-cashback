<template>
  <div class="min-h-[60vh] grid place-items-center">
    <div class="text-center">
      <h1 class="text-2xl font-semibold text-slate-800">{{ title }} coming soon</h1>
      <p class="text-slate-500 mt-2">This section will be generated next. Continue prompting to fill it in.</p>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{ title?: string }>()
const title = props.title ?? 'Page'
</script>
