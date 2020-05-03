<template>
    <div class="sidebar">
        <player-buttons
            v-if="!gameOver"
            @addEntry="addEntry"
            @eliminatePlayer="eliminatePlayer"
            @resetPlayers="resetPlayers"
        />

        <table>
            <tbody>
                <tr>
                    <th>Buyin:</th>
                    <td>{{ buyin }}</td>
                </tr>
                <tr>
                    <th>Starting Stack:</th>
                    <td>{{ startingStack }}</td>
                </tr>
                <tr>
                    <th>Average Stack:</th>
                    <td>{{ averageStack }}</td>
                </tr>
                <tr>
                    <th>Total Chipcount:</th>
                    <td>{{ totalChipcount }}</td>
                </tr>
                <tr>
                    <th>Players:</th>
                    <td>{{ showPlayersRatio }}</td>
                </tr>
                <tr>
                    <th>Prizepool:</th>
                    <td>{{ prizepool }}</td>
                </tr>
            </tbody>
        </table>

        <section class="payouts">
            <h2>Payouts:</h2>
            <ol class="payout-list">
                <li v-for="(payout, index) in payouts" :key="index">
                    {{ payout }}
                </li>
            </ol>
        </section>
    </div>
</template>

<script>
import PlayerButtons from '@/components/PlayerButtons.vue'
export default {
    components: {
        PlayerButtons
    },
    data() {
        return {
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
        startingStack() {
            return this.$store.state.startingStack
        },
        entries() {
            return this.$store.state.entries
        },
        playersIn() {
            return this.$store.state.playersIn
        },
        buyin() {
            return this.$store.state.buyin
        },
        totalChipcount() {
            return this.startingStack * this.entries
        },
        averageStack() {
            return Math.round(this.totalChipcount / this.playersIn)
        },
        prizepool() {
            return this.entries * this.buyin
        },
        showPlayersRatio() {
            return this.playersIn + ' / ' + this.entries
        },
        gameOver() {
            return this.$store.state.gameOver
        }
    },
    methods: {
        addEntry() {
            this.$store.dispatch('addEntry')
        },
        eliminatePlayer() {
            if (this.playersIn > 1) this.$store.dispatch('eliminatePlayer')
        },
        resetPlayers() {
            if (confirm('Are you sure?')) {
                this.$store.dispatch('setEntries', 0)
                this.$store.dispatch('setPlayersIn', 0)
                this.$emit('stopTimer')
            }
        },
        setPayout(entries) {
            let structure = this.payoutStructure.find(
                item => item.upToPlayers >= entries
            )

            this.payouts = structure.payouts.map(
                item => Math.round((item * this.prizepool) / 10) * 10
            )
        }
    },
    watch: {
        entries(value) {
            this.setPayout(value)
            localStorage.setItem('entries', value)
        },
        playersIn(value) {
            localStorage.setItem('playersIn', value)
        }
    },
    mounted() {
        this.setPayout(this.entries)
    }
}
</script>

<style lang="scss" scoped>
ul,
ol {
    width: 25%;
    max-width: 5em;
    margin: 0 auto;

    li {
        padding-left: 1em;
    }
}

h4 {
    margin-bottom: 1em;
}

table {
    background-color: inherit;
    margin: 3em auto;
    text-align: center;
    border-collapse: inherit;
    border-spacing: 20px 5px;

    border: currentColor 1px dotted;
    padding: 0.5em 0.8em;
    th,
    td {
        color: inherit;
        margin: 0.5em;
        border: none;
        white-space: nowrap;
    }
}
</style>
