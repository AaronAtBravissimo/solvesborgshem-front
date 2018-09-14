<template>
    <section class="twoColumn">
        <div class="container">
            <div class="columns flex flex-wrap">
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
$gutter: 31.5px;

.twoColumn {
    padding-bottom: 62px;
}

.columns {
    margin-left: -$gutter;
    margin-right: -$gutter;
}
.column {
    padding: 0 $gutter;
    width: 50%;
}
</style>
