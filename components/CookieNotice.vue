<template>
    <transition
        name="cookeNotice"
        appear
    >
        <div
            v-if="active"
            class="cookieNotice"
            tabindex="2"
        >
            <p class="inner">
                Vi använder cookies för att ge dig den bästa upplevelsen av vår webbplats.
                Genom att fortsätta använda webbplatsen godkänner du detta.
                <button
                    class="readMore"
                    tabindex="2"
                    @click="termsOpen = true"
                >
                    Läs mer
                </button>
            </p>
            <button
                class="close"
                aria-label="Stäng notisen som visar information om cookies"
                tabindex="2"
                @click="close()"
            >
            </button>
            <portal to="endOfPage">
                <AppDialog
                    v-if="termsOpen"
                    :aria-hidden="termsOpen ? 'false' : 'true'"
                    :content="termsText.content"
                    :heading="termsText.heading"
                    dialog-id="cookieinformation"
                    @close="termsOpen = false"
                />
            </portal>
        </div>
    </transition>
</template>

<script>
import AppDialog from './AppDialog.vue';

export default {
    components: {
        AppDialog,
    },
    data() {
        return {
            active: window.localStorage.getItem('cookieInformationAccepted') === null,
            termsOpen: false,
        };
    },
    computed: {
        termsText() {
            return this.$store.getters.options.popup;
        },
    },
    methods: {
        close() {
            window.localStorage.setItem('cookieInformationAccepted', true);
            this.active = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.cookeNotice-enter-active,
.cookeNotice-leave-active {
    opacity: 0;
}
.cookieNotice {
    position: fixed;
    left: 50%;
    bottom: 15px;
    margin-left: -350px;
    width: 700px;
    z-index: 100;
    padding: 15px 25px;
    padding-right: 60px;
    background-color: #fff;
    transition: 0.35s;
    box-shadow: 0px 0px 20px 1px rgba(13, 42, 56, 0.35);
    border-radius: 6px;
    overflow: hidden;
    @media ($smallTablet) {
        width: calc(100% - 30px);
        margin-left: 0;
        left: 15px;
    }
    @media ($mobile) {
        padding: 15px 14px;
        padding-bottom: 10px;
        width: calc(100% - 20px);
        margin-left: 0;
        left: 10px;
        bottom: 10px;
    }
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 8px;
        height: 100%;
        background: linear-gradient(135deg, #8ac8df 0%, #94d3b3 100%);
        @media ($mobile) {
            width: 4px;
        }
    }
}
.inner {
    margin-bottom: 0;
    text-align: left;
    font-size: 16px;
    @media ($smallTablet) {
        font-size: 15px;
    }
    @media ($mobile) {
        text-align: center;
        font-size: 13px;
    }
}
.readMore {
    font-weight: 700;
    letter-spacing: 0.6px;
    position: relative;
    padding-bottom: 2px;
    &::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: $primaryTextColor;
        transition: 0.25s;
    }
    &:hover::after {
        opacity: 0;
    }
}
.close {
    position: absolute;
    top: 50%;
    margin-top: -28px;
    right: 0;
    height: 56px;
    width: 56px;
    cursor: pointer;
    z-index: 50;
    transition: 0.25s;
    background: url("../assets/images/icon-close.svg") no-repeat center;
    background-size: 18px;
    @media ($mobile) {
        position: relative;
        right: 0;
        top: auto;
        margin: 0 auto;
        margin-top: 10px;
        height: 28px;
        width: 28px;
        background-size: 14px;
        display: block;
    }
}
</style>
