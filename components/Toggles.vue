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
    </div>
</template>

<script>
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
};
</script>

<style lang="scss" scoped>

</style>
