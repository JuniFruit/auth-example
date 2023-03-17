<template>
    <form>

        <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
        <v-text-field name="password" label="Password" v-model="password" required></v-text-field>
        <v-text-field name="username" label="Username" v-show="!isLogin" required></v-text-field>

        <v-btn class="mr-4" @click="submit">
            {{ isLogin ? 'Login' : 'Create' }}
        </v-btn>
        <v-btn @click="clear">
            clear
        </v-btn>
    </form>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        isLogin: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            password: '',
            email: '',
            emailRules: [
                (v: string) => !!v || 'Email is required',
                (v: string) => /.+@.+/.test(v) || 'Email must be valid'
            ]
        }
    },
    methods: {
        submit() {
            this.$emit('onSubmit', {
                email: this.email,
                password: this.password
            })
        },
        clear() {
            this.password = '';
            this.email = ''
        }
    }
})
</script>