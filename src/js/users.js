import ajaxrequests from './ajaxRequests';
import DataTable from 'vanilla-datatables';
import axios from 'axios';
import alertify from 'alertifyjs';
import { submitEventListener } from './formfunctions';

let table = new DataTable("#usertable",{
    perPageSelect: false,
    perPage: 50,
});
class user {
    constructor() {
        this.photos = 0
        this.posts = 0
        this.albums = 0
        this.lielements = 0;
        this.table = new DataTable("#usertable", {
            perPageSelect: false,
            perPage: 50,
        });

        this.groupedItems = []
        this.removeItem = this.removeItem.bind(this);
        this.events = this.events.bind(this);

        const _self = this;
        submitEventListener(table, _self.events)
        ajaxrequests.getPosts().then(function (response) {
            _self.posts = response.data;
            ajaxrequests.getAlbums().then(function (response) {
                _self.albums = response.data;
                ajaxrequests.getPhotos().then(function (response) {
                    _self.photos = response.data;
                    ajaxrequests.getUsers().then(function (response) {
                        response.data.forEach(function (user, key) {
                            // console.log('key', key);
                            // axios.get(https://jsonplaceholder.typicode.com/albums)
                            _self.groupItemsByUser(user);
                        });
                        // resolve(groupedItems)
                        _self.generateTable();
                        // return true;


                    })
                });
            })
        })
    }


    dayoftheweek() {
        const numberDays = Math.floor(Math.random() * 7);
        if (numberDays == 6) {
            return 'Every Day'
        } else if (numberDays == 5) {
            return 'Weekend';
        } else if (numberDays == 0) {
            return 'Mon'
        } else {
            let days = '';
            for (let i = 0; i < numberDays; i++) {
                let day = Math.floor(Math.random() * 5);
                if (day == 0 && days.indexOf('Mon') == -1) {
                    days = days.length > 0 ? `${days} Mon` : 'Mon'
                }
                if (day == 1 && days.indexOf('Tue') == -1) {
                    days = days.length > 0 ? `${days} Tue` : 'Tue'
                }
                if (day == 2 && days.indexOf('Wed') == -1) {
                    days = days.length > 0 ? `${days} Wed` : 'Wed'
                }
                if (day == 3 && days.indexOf('Thu') == -1) {
                    days = days.length > 0 ? `${days} Thu` : 'Thu'
                }
                if (day == 4 && days.indexOf('Fri') == -1) {
                    days = days.length > 0 ? `${days} Fri` : 'Fri'
                }
            }
            return days;
        }
    }

    rideingroup() {
        const numberDays = Math.floor(Math.random() * 3);
        if (numberDays == 2) {
            return 'Always'
        } else if (numberDays == 1) {
            return 'Sometimes';
        } else if (numberDays == 0) {
            return 'Never'
        }
    }

    groupItemsByUser(user) {
        // console.log('user', user);
        const _self = this;
        let postByUser = [];
        let albumByUser = [];
        let photoByUser = [];
        this.posts.forEach((post, key) => {
            if (post.userId == user.id) {
                postByUser.push(post);
            }
        })
        this.albums.forEach((album, key) => {
            if (album.userId == user.id) {
                albumByUser.push(album);
                _self.photos.forEach(photo => {
                    if (album.id == photo.albumId) {
                        photoByUser.push(photo);
                    }
                })
            }
        })
        this.groupedItems.push({
            userId: user.id,
            userinfo: user,
            posts: postByUser,
            albums: albumByUser,
            photos: photoByUser
        })
        // console.log('groupedItems', groupedItems);

    }

    generateTable() {
        const _self = this;
        let users = [];

        this.groupedItems.forEach((user, key) => {
            users.push([
                user.userinfo.username,
                user.userinfo.name,
                `<a href="mailto:${user.userinfo.email}">
                ${user.userinfo.email}
            </a>`,
                `<a target="_blank" href="https://www.google.com/maps/search/?api=1&query=${user.userinfo.address.geo.lat},${user.userinfo.address.geo.lng}">
                ${user.userinfo.address.city}
            </a>`,
                _self.rideingroup(),
                _self.dayoftheweek(),
                user.posts.length,
                user.albums.length,
                user.photos.length,
                `<div class="trash" data-userid='${user.userId}' data-tableindex='${key}'>   
                <a>
                    <i class="fas fa-trash-alt"></i>
                </a>
            </div>`
            ])

        })
        table.rows().add(users)
        this.events();
    }
    events() {
        const _self = this;

        document.querySelectorAll('.trash').forEach(function (e) {
            e.addEventListener('click', (e) => {
                // console.log('e', e);

                const domElement = e.target.parentElement.parentElement
                const userid = domElement.dataset;

                alertify.confirm(
                    'Delete User', 'Do you really wants delete user?',
                    function () {
                        _self.removeItem(userid, domElement)
                    }
                    , function () {

                    }
                );
            })
        })
    }

    removeItem(userId, element) {
        console.log('element', element)
        const dataindex = element.dataset;
        console.log('dataindex', dataindex)
        /** this block update interface and a request for delete is called */
        table.rows().remove(dataindex.tableindex);
        element.remove();
        alertify.success('Ok')
        //end block
        this.events()
        /* in this point i was submit my request to delete to api and in success or error update interface.
        axios.delete(`https://jsonplaceholder.typicode.com/users/${dataindex.userid}`)
        .then(function (response) {
            console.log(response);
            if(response.status == 200 ) {
            }
        })
        */
    }
}

new user();
