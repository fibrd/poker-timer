<template>
    <div>
        <button @click="$emit('addEntry')">Add Player</button>
        <button @click="$emit('eliminatePlayer')">Eliminate Player</button>
        <button @click="$emit('resetPlayers')">Reset Players</button>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
