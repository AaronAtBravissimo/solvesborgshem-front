<template>
    <div class="">
        <div class="container">
            <a
                tabindex="1"
                class="link"
                href="#main"
            >
                Gå till huvudinnehållet
            </a>
        </div>
    </div>

</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.link {
    display: block;
    height: 0;
    opacity: 0;
}
.link:focus {
    height: auto;
    opacity: 1;
    padding: 15px 0;
}
</style>
