<template>
    <section class="shortcuts box">
        <div
            v-if="heading"
            class="container"
        >
            <div class="headingHolder">
                <h2>{{ heading }}</h2>
            </div>
        </div>
        <div class="columns">
            <div
                v-for="shortcut in shortcuts"
                :key="shortcut.id"
                class="column flex"
            >
                <Shortcut
                    :image="shortcut.image"
                    :heading="shortcut.heading"
                    :content="shortcut.content"
                    :link="shortcut.link"
                />
            </div>
        </div>
    </section>
</template>

<script>
import Shortcut from './Shortcut.vue';

export default {
    components: {
        Shortcut,
    },
    props: {
        heading: {
            type: String,
            default: null,
        },
        shortcuts: {
            type: Array,
            default: null,
        },
    },
};
</script>

<style lang="scss" scoped>
.shortcuts {
    padding: 40px 0;
    margin-bottom: 50px;
    @media ($mobile) {
        padding: 30px 0;
    }
}
.columns {
    display: flex;
    flex-wrap: wrap;
    padding: 35px 40px;
    position: relative;
    @media ($tablet) {
        padding: 30px;
    }
    @media ($mobile) {
        padding: 30px 15px 0;
    }
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        width: 1px;
        height: 100%;
        background-color: #d2dde1;
        @media ($tablet) {
            display: none;
        }
    }
}

.column {
    width: 50%;
    @media ($tablet) {
        width: 100%;
    }
    &:nth-child(even) .shortcut {
        padding-left: 68px;
        @media ($largeDesktop) {
            padding-left: 50px;
        }
        @media ($largeTablet) {
            padding-left: 40px;
        }
        @media ($tablet) {
            padding-left: 30px;
        }
        @media ($mobile) {
            padding-left: 0;
        }
    }
    &:nth-child(odd) .shortcut {
        padding-right: 68px;
        @media ($largeDesktop) {
            padding-right: 50px;
        }
        @media ($largeTablet) {
            padding-right: 40px;
        }
        @media ($tablet) {
            padding-right: 30px;
        }
        @media ($mobile) {
            padding-right: 0;
        }
    }
}

</style>
