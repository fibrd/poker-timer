<template>
    <div>
        <button class="button" v-if="isPaused" @click.prevent="$emit('play')">
            Play
        </button>
        <button class="button" v-if="!isPaused" @click.prevent="$emit('pause')">
            Pause
        </button>
        <button class="button is-small" v-if="isPaused" @click.prevent="reset">
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

<style lang="scss" scoped>
.button {
    background: none;
    border: currentColor 1px solid;
    color: inherit;
    display: block;
    margin: 1em auto;

    &:hover,
    &:focus {
        background-color: rgba(225, 225, 225, 0.2);
    }
}
</style>
