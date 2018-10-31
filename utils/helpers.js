import axios from 'axios';
import { baseUrl, apiUrl } from './config';

export async function updatePage(path, type = 'page') {
    const res = await axios.get(`${apiUrl}/api/${type}?path=${path}&timestamp=${new Date().getTime()}`);
    return res.data;
}

export function makeUrlRelative(url) {
    return url.replace(baseUrl, '');
}

export function excerpt(string, maxLength = 200) {
    if (string.length > maxLength) {
        return `${string.substring(0, maxLength)}...`;
    }

    return string;
}

export function getMeta(yoast, removeTitle = false) {
    if (!yoast) {
        return false;
    }

    const meta = {
        meta: [
            {
                hid: 'og:title',
                name: 'og:title',
                content: yoast.title,
            },
            {
                hid: 'description',
                name: 'description',
                content: yoast.desc,
            },
            {
                hid: 'og:description',
                name: 'og:description',
                content: yoast.desc,
            },
            {
                hid: 'twitter:description',
                name: 'twitter:description',
                content: yoast.desc,
            },
            {
                hid: 'og:image',
                name: 'og:image',
                content: yoast.image,
            },
        ],
    };

    if (removeTitle) {
        meta.titleTemplate = '';
    } else {
        meta.title = yoast.title;
    }

    return meta;
}
