<template>
    <div class="timer">{{ showtime }}</div>
</template>

<script>
export default {
    props: {
        secondsRemaining: {
            type: Number,
            required: true
        }
    },
    computed: {
        hours() {
            return Math.floor(Math.floor(this.secondsRemaining / 60) / 60)
        },
        mins() {
            return Math.floor(this.secondsRemaining / 60) % 60
        },
        secs() {
            return this.secondsRemaining % 60
        },
        showtime() {
            let showtime = this.hours > 0 ? this.hours + ' : ' : ''
            showtime += this.mins + ' : ' + this.secs
            return showtime
        }
    }
}
</script>

<style lang="scss" scoped></style>
