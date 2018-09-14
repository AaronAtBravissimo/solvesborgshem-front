<template>
    <section class="shortcuts">
        <div class="container">
            {{ heading }}
        </div>
    </section>
</template>

<script>
export default {
    props: {
        heading: {
            type: String,
            default: null,
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
