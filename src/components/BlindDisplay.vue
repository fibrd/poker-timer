<template>
    <div class="row">
        <div class=" col-md-8">
            <div class="blind-level" v-if="currentLevel < blinds.length">
                {{ blinds[currentLevel].SB }} /
                {{ blinds[currentLevel].BB }}
            </div>
            <div class="blind-level-finished" v-else>
                GAME OVER
            </div>
            <orbit-countdown
                :secondsRemaining="secondsRemaining"
                :secondsPerLevel="secondsPerLevel"
            />
        </div>

        <aside class="col-md-4">
            <article>
                <header>Blind Structure:</header>
                <main class="blind-structure">
                    <ol class="blind-list">
                        <li
                            v-for="(blind, index) in blinds"
                            :class="{ strong: index === currentLevel }"
                            :key="index"
                        >
                            {{ blind.SB }} / {{ blind.BB }}
                        </li>
                    </ol>
                </main>
            </article>
        </aside>
    </div>
</template>

<script>
import OrbitCountdown from './OrbitCountdown.vue'
export default {
    components: {
        OrbitCountdown
    },
    props: {
        currentLevel: {
            type: Number,
            default: 0
        },
        secondsRemaining: {
            type: Number,
            required: true
        },
        secondsPerLevel: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            blinds: [
                {
                    SB: 100,
                    BB: 200
                },
                {
                    SB: 200,
                    BB: 400
                },
                {
                    SB: 300,
                    BB: 600
                },
                {
                    SB: 400,
                    BB: 800
                },
                {
                    SB: 500,
                    BB: 1000
                },
                {
                    SB: 600,
                    BB: 1200
                },
                {
                    SB: 800,
                    BB: 1600
                },
                {
                    SB: 1000,
                    BB: 2000
                },
                {
                    SB: 1200,
                    BB: 2400
                },
                {
                    SB: 1400,
                    BB: 2800
                },
                {
                    SB: 1600,
                    BB: 3200
                },
                {
                    SB: 1800,
                    BB: 3600
                },
                {
                    SB: 2000,
                    BB: 4000
                },
                {
                    SB: 2400,
                    BB: 4800
                },
                {
                    SB: 2800,
                    BB: 5600
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.strong {
    font-weight: bold;
    font-size: 1.4em;
}
</style>
