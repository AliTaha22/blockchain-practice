<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useBlogStore } from '../stores/blogs'


const blogs = ref([]);
const blogStore = useBlogStore();

onMounted(async () => {

    blogs.value = await blogStore.getHomePage();
    //if blogs data aren't loaded, call api to fetch blogs, else just fetch blogs from state array(blogs[]).
    if (blogStore.blogs.length === 0) {

        blogs.value = await blogStore.getHomePage();
    } else {

        blogs.value = blogStore.blogs
    }
});
</script>

<template>
    <div>
        <div class="blogs content ">
            <h2 class="text-info text-weight-medium">All Blogs</h2>
            <div v-if="blogs.length > 0">
                <div v-for="blog in blogs" :key="blog._id">
                    <router-link :to="'/blogs/' + blog._id" class="single">
                        <h3 class="title">{{ blog.title }}</h3>
                        <p>{{ blog.body }}</p>
                    </router-link>
                </div>
            </div>
            <div v-else>
                <p>There are no blogs to display...</p>
            </div>
        </div>
    </div>
</template>

<style lang="sass">

</style>
<!-- 
div {
    background-color: $red-5;
  } -->