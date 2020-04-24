<template>
    <div>
        <svg height="200" width="200">
            <circle
                class="progress"
                cx="50%"
                cy="50%"
                r="20"
                stroke="currentColor"
            ></circle>
        </svg>
    </div>
</template>

<script>
export default {
    props: {
        secondsRemaining: {
            type: Number,
            required: true
        },
        secondsPerLevel: {
            type: Number,
            required: true
        }
    },
    computed: {
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
    width: 10%;
    margin: 0 auto;
}

svg circle {
    fill: none;
    stroke-width: 2;
}

.progress {
    transition: stroke-dashoffset 1s linear;
}
</style>
