<script setup>
import { ref, computed, reactive } from 'vue'

// Define a reactive property to control the visibility of the <h1> tag
let isVisible = ref(true) // Change true to false if you want to hide the <h1> tag initially
const count = ref(0); // reactive state variable.
const person = ref({    //reactive but an object
    firstName: "John",
    lastName: "Doe",
    subjects: [
        'english',
        'urdu',
        'maths',
        'english_2'
    ]
});

const myObject = ref({
    title: 'How to do lists in Vue',
    author: 'Jane Doe',
    publishedAt: '2016-04-10'
})

// const arr = [
//     myObject.value,
//     myObject.value
// ]

const classesObj = {
    myStyle: true,
    class: "myStyle"
}

//console.log(arr);

const incrementCount = () => {
    count.value++;

}
const toggleVisibility = (event) => {
    alert(`toggleInivisibility Initiated`);
    isVisible.value = false;
    alert(event);
}
const link = () => {

    return 'https://vuejs.org';
}
// const countSubjects = computed(() => {
//     return person.subjects.length > 0 ? person.subjects.length : 'Zero';
// })


</script>

<template>
    <div >
        <button :class="classesObj" @click="incrementCount"> {{ "Count is: " + count }}</button>

        <button class="myStyle2" v-show="isVisible" @click="toggleVisibility"> BUTTON</button>

    </div>

    {{ isVisible }} <!-- isVisible.value doesnt work inside template -->
    <!-- <div>

        <p>Name:{{ person.firstName }}</p>
        <span class="spanStyle"> Subjects: {{ countSubjects }}</span>
    </div>


    <ul>
        <li v-for="(value, key, index) in myObject" :key="key">
            {{ key }} {{value}} {{ index }}
        </li>
    </ul> -->
</template>




<style scoped>

@media (min-width: 1024px) {
  .about {
    margin: 10px;
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

}
.myStyle {
    /* Background color */
    background-color: #5e0303;

    /* Text color */
    color: white;

    /* Padding */
    padding: 10px 20px;

    /* Border */
    border: none;
    border-radius: 5px;

    /* Cursor style */
    cursor: pointer;

    /* Hover effect */
    transition: background-color 0.3s ease;
}

.myStyle2 {
    background-color: rgb(103, 103, 199);
    color: white;
    size: 16px;
    padding: 10px 20px;
    border-radius: 15px;

}

.spanStyle {
    color: red;
}

/* Hover effect */
.myStyle:hover {
    background-color: #933c3c;
    /* Darker green */
}

.myStyle2:hover {
    background-color: #4810ca;
    /* Darker green */
}
</style>