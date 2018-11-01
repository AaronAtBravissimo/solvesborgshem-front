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
        <Tabs
            v-if="showAll"
            :tabs="categories"
            :active="currentFilter"
            @changed="val => currentFilter = val"
        />
        <div class="">
            <Accordion
                v-for="toggle in togglesOut"
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
        currentFilter: null,
        toggles,
    }),
    computed: {
        categories() {
            const categories = [];
            const added = [];

            for (let i = 0; i < this.toggles.length; i++) {
                const toggle = this.toggles[i];
                const categoryIds = this.getAllCategories(toggle);

                for (let j = 0; j < categoryIds.length; j++) {
                    const categoryId = categoryIds[j];
                    if (categoryId && !added.includes(categoryId)) {
                        added.push(categoryId);
                        categories.push(toggle.taxonomies.toggle_category[j]);
                    }
                }
            }

            return categories.sort((a, b) => a.sort_order - b.sort_order);
        },
        togglesOut() {
            let togglesAll = this.toggles;

            if (this.currentFilter !== null) {
                const category = this.categories[this.currentFilter].term_id;
                togglesAll = togglesAll.filter((toggle) => {
                    const categories = this.getAllCategories(toggle);
                    if (categories) {
                        return categories.includes(category);
                    }

                    return false;
                });
            }

            if (!this.showAll) {
                const res = [];
                for (let i = 0; i < this.toggleIds.length; i++) {
                    const toggle = togglesAll.find(
                        item => item.id === this.toggleIds[i],
                    );
                    if (toggle) {
                        res.push(toggle);
                    }
                }
                togglesAll = res;
            }

            return togglesAll;
        },
    },
    created() {
        if (this.showAll) {
            this.currentFilter = 0;
        }
    },
    methods: {
        getTermId(toggle) {
            if (!toggle.taxonomies.toggle_category) return false;

            return toggle.taxonomies.toggle_category[0].term_id;
        },
        getAllCategories(toggle) {
            if (!toggle.taxonomies.toggle_category) return false;

            return toggle.taxonomies.toggle_category
                .map(category => category.term_id);
        },
    },
};
</script>

<style lang="scss" scoped>
.accordion {
    margin-bottom: 30px;
    &:last-child {
        margin-bottom: 0;
    }
}
</style>
