<template>
    <div>
        <svg :height="svgHeight" :width="svgHeight">
            <circle
                class="progress"
                cx="50%"
                cy="50%"
                :r="radius"
                stroke="currentColor"
            ></circle>
        </svg>
        <simple-timer :style="{ top: -svgHeight * 0.6 + 'px' }" />
    </div>
</template>

<script>
import SimpleTimer from '@/components/SimpleTimer.vue'
export default {
    components: {
        SimpleTimer
    },
    data() {
        return {
            svgHeight: 160,
            radius: 60
        }
    },
    computed: {
        secondsPerLevel() {
            return this.$store.state.minutesPerLevel * 60
        },
        secondsRemaining() {
            return this.$store.state.secondsRemaining
        },
        ratio() {
            return this.secondsRemaining / this.secondsPerLevel
        }
    },
    watch: {
        ratio(value) {
            const progress = document.querySelector('.progress')
            const pathLength = Math.PI * 2 * progress.getAttribute('r')
            progress.style.strokeDashoffset = pathLength * value + 'px'
        }
    },
    mounted() {
        const progress = document.querySelector('.progress')
        const pathLength = Math.PI * 2 * progress.getAttribute('r')

        progress.style.strokeDasharray = pathLength + 'px'
        progress.style.strokeDashoffset = pathLength + 'px'
    }
}
</script>

<style lang="scss" scoped>
svg {
    transform: rotate(-90deg);
    margin: 0 auto;
}

svg circle {
    fill: none;
    stroke-width: 4;
}

.progress {
    transition: stroke-dashoffset 1s linear;
}

.timer {
    position: relative;
    font-size: 1.4em;
}
</style>
