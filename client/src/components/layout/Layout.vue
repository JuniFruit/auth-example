<template>
    <v-app>
        <v-main>
            <Toast />
            <Header />
            <router-view></router-view>
            <ActivationBar />
        </v-main>
    </v-app>
</template>

<script lang="ts">
import Toast from '../toast/Toast.vue';
import Header from '../header/Header.vue';
import ActivationBar from '../activation/ActivationBar.vue';
import Vue from 'vue';
export default Vue.extend({
    name: "Layout",
    components: {
        Header,
        Toast,
        ActivationBar
    }
})

</script>