import Navigo from 'navigo';
import breadcrumbs from './breadcrumbs'


let routes = null;

const initRoutes = () => {
    const root = null;
    const useHash = false; // Defaults to: false
    const hash = '#'; // Defaults to: '#'
    routes = new Navigo(root, useHash, hash);
    routes.on({
        '/': function () {
            // breadcrumbs()
        },

        '/pagina1': function () {
            // breadcrumbs()
        },
        '/pagina1/pagina2': function () {
            // breadcrumbs()
        },
        '/pagina1/pagina2/pagina3': function () {
            // breadcrumbs()
        },
        '/pagina1/pagina2/pagina3/pagina4': function () {
            // breadcrumbs()
        },

    }).resolve();

    routes.notFound(function () {
        //
    });
};
initRoutes();