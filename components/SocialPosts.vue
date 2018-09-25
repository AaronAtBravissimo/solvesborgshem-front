<template>
    <section class="socialPosts">
        <div class="container">
            <div class="top">
                <h2 class="heading">Följ oss</h2>
                <Filters
                    :filters="filters"
                    @filterChanged="filterChanged"
                />
            </div>
        </div>

        <transition-group
            class="columns flex flex-wrap"
            name="fade-in"
            tag="div"
        >
            <div
                v-for="(post, index) in posts"
                v-if="offset > index"
                :key="post.id"
                class="column flex"
            >
                <Card :card="post"/>
            </div>
        </transition-group>

        <AppButton
            v-show="!allLoaded"
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
import Filters from './Filters.vue';

export default {
    components: {
        AppButton,
        Card,
        Filters,
    },
    data() {
        return {
            loading: false,
            posts: [],
            currentFilter: 0,
            allLoaded: false,
            filters: [
                { label: 'Visa alla', value: 0 },
                { label: 'Facebook', value: 'facebook' },
                { label: 'Instagram', value: 'instagram' },
            ],
        };
    },
    computed: {
        offset() {
            return this.posts.length;
        },
        numToLoad() {
            return this.offset === 0 ? 4 : 12;
        },
        apiUrl() {
            const base = 'https://social-api.bravissimo.se/posts/edffd670-4179-11e8-8f86-1b3fc7f38dbd';

            if (!this.currentFilter) {
                return base;
            }

            return `${base}/${this.currentFilter}`;
        },
    },
    mounted() {
        this.loadPosts();
    },
    methods: {
        filterChanged(value) {
            this.posts = [];
            this.allLoaded = false;
            this.currentFilter = value;
            this.loadPosts();
        },
        async loadPosts() {
            if (this.loading || this.allLoaded) return;

            this.loading = true;

            const res = await axios.get(this.apiUrl, {
                params: {
                    count: this.numToLoad,
                    offset: this.offset,
                    date_format: 'j F Y',
                },
            });

            this.loading = false;

            if (res.data.length < 1) {
                this.allLoaded = true;
                return;
            }

            if (this.posts.length > 0 && res.data.length < 12) {
                this.allLoaded = true;
            }

            res.data.map(post => this.posts.push(post));
        },
    },
};
</script>

<style lang="scss" scoped>
$gutter: 25px;

.fade-in-enter-active {
    transition: all 0.5s ease;
}
.fade-in-leave-active {
    opacity: 0;
}
.fade-in-enter {
    transform: translateY($gutter);
    opacity: 0;
}

.socialPosts {
    padding: 68px 0 0;
    text-align: center;
    margin-bottom: -50px;
}
.top {
    margin-bottom: 35px;
}
.heading {
    margin-bottom: 26px;
}
.columns {
    margin-left: -$gutter;
    margin-right: -$gutter;
}
.column {
    padding: $gutter;
    width: 25%;
}
.button {
    margin-top: $gutter;
    /deep/ {
        .inner {
            opacity: 1 !important;
        }
        .label {
            padding-left: 40px;
        }
         .loading {
            opacity: 1;
            left: 0;
            margin-left: 20px;
            margin-top: -12px;
            width: 24px;
            height: 24px;
        }
    }
}
</style>
