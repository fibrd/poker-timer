<template>
    <div>
        <button v-if="!running" @click.prevent="$emit('play')">play</button>
        <button v-if="running" @click.prevent="$emit('pause')">pause</button>
        <button v-if="!running" @click.prevent="reset">reset</button>
    </div>
</template>

<script>
export default {
    props: {
        running: {
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
