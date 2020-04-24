<template>
    <div>
        <simple-timer :secondsRemaining="secondsRemaining" />
        <simple-clock :secondsOverall="secondsOverall" />
        <control-buttons
            :running="this.running"
            @play="play"
            @pause="pause"
            @reset="reset"
        />

        <blind-display
            :secondsPerLevel="secondsPerLevel"
            :secondsRemaining="secondsRemaining"
            :currentLevel="currentLevel"
        />
        <stats-sidebar />
    </div>
</template>

<script>
// libraries
import DuckTimer from 'duck-timer'

// components
import SimpleTimer from '../components/SimpleTimer.vue'
import SimpleClock from '../components/SimpleClock.vue'
import ControlButtons from '../components/ControlButtons.vue'
import BlindDisplay from '../components/BlindDisplay.vue'
import StatsSidebar from '../components/StatsSidebar.vue'

export default {
    components: {
        SimpleTimer,
        SimpleClock,
        ControlButtons,
        BlindDisplay,
        StatsSidebar
    },
    data() {
        return {
            timer: {},
            secondsOverall: 0,
            secondsRemaining: 0,
            levelTime: 0,
            running: false,
            currentLevel: 0,
            bodyColors: ['red', 'green', 'yellow', 'blue', 'purple', 'orange']
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
                this.secondsRemaining = res.remain.seconds
            })

            this.timer.onTimeout(this.levelUp)
        },
        levelUp() {
            this.currentLevel++
            this.secondsRemaining = this.secondsPerLevel
            this.startTimer()
            this.setCurrentColor()
            this.alert()
        },
        startTimer() {
            this.initTimer()
            this.timer.start()
        },
        stopTimer() {
            this.timer.stop()
        },
        play() {
            this.running = true
            this.startTimer()
        },
        pause() {
            this.running = false
            this.timer.stop()
        },
        reset() {
            this.running = false
            this.currentLevel = 0
            this.secondsOverall = 0
            this.secondsRemaining = this.secondsPerLevel
            this.timer.reset()
        },
        setCurrentColor() {
            const currentColor = this.bodyColors[
                this.currentLevel % this.bodyColors.length
            ]
            document.querySelector('body').classList = currentColor
        },
        alert() {
            let alert = document.getElementById('alert-4')
            if (alert) alert.play()
        }
    },
    watch: {
        running(value) {
            localStorage.setItem('running', value)
        },
        secondsRemaining(value) {
            localStorage.setItem('secondsRemaining', value)
        },
        secondsOverall(value) {
            localStorage.setItem('secondsOverall', value)
        },
        currentLevel(value) {
            localStorage.setItem('currentLevel', value)
        }
    },
    computed: {
        secondsPerLevel() {
            return (this.levelTime * 60) / 10
        }
    },
    mounted() {
        this.running = false
        this.levelTime = JSON.parse(localStorage.getItem('levelTime'))
        this.currentLevel = JSON.parse(localStorage.getItem('currentLevel'))
        this.secondsOverall = JSON.parse(localStorage.getItem('secondsOverall'))
        this.secondsRemaining = JSON.parse(
            localStorage.getItem('secondsRemaining')
        )
        this.setCurrentColor()
    },
    destroyed() {
        if (this.running) {
            this.pause()
            localStorage.setItem('running', false)
        }
    }
}
</script>

<style lang="scss" scoped></style>
