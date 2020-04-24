<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/settings">Settings</router-link>
        </div>
        <router-view />

        <audio id="alert-4" :src="require('./assets/alert4.mp3')"></audio>
    </div>
</template>

<style src="./assets/scss/main.scss" lang="scss"></style>
