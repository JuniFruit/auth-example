<template>
    <v-form ref="userForm" @submit.prevent="submit">

        <v-text-field v-model="email" ref="emailInput" :rules="isLogin ? [] : emailRules" label="E-mail"
            required></v-text-field>
        <v-text-field name="password" label="Password" type="password" v-model="password"
            :rules="isLogin ? [] : passwordRules" required></v-text-field>
        <v-text-field name="username" label="Username" v-show="!isLogin" required></v-text-field>

        <v-btn :loading="isLoading" class="mr-4 text-subtitle-1 text-capitalize" depressed color="primary" type="submit">
            {{ isLogin ? 'Login' : 'Create' }}
        </v-btn>

    </v-form>
</template>



<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'Form',
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
            ],
            passwordRules: [
                (v: string) => !!v || "Must be at least 6 characters",
                (v: string) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Must contain at least one number and one uppercase and lowercase letter',
            ]
        }
    },
    computed: {
        isLoading(): boolean {
            return !!this.$store.getters.getIsLoading
        }
    },
    methods: {
        submit() {
            //@ts-ignore
            if (!this.$refs?.userForm.validate()) return;
            this.$emit('onSubmit', {
                email: this.email,
                password: this.password
            })
        },
        focusEmail() {
            //@ts-ignore;
            this.$refs.emailInput?.focus()
        }

    },
    mounted() {
        this.focusEmail()
    }

})
</script>