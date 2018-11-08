const axios = require('axios');
const fs = require('fs');
const ef = require('empty-folder');
const siteConfig = require('../utils/config');

const { baseUrl, apiUrl } = siteConfig;

async function generatePages(dir) {
    const res = await axios.get(`${apiUrl}/api/page`);

    res.data.forEach((page) => {
        let name = page.post_link.replace(baseUrl, '');
        name = name.replace(/\//g, '-_-');
        name = name.replace(/\\/g, '-_-');
        const path = `${dir}/${name}.json`;
        fs.writeFile(path, JSON.stringify(page), (err) => {
            if (err) throw err;
        });
    });
}

async function generateBuildings(dir) {
    const res = await axios.get(`${apiUrl}/api/building`);

    const path = `${dir}/buildings.json`;
    fs.writeFile(path, JSON.stringify(res.data), (err) => {
        if (err) throw err;
    });

    res.data.forEach((page) => {
        let name = page.post_link.replace(baseUrl, '');
        name = name.replace(/\//g, '-_-');
        name = name.replace(/\\/g, '-_-');
        const path = `${dir}/${name}.json`;
        fs.writeFile(path, JSON.stringify(page), (err) => {
            if (err) throw err;
        });
    });
}

async function generateEmployees(dir) {
    const res = await axios.get(`${apiUrl}/api/employee`);

    const path = `${dir}/employees.json`;
    fs.writeFile(path, JSON.stringify(res.data), (err) => {
        if (err) throw err;
    });
}

async function generateToggles(dir) {
    const res = await axios.get(`${apiUrl}/api/toggle`);

    const path = `${dir}/toggles.json`;
    fs.writeFile(path, JSON.stringify(res.data), (err) => {
        if (err) throw err;
    });
}

async function generateMenu(dir) {
    const res = await axios.get(`${apiUrl}/menus/v1/menus/primary`);

    const path = `${dir}/menu.json`;
    fs.writeFile(path, JSON.stringify(res.data), (err) => {
        if (err) throw err;
    });
}

async function generateOptions(dir) {
    const res = await axios.get(`${apiUrl}/acf/v3/options/options`);

    const path = `${dir}/options.json`;
    fs.writeFile(path, JSON.stringify(res.data.acf), (err) => {
        if (err) throw err;
    });
}

export default async function generateJsonFiles(dir) {
    return Promise.all([
        await generatePages(dir),
        await generateBuildings(dir),
        await generateEmployees(dir),
        await generateToggles(dir),
        await generateMenu(dir),
        await generateOptions(dir),
    ]);
}

async function init(dir) {
    ef(dir, false, (feedback) => {
        if (!feedback.error) {
            console.log('Starting generating JSON files');
        }
    });

    await generateJsonFiles(dir);

    console.log('Done generating JSON files');

    return true;
}

module.exports = function () {
    this.nuxt.hook('generate:before', async generator => init(generator.nuxt.options.generate.apiCacheDir));
};
