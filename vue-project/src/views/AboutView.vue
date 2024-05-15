<script setup>
import ABOUT from '../components/AboutPage.vue'
import { ref } from 'vue'

let Arr = [
  "Cat",
  "Dog",
  "Mice",
  "Micee",
  "Miceeee",
  "Miceeeeee",
  "Hel"

]
const checkedNames = ref([]);

</script>


<template>
  <div class="about">
    <h1>This is an about page</h1>
    

    <!-- <ol>
      <li v-for="(x, index ) in Arr"> Animal {{ index }} {{ x }}</li>
    </ol> -->

    <ABOUT ></ABOUT>

  </div>

  <!-- <div>Checked names: {{ checkedNames }}</div>

  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
  <label for="jack">Jack</label>

  <input type="checkbox" id="john" value="John" v-model="checkedNames" />
  <label for="john">John</label>

  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
  <label for="mike">Mike</label> -->

</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    margin: 10px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: start;
  }

}
</style>
