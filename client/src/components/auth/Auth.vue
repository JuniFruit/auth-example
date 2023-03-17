<template>
    <v-container class="pa-4">
        <Form @onSubmit="onSubmit" :is-login="isLogin" />
        <v-row class="pa-4" :justify="'center'" :no-gutters="true">
            <v-btn :color="isLogin ? 'blue lighten-4' : 'blue lighten-5'" @click="isLogin = true">Sign In</v-btn>
            <v-btn :color="!isLogin ? 'blue lighten-4' : 'blue lighten-5'" @click="isLogin = false">Sign Up</v-btn>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Form from './Form.vue';
export default Vue.extend({

    data() {
        return {
            isLogin: true
        }
    },
    methods: {
        onSubmit(email: string, password: string) {
            console.log(email, password)
        },

    },
    components: {
        Form
    }
})
</script>