/* eslint-disable */
import "vanilla-cookieconsent";

export default {
    install: (app, pluginConfig) => {
        window.cc = initCookieConsent();

        window.cc.run(pluginConfig);
    }
}