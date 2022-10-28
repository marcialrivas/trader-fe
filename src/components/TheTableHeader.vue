<script setup>
const props = defineProps({
    tableHeader: {}
})
</script>
<template>
    <thead>
        <tr>
            <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900" v-for="value in tableHeader">
                {{ value }}
            </th>
        </tr>
    </thead>
</template>