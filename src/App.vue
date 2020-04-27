<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/settings">Settings</router-link>
        </div>
        <router-view />

        <audio id="alert-up" :src="require('./assets/alertUp.mp3')"></audio>
        <audio id="alert-win" :src="require('./assets/alertWin.mp3')"></audio>
    </div>
</template>

<style src="./assets/scss/main.scss" lang="scss"></style>
