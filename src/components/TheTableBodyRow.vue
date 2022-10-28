<script setup>
const props = defineProps({
    rowData: {}
})
</script>

<template>
    <tr>
        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900" v-for="value in rowData">
            {{ value }}
        </td>
    </tr>
</template>