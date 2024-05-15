<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router';
import { useBlogStore } from '../stores/blogs'


const blogStore = useBlogStore();
const route = useRoute();
const router = useRouter();
const blogData = ref({})


onMounted(async () => {
    blogData.value = blogStore.getBlogById(route.params.id)
})

</script>

<template>
    <div class="details content">
        <h2>
            {{ blogData.title }}
        </h2>
        <div class="content">
            <p>
                {{ blogData.body }}
            </p>
        </div>
        <button class="delete" @click="blogStore.deleteBlog(blogData._id, router)">delete</button>
    </div>

</template>

<style scoped></style>