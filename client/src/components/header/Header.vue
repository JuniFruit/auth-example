<template>
    <div>
        <v-toolbar dark prominent src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
            <v-app-bar-nav-icon @click="isDrawerOpen = !isDrawerOpen"></v-app-bar-nav-icon>

            <v-toolbar-title class="text-h4 font-weight-bold">Product browser</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon @click="handleClick">
                <v-icon>{{ isLogged ? ' mdi-export' : 'mdi-import' }}</v-icon>
            </v-btn>
        </v-toolbar>
        <v-navigation-drawer temporary absolute v-model="isDrawerOpen" class="primary " dark>
            <v-list>
                <v-list-item v-for="item in items" :key="item.title" router :to="item.link">
                    <v-list-item-icon>
                        <v-icon class="white--text">{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title class="font-weight-bold">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

        </v-navigation-drawer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { links } from './links.data';

export default Vue.extend({
    name: 'Header',

    data() {
        return {
            items: [...links],
            isDrawerOpen: false
        }
    },
    computed: {
        isLogged() {
            return !!this.$store.getters.getUser
        }
    },
    methods: {
        handleClick() {
            if (this.isLogged) return this.$store.dispatch('logout');
            this.$router.push('/auth');
        }
    }

})
</script>

<style lang="scss">
@import './Header.scss';
</style>