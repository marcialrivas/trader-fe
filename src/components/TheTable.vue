<script setup>
import TheTableHeader from './TheTableHeader.vue';
import TheTableBody from './TheTableBody.vue';

const props = defineProps({
    tableHeader: {},
    tableBody: Array
})

</script>

<template>
    <div class="overflow-x-auto">
        <table class="min-w-full divide-y-2 divide-gray-200 text-sm">

            <TheTableHeader :table-header="tableHeader" />
            <TheTableBody :table-body="tableBody" />

        </table>
    </div>
</template>