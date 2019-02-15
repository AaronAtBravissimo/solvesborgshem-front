<template>
    <div class="myPages box">
        <Tabs
            :active="currentTab"
            :tabs="tabs"
            @changed="val => currentTab = val"
        />
        <div class="frames">
            <div class="container">
                <div
                    :class="activeTab.class"
                >
                    <div class="momentum-container">
                        <iframe
                            id="momentum"
                            :src="activeTab.src"
                            width="100%"
                            scrolling="no"
                            frameBorder="0"
                        >
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Tabs from './Tabs.vue';

export default {
    components: {
        Tabs,
    },
    data: () => ({
        currentTab: 0,
        tabs: [
            {
                name: 'Logga in',
                src: 'https://marknad.solvesborgshem.se/pgLogin.aspx',
                class: 'login',
            },
            {
                name: 'Registrera dig',
                src: 'https://marknad.solvesborgshem.se/pgClientRegister_ClientInfo.aspx',
                class: 'register',
            },
        ],
    }),
    computed: {
        activeTab() {
            return this.tabs[this.currentTab];
        },
    },
    watch: {
        currentTab() {
            this.$nextTick(() => {
                this.initIframe();
            });
        },
    },
    mounted() {
        if (!process.client) return;

        if (this.$route.query.vy && this.$route.query.vy === 'registera') {
            this.currentTab = 1;
        }

        /* eslint-disable */
        jQuery(document).ready(() => { 
            this.initIframe();
        });
    },
    methods: {
        initIframe() {
            jQuery("#momentum").momentumFrame({ 
                version: 4.2, 
                design: '[designkatalog]', //fråga momentum om denna variabel 
                hmsDomain: 'marknad' //ex vid marknad.foretag.se ska denna vara marknad })
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.login {
    overflow: hidden;
}
</style>
