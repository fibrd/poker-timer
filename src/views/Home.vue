<template>
    <div>
        <game-over-notice v-if="gameOver" />
        <control-buttons
            v-if="!gameOver"
            :isPaused="isPaused"
            @play="startTimer"
            @pause="stopTimer"
            @reset="reset"
        />

        <blind-display />
        <stats-sidebar />
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
            this.timer.stop()
        },
        reset() {
            this.$store.dispatch('setCurrentLevel', 0)
            this.$store.dispatch('setSecondsRemaining', this.secondsPerLevel)
            if (this.timer.clock) {
                this.timer.reset()
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
            const minutesPerLevel = JSON.parse(
                localStorage.getItem('minutesPerLevel')
            )
            const currentLevel = JSON.parse(
                localStorage.getItem('currentLevel')
            )
            const secondsRemaining = JSON.parse(
                localStorage.getItem('secondsRemaining')
            )
            const startingStack = JSON.parse(
                localStorage.getItem('startingStack')
            )
            const buyin = JSON.parse(localStorage.getItem('buyin'))
            const entries = JSON.parse(localStorage.getItem('entries'))
            const playersIn = JSON.parse(localStorage.getItem('playersIn'))

            if (minutesPerLevel != null)
                this.$store.dispatch('setMinutesPerLevel', minutesPerLevel)
            if (currentLevel != null)
                this.$store.dispatch('setCurrentLevel', currentLevel)
            if (secondsRemaining != null)
                this.$store.dispatch('setSecondsRemaining', secondsRemaining)
            if (startingStack != null)
                this.$store.dispatch('setStartingStack', startingStack)
            if (buyin != null) this.$store.dispatch('setBuyin', buyin)
            if (entries != null) this.$store.dispatch('setEntries', entries)
            if (playersIn != null)
                this.$store.dispatch('setPlayersIn', playersIn)
        },
        saveDataToStorage() {
            localStorage.setItem('currentLevel', this.currentLevel)
            localStorage.setItem('secondsRemaining', this.secondsRemaining)
        }
    },
    computed: {
        isPaused() {
            if (this.timer.isPaused || this.timer.isPaused === undefined) {
                return true
            } else {
                return false
            }
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
        gameOver() {
            return this.$store.state.gameOver
        },
        playersIn() {
            return this.$store.state.playersIn
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
    },
    mounted() {
        this.setCurrentColor()
    },
    beforeDestroy() {
        this.saveDataToStorage()
        if (this.timer.clock) this.timer.stop()
    }
}
</script>

<style lang="scss" scoped></style>
