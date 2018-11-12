<template>
    <section class="twoColumn">
        <div class="container">
            <div
                :class="columns.length < 2 ? 'centerColumn' : ''"
                class="columns flex flex-wrap"
            >
                <div
                    v-for="(column, index) in columns"
                    :key="index"
                    class="column content"
                    v-html="column.content"
                >
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        columns: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
$gutter: 30px;
$gutterTablet: 25px;

.twoColumn {
    padding-bottom: 62px;
}
.container {
    @media ($tablet) {
        padding: 0;
    }
}
.columns {
    margin-left: -$gutter;
    margin-right: -$gutter;
    @media($tablet) {
        margin-left: -$gutterTablet;
        margin-right: -$gutterTablet;
    }
    @media ($smallTablet) {
        margin: 0 0 -30px;
    }
}
.column {
    padding: 0 $gutter;
    width: 50%;
    @media($tablet) {
        padding: 0 $gutterTablet;
    }
    @media ($smallTablet) {
        width: 100%;
        padding: 0;
        margin-bottom: 30px;
    }
}
.centerColumn .column {
    width: 100%;
}
</style>
