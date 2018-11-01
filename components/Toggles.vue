<template>
    <div class="toggles">
        <div
            v-if="heading"
            class="container"
        >
            <div class="headingHolder">
                <h2>{{ heading }}</h2>
            </div>
        </div>
        <div class="">
            <Accordion
                v-for="toggle in toggles"
                :key="toggle.id"
                :heading="toggle.heading"
            >
                <div v-html="toggle.body"></div>
            </Accordion>
        </div>
    </div>
</template>

<script>
import toggles from '../static/json/toggles.json';
import Accordion from './Accordion.vue';
import Tabs from './Tabs.vue';

export default {
    components: {
        Tabs,
        Accordion,
    },
    props: {
        heading: {
            type: String,
            default: null,
        },
        showAll: {
            type: Boolean,
            default: false,
        },
        toggleIds: {
            type: Array,
            default: null,
        },
    },
    data: () => ({
        toggles,
    }),
};
</script>

<style lang="scss" scoped>

</style>
