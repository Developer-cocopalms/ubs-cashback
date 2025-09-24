<template>
  <div class="space-y-6">
    <div class="flex items-center gap-2 text-sm text-slate-400">
      <span>Dashboards</span>
      <span>/</span>
      <span class="text-slate-600">Overview</span>
    </div>

    <h1 class="text-lg font-semibold">New Program</h1>

    <div class="bg-white rounded-2xl shadow-card ring-1 ring-slate-100 p-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <!-- Left column -->
        <div class="space-y-8">
          <section>
            <h2 class="text-sm font-semibold text-slate-700 mb-4">Primary Details</h2>
            <div class="space-y-5">
              <div class="grid grid-cols-[160px,1fr] items-center gap-6">
                <label class="text-slate-500 text-sm">Program name</label>
                <input v-model="form.name" class="border border-dashed border-slate-300 rounded px-3 py-2 focus:outline-none focus:border-slate-400" placeholder="" />
              </div>
              <div class="grid grid-cols-[160px,1fr] items-center gap-6">
                <label class="text-slate-500 text-sm">Program ID</label>
                <input v-model="form.programId" class="border border-dashed border-slate-300 rounded px-3 py-2" />
              </div>
              <div class="grid grid-cols-[160px,1fr] items-center gap-6">
                <label class="text-slate-500 text-sm">Minimum Amount</label>
                <input v-model="form.minimum" type="number" class="border border-dashed border-slate-300 rounded px-3 py-2" />
              </div>
              <div class="grid grid-cols-[160px,1fr] items-center gap-6">
                <label class="text-slate-500 text-sm">Multiple `Users</label>
                <select v-model="form.multi" class="border border-dashed border-slate-300 rounded px-3 py-2 bg-white">
                  <option value="single">Single</option>
                  <option value="multi">Multiple</option>
                </select>
              </div>
            </div>
          </section>

          <section>
            <h2 class="text-sm font-semibold text-slate-700 mb-4">Supplier Details</h2>
            <div class="space-y-5">
              <div class="grid grid-cols-[160px,1fr] items-center gap-6">
                <label class="text-slate-500 text-sm">Expiry Date</label>
                <input v-model="form.expiry" type="date" class="border border-dashed border-slate-300 rounded px-3 py-2" />
              </div>
              <div class="grid grid-cols-[160px,1fr] items-center gap-6">
                <label class="text-slate-500 text-sm">Advance Amount CB</label>
                <input v-model="form.advance" type="number" class="border border-dashed border-slate-300 rounded px-3 py-2" />
              </div>
              <div class="grid grid-cols-[160px,1fr] items-start gap-6">
                <label class="text-slate-500 text-sm mt-2">Terms & Condition</label>
                <textarea v-model="form.terms" rows="3" class="border border-dashed border-slate-300 rounded px-3 py-2"></textarea>
              </div>
            </div>
          </section>

          <section>
            <div class="grid grid-cols-[160px,1fr] items-start gap-6">
              <label class="text-slate-500 text-sm">&nbsp;</label>
              <div>
                <div class="w-32 h-32 border-2 border-dashed border-slate-300 rounded grid place-items-center text-slate-400 overflow-hidden">
                  <img v-if="imageUrl" :src="imageUrl" alt="preview" class="w-full h-full object-cover" />
                  <span v-else class="text-xs">Image</span>
                </div>
                <label class="mt-3 inline-flex items-center px-3 py-2 text-sm rounded border cursor-pointer">
                  <input type="file" accept="image/*" class="hidden" @change="onFile" />
                  Upload Image for Background
                </label>
              </div>
            </div>
          </section>
        </div>

        <!-- Right column (kept minimal like screenshot) -->
        <div></div>
      </div>

      <div class="flex justify-end pt-10">
        <button class="px-5 py-2.5 rounded-md bg-slate-100 text-slate-700 mr-2">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  programId: '',
  minimum: 0,
  multi: 'single',
  expiry: '',
  advance: 0,
  terms: '',
})

const imageUrl = ref<string | null>(null)
function onFile(e: Event){
  const file = (e.target as HTMLInputElement).files?.[0]
  if(!file) return
  imageUrl.value = URL.createObjectURL(file)
}
</script>
