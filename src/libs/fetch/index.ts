import api from '../api';

const { baseURL } = api;

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

const config = {
    heaers: myHeaders,
};

const getConfigWithToken = () => {
    const token = localStorage.getItem('token');
    const headers = new Headers(myHeaders);

    if (token) {
        headers.append('Authorization', token);
    }

    return {
        ...config,
        headers,
    };
};

const createBodyForRequest = (body: any) => {
    return JSON.stringify(body);
};

export function get(url: any) {
    return fetch(baseURL + url, getConfigWithToken())
}

export function put(url: string, body: any) {
    const configWithBody = {
        ...getConfigWithToken(),
        method: 'PUT',
        body: createBodyForRequest(body),
    };
    return fetch(baseURL + url, configWithBody);
}

export function post(url: string, body: any) {
    const configWithBody = {
        ...getConfigWithToken(),
        method: 'POST',
        body: createBodyForRequest(body),
    };
    return fetch(baseURL + url, configWithBody);
}
export function remove(url: string, body: any) {
    const configWithBody = {
        ...getConfigWithToken(),
        method: 'DELETE',
        body: createBodyForRequest(body),
    };
    return fetch(baseURL + url, configWithBody);
}

export function authPost(url: string, body: any) {
    const configWithBody = {
        ...config,
        method: 'POST',
        body: createBodyForRequest(body),
    };
    return fetch(baseURL + url, configWithBody);
}
