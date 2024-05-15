<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';



const router = useRouter();
const currentTab = ref('blogs');

</script>

<template>
    <div>
        <router-link to="/">
            <h1 class="text-h1 text-weight-bold text-primary">Blog Ninja</h1>
        </router-link>
        <p class="text-primary">A Net Ninja Site</p>
    </div>

    <div class="q-pa-md">
        <div class="q-gutter-y-md">
            <q-card>
                <q-tabs v-model="currentTab" dense class="text-grey" active-color="primary" indicator-color="primary"
                    align="justify" narrow-indicator>

                    <q-route-tab name="blogs" to="/">Blogs</q-route-tab>
                    <q-route-tab name="about" to="/about">About</q-route-tab>
                    <q-route-tab name="create-blog" to="/create-blog">Create Blog</q-route-tab>

                </q-tabs>

                <q-separator />
                <!-- <q-tab-panels v-model="currentTab" animated>

                    <q-tab-panel name="blogs">
                        <router-view></router-view>
                    </q-tab-panel>

                    <q-tab-panel name="about">
                        <router-view></router-view>
                    </q-tab-panel>

                    <q-tab-panel name="create-blog">
                        <div class="text-h6">Create Blog</div>
                        <router-view></router-view>
                    </q-tab-panel>

                </q-tab-panels> -->
            </q-card>
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>


<!-- <template>
    <nav>
        <div class="site-title">

            <router-link to="/">
                <h1>Blog Ninja</h1>
            </router-link>
            <p>A Net Ninja Site</p>
        </div>
        <ul>
            <li><router-link to="/">Blogs</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <li><router-link to="/create-blog">New Blog</router-link></li>
        </ul>
    </nav>

</template> -->