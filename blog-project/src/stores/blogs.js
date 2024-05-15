import { defineStore } from 'pinia'
import axios from 'axios'
import { axiosNodeClient } from '@/axios';

export const useBlogStore = defineStore('blog', {
  state: () => ({

    blogs: [],


  }),
  getters: {

    getBlogById: (state) => (blogId) => {

      return state.blogs.find(blog => blog._id === blogId);

    }

  },
  actions: {

    async getHomePage() {
      try {
        const response = await axiosNodeClient.get("/blogs");
        // const response = await axios.get('http://127.0.0.1:3000/blogs', { headers: { 'x-api-key': "ABCDEFGHIJKLMNOPQRSTUVWXYZ" } });
        this.blogs = response.data
        return response.data;

      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    },
    async deleteBlog(blogId, router) {

      await axiosNodeClient.delete(`/blogs/${blogId}`);
      this.blogs = this.blogs.filter(blog => blog._id !== blogId);
      router.push('/');
    },
    async createBlog(formData) {

      await axios.post('http://127.0.0.1:3000/blogs/submit-form',
        formData,
        { headers: { 'x-api-key': "ABCDEFGHIJKLMNOPQRSTUVWXYZ" } })

    }



  },
  persist: true,  //it keeps the webpage content stored inside device i.e. refreshing webpage will not remove its content.
});