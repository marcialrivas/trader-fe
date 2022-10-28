import { defineStore } from "pinia";
import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import localforage from 'localforage';
import memoryDriver from 'localforage-memoryStorageDriver';

const traderForageStore = localforage.createInstance({
    // List of drivers used
    driver: [
        localforage.INDEXEDDB,
        localforage.LOCALSTORAGE,
        memoryDriver._driver
    ],
    // Prefix all storage keys to prevent conflicts
    name: 'alpaca'
});


const traderCache = setupCache({
    maxAge: 15 * 60 * 1000,
    exclude: {
        query: false,
        methods: ['put', 'patch', 'delete'],
    },
    store: traderForageStore
});


const traderAxiosInstance = axios.create({
    baseURL: 'https://c2jbqmcqnzgxnoipf3ak2uxncq0pxqdw.lambda-url.us-east-1.on.aws',
    adapter: traderCache.adapter
});

export const traderStore = defineStore('trader', {
    state: () => (
        {
            signal: {}
        }
    ),
    getters: {
        getSingal(state) {
            return state.signal;
        }
    },
    actions: {
        async fetchSignal(symbolToFech) {
            try {
                const data = await traderAxiosInstance.post('/', {
                    symbol: symbolToFech
                });
                this.signal = data.data;
            }catch (error) {
                console.error(error);
            }
        } 
    }
});