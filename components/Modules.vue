<template>
    <section class="modules">
        <template
            v-for="(module, index) in modules"
        >
            <TwoColumn
                v-if="module.acf_fc_layout === 'twoColumns'"
                :key="index"
                :columns="module.columns"
            />
            <Shortcuts
                v-if="module.acf_fc_layout === 'shortcuts'"
                :key="index"
                :heading="module.heading"
                :shortcuts="module.shortcuts"
            />
            <BuildingsArchive
                v-if="module.acf_fc_layout === 'buildingsArchive'"
                :key="index"
            />
            <Employees
                v-if="module.acf_fc_layout === 'employees'"
                :key="index"
            />
        </template>
    </section>
</template>

<script>
import TwoColumn from './TwoColumn.vue';
import Shortcuts from './Shortcuts.vue';
import BuildingsArchive from './BuildingsArchive.vue';
import Employees from './Employees.vue';

export default {
    components: {
        TwoColumn,
        Shortcuts,
        BuildingsArchive,
        Employees,
    },
    props: {
        modules: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.modules > section:last-child {
    margin-bottom: 0;
}
</style>
