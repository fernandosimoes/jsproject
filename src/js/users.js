
import DataTable from 'vanilla-datatables';
import axios from 'axios';
import alertify from 'alertifyjs';
import { submitEventListener } from './formfunctions';

let table = new DataTable("#usertable",{
    perPageSelect: false,
    perPage: 50,
});
submitEventListener(table, events)


let photos, posts, albums, lielements;
let groupedItems = []



// random generate day of the week
const dayoftheweek = () => {
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
            if (day == 1 && days.indexOf('Tue')==-1) {
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
// random generate ride in froup
const rideingroup = () => {
    const numberDays = Math.floor(Math.random() * 3);
    if (numberDays == 2) {
        return 'Always'
    } else if (numberDays == 1) {
        return 'Sometimes';
    } else if (numberDays == 0) {
        return 'Never'
    }
}

const getPosts = () => {
    return axios.get('https://jsonplaceholder.typicode.com/posts')
}

const getAlbums = () => {
    return axios.get('https://jsonplaceholder.typicode.com/albums')
        
}

const getPhotos = () => {
    return axios.get('https://jsonplaceholder.typicode.com/photos')
        
}


const groupItemsByUser = (user) => {
    // console.log('user', user);
    let postByUser = [];
    let albumByUser = [];
    let photoByUser = [];
    posts.forEach((post, key) => {
        if (post.userId == user.id) {
            postByUser.push(post);
        }
    })
    albums.forEach((album, key) => {
        if(album.userId == user.id) {
            albumByUser.push(album);
            photos.forEach(photo => {
                if (album.id == photo.albumId) {
                    photoByUser.push(photo);
                }
            })
        }
    })
    groupedItems.push({
        userId: user.id,
        userinfo: user,
        posts: postByUser,
        albums: albumByUser,
        photos: photoByUser
    })
    // console.log('groupedItems', groupedItems);

}

// get users from json place holder and include in dom datatable;
const getUsers = () => {
    return new Promise((resolve, reject) => {


        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(function (response) {
            console.log('response', response.data.length);
            response.data.forEach(function (user, key) {
                // console.log('key', key);
                // axios.get(https://jsonplaceholder.typicode.com/albums)
                groupItemsByUser(user);
            });

            resolve(groupedItems)

            // return true;
            
        })
    })

}
// save items in a first call of this single page app
getPosts().then(function (response) {
    posts = response.data;
    getAlbums().then(function (response) {
        albums = response.data;
    })
    getPhotos().then(function (response) {
        photos = response.data;
        // console.log('teste', photos, posts, albums);
        getUsers().then(response => {
            generateTable();
        });
    });
})


const generateTable = () => {

    let datatable = table;
    let users = [];

    groupedItems.forEach((user, key) => {
        users.push([
            user.userinfo.username,
            user.userinfo.name,
            `<a href="mailto:${user.userinfo.email}">
                ${user.userinfo.email}
            </a>`,
            `<a target="_blank" href="https://www.google.com/maps/search/?api=1&query=${user.userinfo.address.geo.lat},${user.userinfo.address.geo.lng}">
                ${user.userinfo.address.city}
            </a>`,
            rideingroup(),
            dayoftheweek(),
            `<div class="posts">${user.posts.length}</div>`,
            `<div class="albums">${user.albums.length}</div>`,
            user.photos.length,
            `<div class="trash" data-userid='${user.userId}' data-tableindex='${key}'>   
                <a>
                    <i class="fas fa-trash-alt"></i>
                </a>
            </div>`
        ])

    })
    datatable.rows().add(users)
    events();
}
const events = () => {

    document.querySelectorAll('.trash').forEach(function (e) {
        e.addEventListener('click', (e) => {
            // console.log('e', e);
            
            const domElement = e.target.parentElement.parentElement
            const userid = domElement.dataset;

            alertify.confirm(
                'Delete User', 'Do you really wants delete user?', 
                function () { 
                    removeItem(userid, domElement)
                }
                , function () { 

                }
            );
        })
    })

   

    

}

const hideelements = () => {
    
    lielements = document.querySelectorAll('.breadcrumb--list li')
    const elementslenght = lielements.length - 1;
    lielements.forEach((e, k) => {
        if (k >= 2 && k < elementslenght) {
            if (!e.classList.contains('ellipseshide')) {
                e.classList.add('hide');
            }
        }
        if (k == elementslenght) {
            console.log('e', e);
            document.querySelector('.ellipseshide').classList.remove('ellipseshide')
            // document.querySelector('.ellipseshide').classList.add('ellipsesShow')
            // <li>
            //     <span>PAGE NAME 1</span>
            //     <div class="arrow">
            //         <i class="fas fa-chevron-right"></i>
            //     </div>
            // </li>
        }
    })
}

const showElements = () => {

}
hideelements()
const removeItem = (userId, element) => {
    console.log('element', element)
    const dataindex = element.dataset;
    console.log('dataindex', dataindex)
    /** this block update interface and a request for delete is called */
    table.rows().remove(dataindex.tableindex);
    element.remove();
    alertify.success('Ok') 
    //end block
    events()
    /* in this point i was submit my request to delete to api and in success or error update interface.
    axios.delete(`https://jsonplaceholder.typicode.com/users/${dataindex.userid}`)
    .then(function (response) {
        console.log(response);
        if(response.status == 200 ) {
        }
    })
    */
}



