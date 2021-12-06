<template>
    <div class="modules">
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
                :module-number="index"
                :key="index"
                :heading="module.heading"
                :show-all="module.showAll"
                :employees-ids="module.employees"
            />
            <CardsWithIcons
                v-if="module.acf_fc_layout === 'infoCardsWithIcons'"
                :key="index"
                :columns="module.columns"
            />
            <MyPages
                v-if="module.acf_fc_layout === 'myPages'"
                :key="index"
            />
            <SearchPlace
                v-if="module.acf_fc_layout === 'searchPlace'"
                :key="index"
            />
            <Toggles
                v-if="module.acf_fc_layout === 'toggle'"
                :module-number="index"
                :key="index"
                :heading="module.heading"
                :show-all="module.showAll"
                :toggle-ids="module.toggles"
            />
            <Files
                v-if="module.acf_fc_layout === 'files'"
                :module-number="index"
                :key="index"
                :heading="module.heading"
                :files="module.files"
            />
            <PremisesModule
                v-if="module.acf_fc_layout === 'premises'"
                :key="index"
                :premises="module.premises"
            />
        </template>
    </div>
</template>

<script>
import TwoColumn from './TwoColumn.vue';
import Shortcuts from './Shortcuts.vue';
import BuildingsArchive from './BuildingsArchive.vue';
import Employees from './Employees.vue';
import CardsWithIcons from './CardsWithIcons.vue';
import MyPages from './MyPages.vue';
import SearchPlace from './SearchPlace.vue';
import Toggles from './Toggles.vue';
import Files from './Files.vue';
import PremisesModule from './PremisesModule.vue';

export default {
    components: {
        TwoColumn,
        Shortcuts,
        BuildingsArchive,
        Employees,
        CardsWithIcons,
        MyPages,
        SearchPlace,
        Toggles,
        Files,
        PremisesModule,
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
.modules > *:last-child {
    margin-bottom: 0;
}
</style>
