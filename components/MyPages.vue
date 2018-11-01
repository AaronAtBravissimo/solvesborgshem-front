<template>
    <div class="myPages">
        <div class="filters flex justify-center">
            <AppButton
                :class="{'notActive': currentTab !== loginTab}"
                class="filter"
                label="Logga in"
                @clicked="currentTab = loginTab"
            />
            <AppButton
                :class="{'notActive': currentTab !== registerTab}"
                class="filter"
                label="Registrera dig"
                @clicked="currentTab = registerTab"
            />
        </div>
        <div class="frames">
            <div class="container">
                <div
                    v-show="currentTab === loginTab"
                    class="login"
                >
                    <div class="momentum-container">
                        <iframe
                            id="momentum"
                            src="https://marknad.solvesborgshem.se/pgLogin.aspx"
                            width="100%"
                            scrolling="no"
                        >
                        </iframe>
                    </div>
                </div>

                <div
                    v-show="currentTab === registerTab"
                    class="register"
                >
                    <div class="momentum-container">
                        <iframe
                            id="momentum"
                            src="https://marknad.solvesborgshem.se/pgClientRegister_ClientInfo.aspx"
                            scrolling="no"
                            frameBorder="0"
                            width="100%"
                        >
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppButton from './AppButton.vue';

export default {
    components: {
        AppButton,
    },
    data: () => ({
        currentTab: null,
        loginTab: true,
        registerTab: false,
    }),
    created() {
        this.currentTab = this.loginTab;
    },
};
</script>

<style lang="scss" scoped>
.myPages {
    padding: 60px 80px;
    background-color: #fff;
    margin-bottom: 50px;
    box-shadow: 0 0 50px 0 rgba(13, 42, 56, 0.1);
}
.filters {
    margin-bottom: 60px;
}
.filter {
    margin: 0 10px;
}
.login {
    height: 380px;
    overflow: hidden;
}
.login iframe {
    height: 700px;
    margin-top: -285px;
}
</style>
