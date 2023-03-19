<template>
    <v-container>

        <v-card v-for="product in products" :key="product.id" class="mx-auto my-5" elevation="2" max-width="644" outlined>
            <v-list-item three-line>
                <v-list-item-content>
                    <div class="text-overline mb-4">
                        {{ product.title }}
                    </div>
                    <v-list-item-title class="text-h5 mb-1">
                        {{ product.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{ product.description }}</v-list-item-subtitle>

                    <span class="mt-5 font-weight-bold blue--text">
                        {{
                            !!product.price ? localePrice(product.price)
                            : 'Log in to see the price'
                        }}
                    </span>
                </v-list-item-content>

                <v-list-item-avatar tile size="80" color="grey">
                    <v-img :src='product.thumbnail'></v-img>
                </v-list-item-avatar>
            </v-list-item>


        </v-card>
    </v-container>
</template>

<script lang="ts">
//@ts-nocheck
import { IProductItem, IPricedProductItem } from '@/types/product.types';
import Vue from 'vue';
export default Vue.extend({
    name: "Home",
    data() {
        return {

        }
    },
    computed: {
        products(): IProductItem[] | IPricedProductItem[] {
            return this.$store.getters.getProducts
        },
        isLogged() {

            return this.$store.getters.getIsLoggedIn
        }

    },
    watch: {
        isLogged(next, prev) {
            if (next !== prev) this.$store.dispatch('loadProducts')
        }
    },

    created() {
        this.$store.dispatch('loadProducts')
    },


    methods: {
        localePrice(price: number): string {
            const options: Intl.NumberFormatOptions = {
                style: 'currency',
                currency: 'EUR',
            }
            return Intl.NumberFormat('en-US', options).format(price)
        }
    }

})
</script>