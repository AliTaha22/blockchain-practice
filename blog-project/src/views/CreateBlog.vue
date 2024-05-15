<script setup>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { useBlogStore } from '../stores/blogs'

const blogStore = useBlogStore();
const myForm = ref(null)

const formData = ref({
    title: '',
    snippet: '',
    body: ''
})
const createBlog = async () => {

    myForm.value.validate().then(async (success) => {   //validates the form based on their rules.

        if (success) {
            await blogStore.createBlog(formData.value)

            myForm.value.reset();//reset all form values

        } else {
            console.log('invalid credentials')
        }
    })
}

const onReset = () => {

    formData.value = {
        title: '',
        snippet: '',
        body: ''
    };
}
</script>
<template>
    <div class="q-pa-md" style="max-width: 400px">

        <h2 class="text-info text-weight-medium text-center">Create a Blog</h2>
        <q-form @submit="createBlog" @reset="onReset" class="q-gutter-md" ref="myForm" :greedy="true">

            <q-input filled v-model="formData.title" label="Blog Title *"
                :rules="[val => val && val.length > 0 || 'Please type something']" />

            <q-input filled v-model="formData.snippet" label="Blog Snippet *"
                :rules="[val => val && val.length > 0 || 'Please type something']" />

            <q-input filled v-model="formData.body" label="Blog Body *"
                :rules="[val => val && val.length > 0 || 'Please type something']" />

            <div>
                <q-btn label="Submit" type="submit" color="primary" />
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>

        </q-form>

    </div>
</template>



<style scoped></style>

<!-- <script setup>
import axios from 'axios'
import { ref } from 'vue'
import { useBlogStore } from '../stores/blogs'



const blogStore = useBlogStore();
const formData = ref({
    title: '',
    snippet: '',
    body: ''
})
const createBlog = async () => {

    await blogStore.createBlog(formData.value)

    formData.value = {
        title: '',
        snippet: '',
        body: ''
    };
}

</script> -->

<!-- <template>

    <div class="create-blog content">
        <form @submit.prevent="createBlog">
            <label for="title">Blog title:</label>
            <input type="text" v-model="formData.title" required>
            <label for="snippet">Blog snippet:</label>
            <input type="text" v-model="formData.snippet" required>
            <label for="body">Blog body:</label>
            <textarea id="body" v-model="formData.body" required></textarea>
            <button>Submit</button>
        </form>
    </div>
</template> -->
