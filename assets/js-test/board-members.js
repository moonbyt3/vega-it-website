let table = document.getElementById('board-table');
let boardMembers = document.getElementsByClassName('board-member');

let membersDatabase;

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


function fadeInEachMember(element) {
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

// load all members to table
$.getJSON("./assets/js-test/members.json", function(members) {
    membersDatabase = members;
    for (let i = 0; i < members.length; i++) {
        table.innerHTML += updateList(members, i);
    }
    fadeInEachMember($('.board-member'));    
});

let filterButtons = document.getElementsByClassName('filter-button');
let showAllButton = document.getElementById('button-show-all');
// SHOW ALL button is shown as default on load.
showAllButton.disabled = true;
// FILTER BUTTON: filters list by using data-member-position="ROLE-IN-COMPANY" bound to button
for (let button of filterButtons) {
    button.addEventListener('click', () => {
        
        // on click change button to active, remove other active classes
        if (button.classList.contains('active')){
            button.classList.remove('active');
        }else {
            notActiveButtons(button, filterButtons, 'active');
            button.classList.add('active');
            button.disabled = true;
        }
        // filter members by data-member-index attribute
        let memberPosition = button.getAttribute('data-member-position');
        let filteredMembers = membersDatabase.filter((member) => {
            return member.position === memberPosition;
        });
        let numberOfMembers = filteredMembers.length;
        
        let boardTableHeight = 0;
        let numberOfRows = numberOfMembers / 4;
        let deviceWidth = window.innerWidth;
        console.log(deviceWidth);
        // Show all button throws 0
        if (deviceWidth > 425) {
            if (numberOfRows === 0) {
                boardTableHeight = 1400;
            }
            if (numberOfRows > 0 && numberOfRows <= 1) {
                boardTableHeight = 446;
            }
            if (numberOfRows > 1 && numberOfRows <= 2) {
                boardTableHeight = 892;
            }
            if (numberOfRows > 2 && numberOfRows <= 3) {
                boardTableHeight = 1338;
            }
            $('#board-table').animate({
                height: "" + boardTableHeight
            });
        }

        table.classList.add('board-members-hide');

        
        
        // update member list after 1 second
        setTimeout(() => {
            table.innerHTML = "";
            table.classList.remove('board-members-hide');
            for (let i = 0; i < filteredMembers.length; i++) {
                // find index of current element in database to populate data-member-index attribute
                let index = membersDatabase.indexOf(filteredMembers[i]);
                table.innerHTML += updateList(filteredMembers, i, index);
                fadeInEachMember($('.board-member'));  
            }
            let loadedMembers = document.getElementsByClassName('board-member');
            setTimeout(() => {
                for (let member of loadedMembers) {
                    removeHiddenClass(member);
                }
            }, 1000);
        }, 1000);
        
    });
}

// ABOUT BUTTON: shows modal window with more info
$('#board-table').on('click', '.button-board-about, .board-member-picture, .board-member-name', (e) => {
    let index = e.currentTarget.getAttribute('data-member-index');
    let modalWindow = document.getElementById('modal-window');
    let modalWindowContent = document.getElementsByClassName('modal-content')[0];
    modalWindow.classList.add('modal-show');
    // //show modal window and pass data
    modalWindowContent.innerHTML = `
        <span class="close">×</span>
        <h1>${membersDatabase[index].name}</h1>
        <img class="modal-content-image" src='./assets/js-test/${membersDatabase[index].picture ? membersDatabase[index].picture : 'default.jpg'}'>
        <br>
        <p>${membersDatabase[index].about}</p>
    `;
    
    //cick on X closes modal window
    let closeIcon = document.getElementsByClassName('close')[0];
    closeIcon.addEventListener('click', () => {
        modalWindow.classList.remove('modal-show');
    })
    //on esc button pressed, close modal window
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === 27) {
            modalWindow.style.display = 'none';
        }
    })
})

// reload all board members
// POSSIBLE REFRACTOR
showAllButton.addEventListener('click', () => {
    table.classList.add('board-members-hide');
    setTimeout(() => {
        for (var i = 0; i < membersDatabase.length; i++){
            table.innerHTML += updateList(membersDatabase, i);
            fadeInEachMember($('.board-member'));  
        }
    }, 1000);
    
})
