<template>
    <div class="button-controller">
        <button class="button" @click="$emit('addEntry')">
            Add Player
        </button>
        <button class="button" @click="$emit('eliminatePlayer')">
            Eliminate Player
        </button>
        <button class="button is-small" @click="$emit('resetPlayers')">
            Reset Players
        </button>
    </div>
</template>

<style lang="scss" scoped>
.button-controller {
    margin: 0 auto;
    max-width: 60%;
}
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
