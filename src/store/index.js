import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        minutesPerLevel: 20,
        currentLevel: 0,
        secondsRemaining: 0,
        bodyColors: ['orange', 'green', 'yellow', 'blue', 'red'],
        startingStack: 20000,
        buyin: 10000,
        entries: 0,
        playersIn: 0
    },
    mutations: {
        SET_MINUTES_PER_LEVEL(state, minutesPerLevel) {
            state.minutesPerLevel = minutesPerLevel
        },
        SET_CURRENT_LEVEL(state, currentLevel) {
            state.currentLevel = currentLevel
        },
        SET_SECONDS_REMAINING(state, secondsRemaining) {
            state.secondsRemaining = secondsRemaining
        },
        SET_STARTING_STACK(state, startingStack) {
            state.startingStack = startingStack
        },
        SET_BUYIN(state, buyin) {
            state.buyin = buyin
        },
        SET_ENTRIES(state, entries) {
            state.entries = entries
        },
        SET_PLAYERS_IN(state, playersIn) {
            state.playersIn = playersIn
        },
        ADD_ENTRY(state) {
            state.entries++
            state.playersIn++
        },
        UNDO_ADD_ENTRY(state) {
            state.entries--
            state.playersIn--
        },
        ELIMINATE_PLAYER(state) {
            state.playersIn--
        },
        UNDO_ELIMINATE_PLAYER(state) {
            state.playersIn++
        }
    },
    actions: {
        setMinutesPerLevel({ commit }, minutesPerLevel) {
            commit('SET_MINUTES_PER_LEVEL', minutesPerLevel)
        },
        setCurrentLevel({ commit }, currentLevel) {
            commit('SET_CURRENT_LEVEL', currentLevel)
        },
        setSecondsRemaining({ commit }, secondsRemaining) {
            commit('SET_SECONDS_REMAINING', secondsRemaining)
        },
        setStartingStack({ commit }, startingStack) {
            commit('SET_STARTING_STACK', startingStack)
        },
        setBuyin({ commit }, buyin) {
            commit('SET_BUYIN', buyin)
        },
        setEntries({ commit }, entries) {
            commit('SET_ENTRIES', entries)
        },
        setPlayersIn({ commit }, playersIn) {
            commit('SET_PLAYERS_IN', playersIn)
        },
        addEntry({ commit }) {
            commit('ADD_ENTRY')
        },
        undoAddEntry({ commit }) {
            commit('UNDO_ADD_ENTRY')
        },
        eliminatePlayer({ commit }) {
            commit('ELIMINATE_PLAYER')
        },
        undoEliminatePlayer({ commit }) {
            commit('UNDO_ELIMINATE_PLAYER')
        }
    }
})
