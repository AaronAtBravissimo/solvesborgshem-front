<template>
    <section class="socialPosts">
        <div class="top">
            <h2 class="heading">Följ oss</h2>
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

export default {
    components: {
        AppButton,
        Card,
    },
    data() {
        return {
            loading: false,
            posts: [],
            currentFilter: 'facebook',
            allLoaded: false,
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
            const base = 'https://social-api.bravissimo.se/posts/86585180-b74c-11e8-9459-6725f24f20cc';

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
$gutterLargeDesktop: 15px;
$gutterMediumTablet: 10px;

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
    padding-top: 70px;
    text-align: center;
    margin-bottom: -50px;
    @media ($smallDesktop) {
        margin-bottom: -50px;
    }
    @media ($tablet) {
        margin-bottom: -30px;
    }
    @media ($smallTablet) {
        margin-bottom: -10px;
    }
    @media ($mobile) {
        padding-top: 50px;
        margin-bottom: 20px;
    }
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
    @media ($largeDesktop) {
        margin-left: -$gutterLargeDesktop;
        margin-right: -$gutterLargeDesktop;
    }
    @media ($mediumTablet) {
        margin-left: -$gutterMediumTablet;
        margin-right: -$gutterMediumTablet;
    }
    @media ($smallerTablet) {
        margin: 0;
    }
}
.column {
    padding: $gutter;
    width: 25%;
    @media ($largeDesktop) {
        padding: $gutterLargeDesktop;
    }
    @media ($smallDesktop) {
        width: 33.33%;
    }
    @media ($largeTablet) {
        width: 50%;
    }
    @media ($mediumTablet) {
        padding: $gutterMediumTablet;
    }
    @media ($smallerTablet) {
        width: 100%;
        padding: 0;
        margin-bottom: 25px;
    }
    @media ($mobile) {
        margin-bottom: 15px;
    }
}
.button {
    margin-top: $gutter;
    &:focus {
        outline: 2px solid $primaryTextColor;
        outline-offset: 3px;
    }
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
