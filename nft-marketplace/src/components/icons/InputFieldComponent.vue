<script setup>
import { ref, defineProps, watch, defineExpose } from 'vue'

const props = defineProps({

    inputType: String,
    pHolder: String,
    validate: Function

})

const value = ref('');
const errorMessage = ref('');
//const hasError = ref(false)

// watch(value, (newValue, oldValue) => {
//     const isValid = props.validate(value.value);
//     hasError.value = isValid;
// }, {deep: true})
const validateInput = () => {

    if (props.validate) {

        const isValid = props.validate(value.value);
        errorMessage.value = isValid ? '' : 'Invalid input.';
    }
}

//defineExpose({hasError})
defineExpose({ value, errorMessage });

</script>

<template>

    <div>
        <input :type="inputType" class="input-field" :placeholder="pHolder" v-model="value"  @input="validateInput"/>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>


</template>

<style scoped>
.input-field {

    display: block;
    margin-bottom: 10px;
    background-color: #2d2d2d;
    color: #ffffff;
    border: 1px solid #555;
    border-radius: 5px;
    padding: 10px;
    width: 200px;
    outline: none;
}

.input-field:focus {
    border-color: #00bfff;
    /* Border color on focus */
}

.error-message {
    color: red;
}
</style>
