jQuery(function($) {
    
    /*cache dom*/
	const $dom = {
        openSearchButton: $('#open-search-button'),
        searchIcon: $('#open-search-icon'),
        searchBar: $('#search-bar'),
        header: $('#header'),
        headerOffset: 100,
        navigation: $('#navigation'),
        mobileNavMenuButton: $('#mobile-nav-button')
    };

    /*cache classes*/
    const classes = {
        iconMenu: 'icon-menu',
        iconSearch: 'icon-search',
        iconClose: 'icon-close'
    };

    const attr = {
        hidden: 'hidden'
    };

    /*functions*/
    function stickyHeader() {
        if (window.pageYOffset >= $dom.headerOffset) {
            $dom.header.addClass('sticky');
        } else {
            $dom.header.removeClass('sticky');
        }
    }
    /*bind events*/

    // sticky header
    window.onscroll = () => stickyHeader();
    // search bar show/hide toggle
    
    let isHidden = true;

    $dom.openSearchButton.on('click', function() {
        if (isHidden === true) {
            $dom.searchBar.removeAttr(attr.hidden);
            $dom.searchBar.css('display', 'inline-flex');

            $dom.openSearchButton.removeClass(classes.iconSearch);
            $dom.openSearchButton.addClass(classes.iconClose);
            $dom.openSearchButton.css('backgroundColor', '#fbfbfb'); //$grey collor
            $dom.openSearchButton.css('border-bottom', '4px solid #53c1f2'); //$blue-light color
            
            isHidden = !isHidden;
        } else {
            $dom.searchBar.attr('hidden', 'true');
            $dom.searchBar.css('display', 'none');

            $dom.openSearchButton.removeClass('icon-close').addClass('icon-search');
            $dom.openSearchButton.css('backgroundColor', '#fff'); 
            $dom.openSearchButton.css('border-bottom', 'none');
            isHidden = !isHidden;
        }
    })
    
    
    // //Mobile navigation
    let isHiddenNav = true;

    $dom.mobileNavMenuButton.on('click', function(){
        if (isHiddenNav === true) {
            $dom.mobileNavMenuButton.removeClass(classes.iconMenu);
            $dom.mobileNavMenuButton.addClass(classes.iconClose);
            $dom.navigation.css('display', 'block');
            isHiddenNav = !isHiddenNav;
        } else {
            $dom.mobileNavMenuButton.removeClass(classes.iconClose);
            $dom.mobileNavMenuButton.addClass(classes.iconMenu);
            $dom.navigation.css('display', 'none');
            isHiddenNav = !isHiddenNav;
        }
    })
    

});