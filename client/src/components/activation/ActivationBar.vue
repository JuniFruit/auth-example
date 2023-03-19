<template>
    <v-alert :icon="false" :close-label="'Close the alert'" v-show="isOpen" text class="alert_container" type="warning"
        :dismissible="true" transition="slide-y-reverse-transition">
        <v-container justify-center>
            <v-row :align="'center'">
                <v-col>
                    <h3 class="text-left text-secondary font-weight-medium">Your account is not activated, please check
                        your
                        email
                        and follow
                        the instructions to activate
                        the account
                    </h3>
                    <v-spacer></v-spacer>


                </v-col>
                <v-btn :loading="isLoading" @click="resend" :ripple="false" plain color="black lighten-1" dark>Resend
                    Email</v-btn>

            </v-row>
        </v-container>
    </v-alert>
</template>

<script lang="ts">
import Vue from 'vue';


export default Vue.extend({
    name: 'ActivationBar',

    computed: {
        isOpen() {
            return !!this.$store.getters.getUser?.isActivated === false && this.$store.getters.getIsLoggedIn === true
        },
        isLoading() {
            return this.$store.getters.getIsLoading
        }

    },
    methods: {
        resend() {
            this.$store.dispatch('resendMail');
        }
    }
})
</script>
<style lang="scss">
@import './Activation.scss';
</style>