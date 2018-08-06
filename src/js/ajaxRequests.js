import axios from 'axios';

export default class ajaxRequests {
    static getPosts() {
        return axios.get('https://jsonplaceholder.typicode.com/posts')
    }

    static getAlbums() {
        return axios.get('https://jsonplaceholder.typicode.com/albums')

    }

    static getPhotos() {
        return axios.get('https://jsonplaceholder.typicode.com/photos')

    }
    // get users from json place holder and include in dom datatable;
    static getUsers() {
        return axios.get('https://jsonplaceholder.typicode.com/users')
            
    }
}