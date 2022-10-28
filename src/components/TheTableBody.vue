<script setup>
import TheTableBodyRow from './TheTableBodyRow.vue';

const props = defineProps({
    tableBody: Array
})
</script>


<template>
    <tbody class="divide-y divide-gray-200">
        <TheTableBodyRow v-for="(item, index) in tableBody" :key="index" :row-data="item" />
    </tbody>
</template>