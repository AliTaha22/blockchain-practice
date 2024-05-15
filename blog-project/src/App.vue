<script setup>
import { RouterView } from 'vue-router';
import NavBar from './components/NavMenu.vue'
import Footer from './components/Footer.vue';
</script>

<template>
  <NavBar />
  <RouterView></RouterView>
  <Footer />

</template>

<style scoped></style>
