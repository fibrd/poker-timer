<template>
    <div class="main-container columns">
        <div class="column is-6">
            <game-over-notice v-if="gameOver" />
            <control-buttons
                v-else
                :isPaused="isPaused"
                :notStarted="notStarted"
                @play="startTimer"
                @pause="stopTimer"
                @reset="resetTimer"
            />

            <blind-display />
        </div>
        <stats-sidebar @stopTimer="stopTimer" class="column is-6" />
    </div>
</template>

<script>
// libraries
import DuckTimer from 'duck-timer'

// components
import ControlButtons from '../components/ControlButtons.vue'
import BlindDisplay from '../components/BlindDisplay.vue'
import StatsSidebar from '../components/StatsSidebar.vue'
import GameOverNotice from '../components/GameOverNotice.vue'

export default {
    components: {
        ControlButtons,
        BlindDisplay,
        StatsSidebar,
        GameOverNotice
    },
    data() {
        return {
            timer: {}
        }
    },
    methods: {
        initTimer() {
            this.timer = new DuckTimer({
                setTime: (this.secondsPerLevel - this.secondsRemaining) * 1000,
                interval: 1000,
                timeout: this.secondsPerLevel * 1000
            })
            this.timer.onInterval(res => {
                this.$store.dispatch('setSecondsRemaining', res.remain.seconds)
            })

            this.timer.onTimeout(this.levelUp)
        },
        levelUp() {
            this.$store.dispatch('setCurrentLevel', this.currentLevel + 1)
            this.$store.dispatch('setSecondsRemaining', this.secondsPerLevel)
            this.startTimer()
            this.setCurrentColor()
            this.alertUp()
        },
        startTimer() {
            if (this.playersIn > 1) {
                this.initTimer()
                this.timer.start()
            } else {
                alert('More players needed to start!')
            }
        },
        stopTimer() {
            if (this.timer.clock) this.timer.stop()
        },
        resetTimer() {
            this.$store.dispatch('setCurrentLevel', 0)
            this.$store.dispatch('setSecondsRemaining', this.secondsPerLevel)
            this.setCurrentColor()
            if (this.timer.clock) {
                this.timer.reset()
                this.timer = {}
            }
        },
        setCurrentColor() {
            const currentColor = this.bodyColors[
                this.currentLevel % this.bodyColors.length
            ]
            document.querySelector('body').classList = currentColor
        },
        alertUp() {
            let alert = document.getElementById('alert-up')
            if (alert) alert.play()
        },
        alertWin() {
            let alert = document.getElementById('alert-win')
            if (alert) alert.play()
        },
        loadStorageData() {
            const data = {
                minutesPerLevel: 0,
                currentLevel: 0,
                secondsRemaining: 0,
                startingStack: 0,
                buyin: 0,
                entries: 0,
                playersIn: 0
            }

            for (const key in data) {
                data[key] = JSON.parse(localStorage.getItem(key))
            }
            const {
                minutesPerLevel,
                currentLevel,
                secondsRemaining,
                startingStack,
                buyin,
                entries,
                playersIn
            } = data

            if (currentLevel != null)
                this.$store.dispatch('setCurrentLevel', currentLevel)
            if (minutesPerLevel != null)
                this.$store.dispatch('setMinutesPerLevel', minutesPerLevel)
            if (startingStack != null)
                this.$store.dispatch('setStartingStack', startingStack)
            if (buyin != null) this.$store.dispatch('setBuyin', buyin)
            if (entries != null) this.$store.dispatch('setEntries', entries)
            if (playersIn != null)
                this.$store.dispatch('setPlayersIn', playersIn)

            this.$store.dispatch(
                'setSecondsRemaining',
                secondsRemaining != 0 && secondsRemaining != null
                    ? secondsRemaining
                    : this.minutesPerLevel * 60
            )
        },
        saveDataToStorage() {
            localStorage.setItem(
                'currentLevel',
                this.gameOver ? 0 : this.currentLevel
            )
            localStorage.setItem(
                'secondsRemaining',
                this.gameOver ? 0 : this.secondsRemaining
            )
        }
    },
    computed: {
        notStarted() {
            return this.timer.clock === undefined
        },
        isPaused() {
            return this.timer.isPaused || this.notStarted
        },
        minutesPerLevel() {
            return this.$store.state.minutesPerLevel
        },
        currentLevel() {
            return this.$store.state.currentLevel
        },
        secondsRemaining() {
            return this.$store.state.secondsRemaining < this.secondsPerLevel
                ? this.$store.state.secondsRemaining
                : this.secondsPerLevel
        },
        secondsPerLevel() {
            return this.minutesPerLevel * 60
        },
        bodyColors() {
            return this.$store.state.bodyColors
        },
        playersIn() {
            return this.$store.state.playersIn
        },
        gameOver() {
            return this.$store.state.gameOver
        }
    },
    watch: {
        gameOver() {
            this.alertWin()
            if (this.timer.clock) this.timer.stop()
        }
    },
    created() {
        this.loadStorageData()
        window.addEventListener('beforeunload', this.saveDataToStorage)
        this.setCurrentColor()
    },
    beforeDestroy() {
        this.saveDataToStorage()
        if (this.timer.clock) this.timer.stop()
    }
}
</script>

<style lang="scss" scoped>
.main-container {
    margin: 0 auto;
    max-width: 40em;
}
</style>
