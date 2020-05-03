<template>
    <div class="button-container">
        <button class="button" @click="$emit('addEntry')">
            Add Player
        </button>
        <button
            v-if="playersIn > 1"
            class="button"
            @click="$emit('eliminatePlayer')"
        >
            Eliminate Player
        </button>
        <button
            v-if="playersIn > 0"
            class="button is-small"
            @click="$emit('resetPlayers')"
        >
            Reset Players
        </button>
    </div>
</template>

<script>
export default {
    computed: {
        playersIn() {
            return this.$store.state.playersIn
        }
    }
}
</script>

<style lang="scss" scoped>
.button-container {
    margin: 0 auto;
    max-width: 60%;
}
</style>
