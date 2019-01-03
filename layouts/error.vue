<template>
    <div class="error">
        <TopSection :top-section="topSection"/>
    </div>
</template>

<script>
import TopSection from '../components/TopSection.vue';

export default {
    components: {
        TopSection,
    },
    computed: {
        topSection() {
            return {
                heading: '404 - Sidan finns inte',
                preamble:
                    `
                    Sidan du leter efter har antingen bytt namn eller så finns den inte längre.<br>Använd vår sökfunktion eller gå till startsidan genom att <a href="/">klicka här</a>.
                    `,
                image: this.$store.getters.options.searchTopImage,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.error /deep/ .topSection {
    padding-bottom: 0;
}
</style>
