<template>
    <section class="shortcuts">
        <div class="container">
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
     padding: 50px 0;
}

.headingHolder {
    text-align: center;
    margin-bottom: 92px;
}

.columns {
    display: flex;
    flex-wrap: wrap;
    padding: 0 14px;
    position: relative;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: 2px; // NOTE: Bör ändras till typ -0.5px
        width: 1px;
        height: 100%;
        background-color: #d2dde1;
    }
}

.column {
    width: 50%;
    padding: 0 66px;
    margin-bottom: 100px;
}

</style>
