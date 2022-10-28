import { defineStore } from "pinia";
import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'
import localforage from 'localforage'
import memoryDriver from 'localforage-memoryStorageDriver'



const alpacaforageStore = localforage.createInstance({
    // List of drivers used
    driver: [
        localforage.INDEXEDDB,
        localforage.LOCALSTORAGE,
        memoryDriver._driver
    ],
    // Prefix all storage keys to prevent conflicts
    name: 'alpaca'
});


const alpacaCache = setupCache({
    maxAge: 15 * 60 * 1000,
    exclude: {
        query: false,
        methods: ['put', 'patch', 'delete'],
    },
    store: alpacaforageStore
});


const axiosAlpacaInstance = axios.create({
    baseURL: 'https://paper-api.alpaca.markets',
    headers: {
        'APCA-API-KEY-ID': 'PKXS71ZFGVOHJCY4I70S',
        'APCA-API-SECRET-KEY': 'ot7L2QL1VOjbRS0TI4i5vMaJX0U5lg4d4yy7lSyA'
    },
    adapter: alpacaCache.adapter
});

export const alpacaStore = defineStore("alpaca", {
    state: () => (
        {
            assets: [],
            assetsTableHeader: {
            },
            singals: [],
        }
    ),
    getters: {
        getAssets(state) {
            return state.assets
        },
        getAssetsTableHeader(state) {
            return state.assetsTableHeader
        },
    },
    actions: {
        async fetchAssets() {
            try {
                const data = await axiosAlpacaInstance.get('/v2/assets?exchange=NASDAQ&status=active&tradable=true');
                this.assets = data.data.filter(item => {
                    if (item.marginable == true && item.shortable == true && item.fractionable == true) {
                        return true;
                    }
                    return false;

                }).sort((a, b) => {
                    const symbolA = a.symbol.toUpperCase();
                    const symbolB = b.symbol.toUpperCase();
                    if (symbolA < symbolB) {
                        return -1;
                    }
                    if (symbolA > symbolB) {
                        return 1;
                    }
                })

            } catch (error) {
                console.error(error);
            }
        },
        fetchAssetsTableHeader() {
            this.assetsTableHeader = {
                id: "id",
                class: "class",
                exchange: "exchange",
                symbol: "symbol",
                name: "name",
                status: "status",
                tradable: "tradable",
                marginable: "marginable",
                maintenance_margin_requirement: "maintenance margin requirement",
                shortable: "shortable",
                easy_to_borrow: "easy_to_borrow",
                fractionable: "fractionable"
            }
        },
        
    }
})