<template>
    <div>
        <h1>SETTINGS PAGE</h1>
        <div class="stats-container">
            <h4>
                <label for="minutesPerLevel">
                    Minutes Per Level:
                </label>
            </h4>
            <input
                id="minutesPerLevel"
                type="number"
                min="1"
                max="180"
                v-model.number="minutesPerLevel"
            />

            <h4>
                <label for="startingStack">
                    Starting Stack:
                </label>
            </h4>
            <input
                id="startingStack"
                type="number"
                min="1"
                max="100000"
                v-model.number="startingStack"
            />

            <h4>
                <label for="buyin">
                    Buy-in:
                </label>
            </h4>
            <input id="buyin" type="number" min="1" v-model.number="buyin" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            minutesPerLevel: 0,
            startingStack: 0,
            buyin: 0,
            entries: 0
        }
    },
    methods: {
        loadStore() {
            this.minutesPerLevel = this.$store.state.minutesPerLevel
            this.startingStack = this.$store.state.startingStack
            this.buyin = this.$store.state.buyin
            this.entries = this.$store.state.entries
        },
        storeData() {
            this.storeItem(
                'minutesPerLevel',
                'setMinutesPerLevel',
                this.minutesPerLevel
            )
            this.storeItem(
                'startingStack',
                'setStartingStack',
                this.startingStack
            )
            this.storeItem('buyin', 'setBuyin', this.buyin)
            this.storeItem('entries', 'setEntries', this.entries)
        },
        storeItem(item, action, value) {
            if (value > 0) {
                localStorage.setItem(item, value)
                this.$store.dispatch(action, value)
            }
        }
    },
    created() {
        this.loadStore()
    },
    beforeDestroy() {
        this.storeData()
    }
}
</script>

<style lang="scss" scoped>
h4 {
    margin: 0.6em auto;
}

input {
    color: inherit;
    background-color: inherit;
    margin-bottom: 2em;
    font-size: 1.2em;
    max-width: 6em;
    text-align: center;
    padding: 0.4em;
    border: currentColor 1px solid;
}

.stats-container {
    margin-top: 3em;
}
</style>
