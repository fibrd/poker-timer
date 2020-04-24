<template>
    <aside class="sidebar">
        <ul class="stats-list">
            <li class="stats-item">Starting stack: {{ startingStack }}</li>
            <li class="stats-item">Average stack: {{ averageStack }}</li>
            <li class="stats-item">Players: {{ playersRatio }}</li>
            <li class="stats-item">Total entries: {{ entries }}</li>
            <li class="stats-item">Total chipcount: {{ totalChipcount }}</li>
            <li class="stats-item">Prizepool: {{ prizepool }}</li>
            <li class="stats-item">Buy-in: {{ buyin }}</li>
        </ul>
        <ol class="payout-list">
            <li v-for="(payout, index) in payouts" :key="index">
                {{ payout }}
            </li>
        </ol>
    </aside>
</template>

<script>
export default {
    data() {
        return {
            startingStack: 0,
            entries: 12,
            playersTotal: 10,
            playersIn: 8,
            buyin: 200,
            payoutStructure: [
                {
                    upToPlayers: 5,
                    payouts: [1]
                },
                {
                    upToPlayers: 8,
                    payouts: [0.75, 0.25]
                },
                {
                    upToPlayers: 12,
                    payouts: [0.55, 0.3, 0.15]
                },
                {
                    upToPlayers: 18,
                    payouts: [0.46, 0.28, 0.16, 0.1]
                },
                {
                    upToPlayers: 26,
                    payouts: [0.4, 0.25, 0.15, 0.12, 0.08]
                },
                {
                    upToPlayers: Math.pow(10, 1000), // max positive number
                    payouts: [0.4, 0.25, 0.15, 0.1, 0.06, 0.04]
                }
            ],
            payouts: []
        }
    },
    computed: {
        totalChipcount() {
            return this.startingStack * this.entries
        },
        averageStack() {
            return Math.round(this.totalChipcount / this.playersIn)
        },
        playersRatio() {
            return this.playersIn + ' / ' + this.playersTotal
        },
        reenties() {
            return this.entries - this.playersTotal
        },
        prizepool() {
            return this.entries * this.buyin
        }
    },
    methods: {
        setPayout(playersCount) {
            let structure = this.payoutStructure.find(
                item => item.upToPlayers >= playersCount
            )

            this.payouts = structure.payouts.map(
                item => Math.round((item * this.prizepool) / 10) * 10
            )
        }
    },
    mounted() {
        this.playersTotal = localStorage.getItem('playersTotal')
        this.playersIn = localStorage.getItem('playersIn')
        this.startingStack = localStorage.getItem('startingStack')
        this.buyin = localStorage.getItem('buyin')
        this.entries = localStorage.getItem('entries')
        this.setPayout(this.entries)
    }
}
</script>

<style lang="scss" scoped></style>
