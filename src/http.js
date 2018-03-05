/*
* EasyHTTP Library
* Simple custom http library based on fetch API,
* arrow functions anf ES6 classes
*
* @version 3.0.0
* @author Vitaly Dragun
* @license MIT
*
* */

class EasyHTTP {

    // Make an HTTP GET Request
    async get(url) {
        const response = await fetch(url);
        return await response.json();
    }

    // Make an HTTP POST Request
    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await response.json();
    }

    // Make an HTTP PUT Request
    async put(url, data) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await response.json();
    }
    // Make an HTTP DELETE Request
    async delete(url) {
        const response = await fetch(url, {method: 'DELETE'});
        return await 'Resource Deleted';
    }
}

export const http = new EasyHTTP();