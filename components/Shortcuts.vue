<template>
    <section class="shortcuts">
        <div class="container">
            <div class="headingHolder">
                <h2>{{ heading }}</h2>
            </div>
            <Shortcut
                v-for="(shortcut, index) in shortcuts"
                :key="index"
                :image="shortcut.image"
                :heading="shortcut.heading"
                :content="shortcut.content"
                :link="shortcut.link"
            />
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
    margin-bottom: 65px;
}

</style>
