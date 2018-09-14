<template>
    <section class="shortcuts">
        <div class="container">
            <div class="headingHolder">
                <h2>{{ heading }}</h2>
            </div>
            <Shortcut
                v-for="(shortcut, index) in shortcuts"
                :key="index"
                :image="shortcut.acf.image"
                :heading="shortcut.acf.heading"
                :content="shortcut.acf.content"
                :link="shortcut.acf.link"
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
        shortcutIds: {
            type: Array,
            default: null,
        },
    },
    computed: {
        shortcuts() {
            const allShortcuts = this.$store.getters.shortcuts;
            return this.shortcutIds
                .map(id => allShortcuts.find(shortcut => shortcut.id === id))
                .filter(Boolean);
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
    padding-left: 12px; // NOTE: Bör plockas bort?
}

</style>
