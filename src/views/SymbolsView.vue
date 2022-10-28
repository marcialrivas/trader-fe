<script setup>
import TheTable from '../components/TheTable.vue';
import { ref, onMounted, computed} from 'vue';
import { alpacaStore } from '../stores/alpaca';

const store = alpacaStore();

const getAssets = computed(() => {
    return store.getAssets
});

const getAssetsTableHeader = computed(() => {
    return store.getAssetsTableHeader
});


onMounted(() => {
    store.fetchAssets();
    store.fetchAssetsTableHeader();
});

</script>
<template>
    <div>
        <TheTable :table-header="getAssetsTableHeader" :table-body="getAssets" />
    </div>
</template>
  
<style>

</style>
  