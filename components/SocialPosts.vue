<template>
    <section class="socialPosts">
        <div class="container">
            <div class="top">
                <h2 class="heading">Följ oss</h2>
            </div>
        </div>

        <div class="columns flex flex-wrap">
            <div
                v-for="post in posts"
                :key="post.id"
                class="column"
            >
                <Card :card="post"/>
            </div>
        </div>

        <AppButton
            label="Ladda fler"
            @clicked="loadPosts"
        />

    </section>
</template>

<script>
import axios from 'axios';
import AppButton from './AppButton.vue';
import Card from './Card.vue';

export default {
    components: {
        AppButton,
        Card,
    },
    data() {
        return {
            posts: [],
        };
    },
    computed: {
        offset() {
            return this.posts.length;
        },
    },
    mounted() {
        this.loadPosts();
    },
    methods: {
        async loadPosts() {
            const res = await axios.get(
                `https://social-api.bravissimo.se/posts/4b3ba210-51fd-11e8-a5d8-b9e96f3a5ae9/instagram?count=4&offset=${this.offset}&timestamp=${new Date().getTime()}`,
            );
            res.data.map(post => this.posts.push(post));
        },
    },
};
</script>

<style lang="scss" scoped>
$gutter: 15px;

.socialPosts {
    padding: 68px 0 80px;
    text-align: center;
}
.top {
    margin-bottom: 60px;
}
.columns {
    margin-left: -$gutter;
    margin-right: -$gutter;
}
.column {
    padding: $gutter;
    width: 25%;
}
</style>
