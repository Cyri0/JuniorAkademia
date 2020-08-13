export const app = {
    pages: [],
    
    show: new Event('show'),
    
    init: function () {
        app.pages = document.querySelectorAll('.page');
        app.pages.forEach((pg) => {
            pg.addEventListener('show', app.pageShown);
        })

        document.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', app.nav);
        })

        history.replaceState({}, '', '#landing_page');
        window.addEventListener('hashchange', app.poppin);
    },
    
    nav: function(ev){
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
        console.log("Before:");
        console.log(document.querySelector('.actual'));
        document.querySelector('.actual').classList.remove('actual');
        document.getElementById(currentPage).classList.add('actual');
        console.log(currentPage);
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(currentPage).dispatchEvent(app.show);
        console.log("After:");
        console.log(document.querySelector('.actual'));
    },

    pageShown: function(ev) {
        console.log('Page', ev.target.id, 'just shown');        
    },
    
    poppin: function(ev){
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#', '');
        document.querySelector('.actual').classList.remove('actual');
        
        document.getElementById(hash).classList.add('actual');
        console.log(hash);
        document.getElementById(currentPage).dispatchEvent(app.show);
    }
}