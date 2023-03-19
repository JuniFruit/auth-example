<template>
    <v-snackbar v-model="isOpen" :color="!!infoMessage ? 'success' : 'error'" top rounded="pill" elevation-14>
        {{ message || infoMessage }}
        <span class="text-caption" v-show="!!errorInfo.length" v-for="error in errorInfo" :key="error.param">{{ error.msg
        }}</span>
        <template v-slot:action="{ attrs }">
            <v-btn :timeout="4000" plain dark depressed v-bind="attrs" @click="clear">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue';
import { IErrorInfo } from '../../types/error.types'
export default Vue.extend({
    name: 'Toast',

    computed: {
        isOpen: {
            get() {
                return !!this.$store.getters.getErrMsg || !!this.$store.getters.getInfoMessage;
            },
            set() {
                this.$store.commit('setErrMsg', { errMessage: '' });
                this.$store.commit('setInfoMessage', { message: '' })
            }
        },
        message() {
            return this.$store.getters.getErrMsg;
        },
        infoMessage() {
            return this.$store.getters.getInfoMessage
        },
        errorInfo(): IErrorInfo[] {

            return this.$store.getters.errors;
        }
    },
    methods: {
        clear() {
            this.$store.commit('setErrMsg', { errMessage: '' });
            this.$store.commit('setInfoMessage', { message: '' })
        }
    }
})

</script>