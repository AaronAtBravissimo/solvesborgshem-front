<template>
    <section class="socialPosts">
        <div class="container">
            <div class="top">
                <h2 class="heading">Följ oss</h2>
            </div>
        </div>

        <div class="columns flex flex-wrap">
            <div
                v-for="(post, index) in posts"
                v-if="offset > index"
                :key="post.id"
                class="column"
            >
                <Card :card="post"/>
            </div>
        </div>

        <AppButton
            :loading="loading"
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
            loading: false,
            posts: [],
        };
    },
    computed: {
        offset() {
            return this.posts.length;
        },
        numToLoad() {
            return this.offset === 0 ? 4 : 12;
        },
    },
    mounted() {
        this.loadPosts();
    },
    methods: {
        async loadPosts() {
            this.loading = true;
            const res = await axios.get('https://social-api.bravissimo.se/posts/edffd670-4179-11e8-8f86-1b3fc7f38dbd', {
                params: {
                    count: this.numToLoad,
                    offset: this.offset,
                },
            });
            res.data.map(post => this.posts.push(post));
            this.loading = false;
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
