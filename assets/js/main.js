jQuery(function($) {

    // sticky header
    window.onscroll = function() {stickyHeader()};
    const header = document.getElementById('header');
    const headerOffset = 100; // in pixels
    
    function stickyHeader() {
        if (window.pageYOffset >= headerOffset) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }
    // search bar show/hide toggle
    {
        const openSearchButton = document.getElementById('open-search-button');
        const searchIcon = document.getElementById('open-search-icon');
        const searchBar = document.getElementById('search-bar');
        let isHidden = true;

        openSearchButton.addEventListener('click', function() {
            if (isHidden === true) {
                searchBar.removeAttribute('hidden');
                searchBar.style.display = 'inline-flex';

                openSearchButton.classList.remove('icon-search');
                openSearchButton.classList.add('icon-close');
                openSearchButton.style.backgroundColor = '#fbfbfb'; //$grey-light color
                openSearchButton.style.borderBottom = '4px solid #53c1f2'; //$blue-light color
                
                isHidden = !isHidden;
            } else {
                searchBar.setAttribute('hidden', 'true');
                searchBar.style.display = 'none';

                openSearchButton.classList.remove('icon-close');
                openSearchButton.classList.add('icon-search');
                openSearchButton.style.backgroundColor = '#fff'; 
                openSearchButton.style.borderBottom = 'none';
                isHidden = !isHidden;
            }
        })
    
    }
    // //Mobile navigation
    {
        const mobileNavMenuButton = document.getElementById('mobile-nav-button');
        const navigation = document.getElementById('navigation');
        let isHidden = true;

        mobileNavMenuButton.addEventListener('click', function(){
            if (isHidden === true) {
                mobileNavMenuButton.classList.remove('icon-menu');
                mobileNavMenuButton.classList.add('icon-close');
                navigation.style.display = 'block';
                isHidden = !isHidden;
            } else {
                mobileNavMenuButton.classList.remove('icon-close');
                mobileNavMenuButton.classList.add('icon-menu');
                navigation.style.display = 'none';
                isHidden = !isHidden;
            }
        })
    }

});