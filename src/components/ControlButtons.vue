<template>
    <div>
        <button
            class="button"
            v-if="isPaused || notStarted"
            @click.prevent="$emit('play')"
        >
            Play
        </button>
        <button class="button" v-if="!isPaused" @click.prevent="$emit('pause')">
            Pause
        </button>
        <button
            class="button is-small"
            v-if="isPaused && !notStarted"
            @click.prevent="reset"
        >
            Reset timer
        </button>
    </div>
</template>

<script>
export default {
    props: {
        isPaused: {
            type: Boolean,
            required: true
        },
        notStarted: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        reset() {
            if (confirm('Are you sure?')) {
                this.$emit('reset')
            }
        }
    }
}
</script>
