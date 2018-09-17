<template>
    <footer class="mainFooter">
        <div class="graphicHolder">
            <img
                class="graphic"
                src="../assets/images/footer.svg"
                alt="Grafiskt element"
            >
        </div>
        <div class="inner">
            <div class="top">
                <div class="logoHolder flex-no-shrink">
                    <Logo white-color/>
                </div>
            </div>
            <div class="middle">

            </div>
            <div class="bottom">

            </div>
        </div>
    </footer>
</template>

<script>
import Logo from './Logo.vue';

export default {
    components: {
        Logo,
    },
    data() {
        return {
        };
    },
};
</script>

<style lang="scss" scoped>
.mainFooter {
    margin-top: 22px;
}
.graphicHolder {
    line-height: 0;
}
.graphic {
    width: calc(100% + 50px);
    max-width: none;
    margin-left: -25px;
}
.inner {
    background-color: #000000;
    padding: 0 100px;
    margin-top: -128px;
}
.logoHolder {
    width: 378px;
    height: 44px;
    position: relative;
    top: -4px;
}
</style>
