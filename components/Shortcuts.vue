<template>
    <section class="shortcuts">
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
                class="column"
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
    background-color: #ffffff;
     box-shadow: 0 0 50px 0 rgba(13, 42, 56, 0.1);
     padding: 40px 0;
}

.headingHolder {
    text-align: center;
    margin-top: 11px;
    margin-bottom: 67px;
    @media ($tablet) {
        margin-bottom: 30px;
    }
    @media ($smallTablet) {
        margin-bottom: 0;
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
        padding: 30px 15px;
    }
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -0.5px;
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
            padding-left: 15px;
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
            padding-right: 15px;
        }
    }
}

</style>
