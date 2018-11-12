<template>
    <div class="">
        <div class="container flex justify-center">
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
$gutter: 20px;

.link {
    font-family: $secondaryFont;
    display: block;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.5px;
    position: relative;
    height: 0;
    opacity: 0;
    z-index: -1;
    color: $primaryTextColor;
    &::after {
        content: '';
        position: absolute;
        left: 0;
        top: calc(100% - $gutter);
        margin-top: 2px;
        width: 100%;
        height: 1px;
        background-color: $primaryTextColor;
        opacity: 0;
        transition: 0.25s 0.25s;
    }
}
.link:focus {
    height: auto;
    opacity: 1;
    z-index: 1;
    padding: $gutter 0;
    outline: 0;
    &::after {
        opacity: 1;
    }
}
</style>
