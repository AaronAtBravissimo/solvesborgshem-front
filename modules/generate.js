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
}

async function generateEmployees(dir) {
    const res = await axios.get(`${apiUrl}/api/employee`);

    const path = `${dir}/employees.json`;
    fs.writeFile(path, JSON.stringify(res.data), (err) => {
        if (err) throw err;
    });
}

export default async function generateJsonFiles(dir) {
    await generatePages(dir);
    await generateBuildings(dir);
    await generateEmployees(dir);
}

async function init(dir) {
    ef(dir, false, (feedback) => {
        if (!feedback.error) {
            console.log('Stale API cache removed');
        }
    });

    return generateJsonFiles(dir);
}

module.exports = function () {
    this.nuxt.hook('generate:before', async generator => init(generator.nuxt.options.generate.apiCacheDir));
};
