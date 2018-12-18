import axios from 'axios';
import { baseUrl, apiUrl } from './config';

export async function updatePage(path, type = 'page') {
    if (!process.client) return false;

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

export function getMeta(yoast) {
    if (!yoast) {
        return false;
    }

    const meta = [
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
    ];

    if (yoast.image && yoast.image.length > 0) {
        meta.push({
            hid: 'og:image',
            name: 'og:image',
            content: yoast.image,
        });
    }

    return {
        title: yoast.title,
        meta,
    };
}

function isDescendant(parent, child) {
    let node = child.parentNode;
    while (node != null) {
        if (node === parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

export function checkMapFocus(event) {
    if (
        isDescendant(this.$refs.gmap.$el, event.target)
        && event.target.nodeName === 'DIV'
    ) {
        this.mapIsFocused = true;
    } else {
        this.mapIsFocused = false;
    }
}
