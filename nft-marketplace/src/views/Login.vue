<script setup>
import InputBox from '../components/icons/InputFieldComponent.vue'
import {  ref  } from 'vue';

//const emailInput = ref(null)
const loginError = ref('');
const usernameInput = ref(null);

const validateUsername = (value) => {
    const stringFormat = /^[^\d][^\s\W]+@[^\s@\W]+(\.[^\s@\W]+)+$/
  return stringFormat.test(value);
};

const login = () => {
   // console.log(emailInput.value.hasError);
    //checking validitiy



  const isUsernameValid = usernameInput.value.value;
  //console.log(isUsernameValid);


  if (!validateUsername(isUsernameValid)) {
    loginError.value = 'Invalid ID format';
    return;
  }
  else{
    alert('Login Successful');
  }
};


</script>

<template>
    <div>
        <!-- <InputBox inputType="text" pHolder= "Enter Username" :validate="validateUsername" ref="emailInput"></InputBox> -->
        <p>{{username}}</p>
        <InputBox inputType="text" pHolder= "Enter Username" :validate="validateUsername" ref="usernameInput"></InputBox>
        <InputBox inputType="password" pHolder= "Enter Password"></InputBox>

        <button class="button" @click="login">Login</button>
        <p v-if="loginError" class="error-message">{{ loginError }}</p>
    </div>
</template>

<style scoped>
.button {
  background-color: #274e77; 
  color: #ffffff; 
  border: none; 
  border-radius: 5px; 
  padding: 10px 20px; 
  font-size: 16px; 
  cursor: pointer; 
  transition: background-color 0.3s ease; 
}

.button:hover {
  background-color: #0056b3; 
}
.error-message {
    color: red;
}
</style>
