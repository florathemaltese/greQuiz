import { CLIENT } from './constants';

async function handleResponse(response) {
    if (response.ok) {
        return response.json();
    }
    const error = await response.json().catch(() => ({ error: CLIENT.UNKNOWN_ERROR }));
    return Promise.reject(error);
}

export function fetchSession() {
    return fetch('/api/session', {
        method: 'GET',
    })
        .catch(() => Promise.reject({ err: CLIENT.NETWORK_ERROR }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        });
}

export function fetchWord() {
    return fetch('/word')
        .catch(() => Promise.reject({ error: CLIENT.NETWORK_ERROR }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        })
}

export function fetchUpdateWord(wordToUpdate) {
    return fetch('/word', {
        method: 'PATCH',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify(wordToUpdate),
    })
        .catch(() => Promise.reject({ error: CLIENT.NETWORK_ERROR }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        });
}

export function fetchLogin(username) {
    return fetch('/api/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ username }),
    })
        .catch(() => Promise.reject({ error: CLIENT.NETWORK_ERROR }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        });
}

export function fetchLogout() {
    return fetch('/api/session', {
        method: 'DELETE',
    })
        .catch(() => Promise.reject({ error: CLIENT.NETWORK_ERROR }))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({ error }))
                .then(err => Promise.reject(err));
        });
}
