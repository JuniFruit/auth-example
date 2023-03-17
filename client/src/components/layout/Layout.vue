<template>
    <v-app>
        <Header />
        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Header from '../header/Header.vue';
import Vue from 'vue';
export default Vue.extend({
    components: {
        Header
    }
})

</script>