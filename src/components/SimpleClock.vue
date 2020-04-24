<template>
    <div class="clock" v-show="secondsOverall">
        <strong>Total time: </strong>{{ showtime }}
    </div>
</template>

<script>
export default {
    props: {
        secondsOverall: {
            type: Number,
            default: 0,
            required: true
        }
    },
    computed: {
        hours() {
            return Math.floor(Math.floor(this.secondsOverall / 60) / 60)
        },
        mins() {
            return Math.floor(this.secondsOverall / 60) % 60
        },
        secs() {
            return this.secondsOverall % 60
        },
        showtime() {
            return this.hours + ' : ' + this.mins + ' : ' + this.secs
        }
    }
}
</script>
