<template>
    <div>
        <button v-if="isPaused" @click.prevent="$emit('play')">Play</button>
        <button v-if="!isPaused" @click.prevent="$emit('pause')">Pause</button>
        <button v-if="isPaused" @click.prevent="reset">Time reset</button>
    </div>
</template>

<script>
export default {
    props: {
        isPaused: {
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

<style lang="scss" scoped></style>
