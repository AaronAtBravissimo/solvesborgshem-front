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
                    v-for="(tab, index) in tabs"
                    v-show="index === currentTab"
                    :key="index"
                    :class="tab.class"
                >
                    <div class="momentum-container">
                        <iframe
                            id="momentum"
                            :src="tab.src"
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
};
</script>

<style lang="scss" scoped>
.login {
    overflow: hidden;
}
.login iframe {
    margin-top: -285px;
}
.login iframe,
.register iframe {
    min-height: 7500px;
}
</style>
