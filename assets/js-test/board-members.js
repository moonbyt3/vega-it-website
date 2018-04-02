/*cache dom*/
const $dom = {
    boardTable: $('#board-table'),
    boardMembers: $('.board-member'),
    filterButtons: $('.filter-button'),
    showAllButton: $('#button-show-all'),
    modalWindow: $('#modal-window'),
    modalContent: $('.modal-content')[0]
}
/*cache classes*/
const classes = {
    active: 'active',
    hideMember: 'board-members-hide'
}
/*cache attributes*/
const attr = {
    memberPosition: 'data-member-position'
}

let table = document.getElementById('board-table');
let membersDatabase;


$.getJSON("./assets/js-test/members.json", function(members) {
    membersDatabase = members;
    for (let i = 0; i < members.length; i++) {
        table.innerHTML += updateList(members, i);
    }
    fadeInEachElement($('.board-member'));    
});
/*functions*/
function updateList(members, i, index) {
    let desc = members[i].desc.split(';');
    //if there is no index passed set it to i
    index = index ? index : i;
    return `
            <div class="board-member board-member-hide">
                <div class="board-member-picture-wrapper"><img src="./assets/js-test/${members[i].picture ? members[i].picture : `default.jpg` }" alt="" class="board-member-picture" data-member-index="${index}"></div>
                <div class="board-member-content">
                    <h2 class="board-member-name" data-member-index="${index}">${members[i].name}</h2>
                    <span class="board-member-position">${members[i].position}</span>
                    <ul class="board-member-info">
                        <li>${desc[0]}</li>
                        <li>${desc[1]}</li>
                        <li>${members[i].country}</li>
                    </ul>
                    <a class="social-icon" href="http://${members[i].linkedin}"></a>
                    <button class="button button-board-about" data-member-index="${index}">About</button>
                </div>
            </div>
            `;
}
function removeHiddenClass(element) {
    element.classList.remove('board-member-hide');
}

function fadeInEachElement(element) {
    element.each(function(i, el) {
        setTimeout(function(){
            $(el).removeClass('board-member-hide');
        }, i * 200);
    });
}
function notActiveButtons(element, array, activeClass){
    for(let element of array) {
        element.classList.remove(activeClass);
        element.disabled = false;
    }
}
// SHOW ALL button is disabled by default
$dom.showAllButton.prop("disabled", true);
// FILTER BUTTON: filters list by using data-member-position="ROLE-IN-COMPANY" bound to button
for (let button of $dom.filterButtons) {
    $(button).on('click', () => {
        
        // on click change button to active, remove other active classes
        if ($(button).hasClass(classes.active)){
            button.removeClass(classes.active);
        }else {
            notActiveButtons(button, $dom.filterButtons, classes.active);
            $(button).addClass(classes.active);
            button.disabled = true;
        }
        // filter members by data-member-index attribute
        let memberPosition = button.getAttribute(attr.memberPosition);
        let filteredMembers = membersDatabase.filter((member) => {
            return member.position === memberPosition;
        });
        let numberOfMembers = filteredMembers.length;
        let boardTableHeight = 0;
        let numberOfRows = numberOfMembers / 4;
        let deviceWidth = window.innerWidth;
        
        if (deviceWidth > 425) {
            let boardMemberHeight = $('.board-member')[0].offsetHeight;
            // Show all button returns 0 since click on button does not filter
            if (numberOfRows === 0) {
                boardTableHeight = 1400;
            } else {
                boardTableHeight = boardMemberHeight * Math.ceil(numberOfRows);
            }
        }

        table.classList.add(classes.hideMember);
        
        // Wait to hide members first ->
        // _module-board-of-directors.scss line 32
        setTimeout(() => {
            $dom.boardTable.animate({
                height: boardTableHeight + 'px'
            }, 400, () => {
                $dom.boardTable.empty();
                table.classList.remove(classes.hideMember);
                if (filteredMembers.length > 0) {
                    for (let i = 0; i < filteredMembers.length; i++) {
                        // find index of current element in database to populate data-member-index attribute
                        let index = membersDatabase.indexOf(filteredMembers[i]);
                        table.innerHTML += updateList(filteredMembers, i, index);
                        fadeInEachElement($('.board-member'));  
                    }
                }
                let loadedMembers = $('.board-member');
                setTimeout(() => {
                    for (let member of loadedMembers) {
                        removeHiddenClass(member);
                    }
                }, 1000);
            });
        }, 500);
    });
}

// ABOUT BUTTON: shows modal window with more info
$(table).on('click', '.button-board-about, .board-member-picture, .board-member-name', (e) => {
    let index = e.currentTarget.getAttribute('data-member-index');
    // //show modal window and pass data
    $dom.modalWindow.addClass('modal-show');
    $dom.modalContent.innerHTML = `
        <span class="close">×</span>
        <h1>${membersDatabase[index].name}</h1>
        <img class="modal-content-image" src='./assets/js-test/${membersDatabase[index].picture ? membersDatabase[index].picture : 'default.jpg'}'>
        <br>
        <p>${membersDatabase[index].about}</p>
    `;
    //cick on X closes modal window
    let closeIcon = $('.close');
    closeIcon.on('click', () => {
        $dom.modalWindow.removeClass('modal-show');
    })
    //on esc button pressed, close modal window
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === 27) {
            $dom.modalWindow.removeClass('modal-show');
        }
    })
})

// reload all board members
// POSSIBLE REFRACTOR
$dom.showAllButton.on('click', () => {
    table.classList.add(classes.hideMember);
    setTimeout(() => {
        for (var i = 0; i < membersDatabase.length; i++){
            table.innerHTML += updateList(membersDatabase, i);
            fadeInEachElement($('.board-member'));  
        }
    }, 1000);
})
