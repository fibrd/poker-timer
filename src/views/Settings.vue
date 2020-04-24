<template>
    <div>
        <h1>SETTINGS PAGE</h1>
        <div class="container">
            <label>
                Minutes Per Level
                <input
                    type="number"
                    min="1"
                    max="180"
                    v-model.number="levelTime"
                />
            </label>
            <label>
                Starting Stack
                <input type="number" min="1" v-model.number="startingStack" />
            </label>
            <label>
                Buy-in
                <input type="number" min="1" v-model.number="buyin" />
            </label>
            <label>
                Entries
                <input
                    type="number"
                    min="1"
                    max="10000"
                    v-model.number="entries"
                />
            </label>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            levelTime: 10,
            startingStack: 20000,
            buyin: 200,
            entries: 10
        }
    },
    methods: {
        updateLevelTime(value) {
            if (value > 0) {
                localStorage.setItem('levelTime', value)
            }
        },
        updateStartingStack(value) {
            if (this.startingStack > 0) {
                localStorage.setItem('startingStack', value)
            }
        },
        updateBuyin(value) {
            if (this.buyin > 0) {
                localStorage.setItem('buyin', value)
            }
        },
        updateEntries(value) {
            if (this.buyin > 0) {
                localStorage.setItem('entries', value)
            }
        }
    },
    watch: {
        levelTime(value) {
            this.updateLevelTime(value)
        },
        startingStack(value) {
            this.updateStartingStack(value)
        },
        buyin(value) {
            this.updateBuyin(value)
        },
        entries(value) {
            this.updateEntries(value)
        }
    },
    created() {
        this.levelTime = +localStorage.getItem('levelTime')
        this.startingStack = +localStorage.getItem('startingStack')
        this.buyin = +localStorage.getItem('buyin')
        this.entries = +localStorage.getItem('entries')
    }
}
</script>

<style lang="scss" scoped></style>
