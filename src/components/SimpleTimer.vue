<template>
    <div class="timer">{{ showtime }}</div>
</template>

<script>
export default {
    computed: {
        secondsRemaining() {
            return this.$store.state.secondsRemaining
        },
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
            let showtime =
                this.hours === 0
                    ? ''
                    : this.hours < 10
                    ? `0${this.hours} : `
                    : `${this.hours} : `
            showtime += this.mins < 10 ? '0' : ''
            showtime += this.mins + ' : '
            showtime += this.secs < 10 ? '0' : ''
            showtime += this.secs
            return showtime
        }
    }
}
</script>

<style lang="scss" scoped></style>
