<template>
        <small v-if="label">{{ label }}</small>
        <input :type="type" class="block p-2 text-black border-border border-2 rounded-xl focus:outline-2 focus:outline-accent"></input>
</template>

<script lang="ts">
import { PropType } from 'vue';
import type { InputTypeHTMLAttribute } from 'vue';
export default {
    props: {
        type: {
            type: String as PropType<InputTypeHTMLAttribute>,
            required: false,
            default: 'text',
        },
        label: {
            type: String,
            required: false,
        },
    }
}
</script>
