<template>
    <div class="main_container">
        <v-container grid-list-xs class="my-5">
            <h1 class="text-md-h4 text-h5 font-weight-bold text--secondary">Please provide your
                credentials
            </h1>

        </v-container>
        <v-container class="pa-4">
            <Form @onSubmit="onSubmit" :is-login="isLogin" />
            <v-row class="pa-4 button_container" :justify="'center'" :no-gutters="true">
                <v-btn :ripple="false" x-large class="text-capitalize" text depressed plain
                    :color="isLogin ? 'blue darken-4' : 'blue lighten-1'" @click="isLogin = true">Sign
                    In</v-btn>
                <v-btn :ripple="false" x-large class="text-capitalize" text plain depressed
                    :color="!isLogin ? 'blue darken-4' : 'blue lighten-1'" @click="isLogin = false">Sign Up</v-btn>
            </v-row>
        </v-container>

    </div>
</template>

<script lang="ts">


import Vue from 'vue'
import Form from './Form.vue';
export default Vue.extend({
    name: 'Auth',
    data() {
        return {
            isLogin: true
        }
    },
    computed: {
        isError() {
            return !!this.$store.getters.getErrMsg
        }
    },
    methods: {
        onSubmit({ email, password }: Record<string, string>) {

            const credentials = {
                email,
                password
            }
            this.isLogin
                ? this.$store.dispatch('login', credentials).then((isSuccess) => isSuccess ? this.$router.push('/') : null)
                : this.$store.dispatch('register', credentials).then((isSuccess) => isSuccess ? this.$router.push('/activate') : null)
        },

    },
    components: {
        Form
    },
    mounted() {
        if (this.$store.getters.getUser !== null) {
            this.$router.push('/');
        }
    }

})
</script>

<style scoped lang="scss">
@import './Auth.scss';
</style>