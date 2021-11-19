window.scroll({behavior: 'smooth'});
//sections click event
let sections = document.querySelectorAll('body > nav.nav-header .container .sections .section');
sections.forEach(section => {
    section.addEventListener('click', () => {
        window.scrollTo(0, document.querySelector(`section#${section.dataset.scroll}`).offsetTop);

    });
});
let winscroll = false;
window.addEventListener('scroll', () => {
    winscroll = true;
});

setInterval(() => {
    if(winscroll) {
        sections.forEach(section => {
            if(window.scrollY >= document.querySelector(`section#${section.dataset.scroll}`).offsetTop) {
                sections.forEach(sec => sec.classList.remove('active'))
                section.classList.add('active');
            }
        })
        winscroll = false;
    }
}, 100);
//swap between cards
let cards_list = document.querySelectorAll('#main .container .swaper .cards-list');
let newInterval = (scroll,card, next_arrow, prev_arrow) => {

    card.addEventListener('scroll', () => {
        scroll = true;
    });

    setInterval(() => {
        if(scroll === true) {
            if(card.scrollLeft === (card.scrollWidth - card.offsetWidth)) {
                next_arrow.classList.remove('show-arrow');
                next_arrow.classList.add('hide-arrow');
            }else {
                next_arrow.classList.remove('hide-arrow');
                next_arrow.classList.add('show-arrow');
            }
            if(card.scrollLeft === 0) {
                prev_arrow.classList.remove('show-arrow');
                prev_arrow.classList.add('hide-arrow');
            }else {
                prev_arrow.classList.remove('hide-arrow');
                prev_arrow.classList.add('show-arrow');
            }  
    }
    scroll = false;
    }, 150);
}

  
window.addEventListener('load', () => {
    cards_list.forEach(card_list => {
        let next_arrow_card = card_list.parentElement.querySelector('.arrow.next');
        let prev_arrow_card = card_list.parentElement.querySelector('.arrow.prev');
        let myscroll = false;
        newInterval(myscroll, card_list, next_arrow_card, prev_arrow_card);
        let cards = [...card_list.getElementsByClassName('cards-container')[0].getElementsByClassName('card')];
        let element;

        card_list.parentElement.querySelectorAll('.arrow').forEach(arrow => {
            arrow.addEventListener('click', () => {
                //next arrow
                arrow.classList.add('scale-animation');
                arrow.addEventListener('animationend', () => arrow.classList.remove('scale-animation'))
                if(arrow.isEqualNode(next_arrow_card)) {
                    if(card_list.scrollLeft < (card_list.scrollWidth - card_list.clientWidth)) {
                        element = cards.find(card => {
                            let card_real_offset = card.offsetLeft + card.offsetWidth + parseInt(getComputedStyle(card).getPropertyValue('margin-right'));
                            let card_list_real_offset = card_list.offsetWidth + card_list.scrollLeft;
                            return (card_real_offset > card_list_real_offset) && (card !== element);
                        });
                       if(element) {
                            let element_real_offset = element.offsetLeft + element.offsetWidth + parseInt(getComputedStyle(element).getPropertyValue('margin-right'));
                            let card_list_real_offset = card_list.offsetWidth + card_list.scrollLeft;
                            card_list.scrollLeft += (element_real_offset - card_list_real_offset);
                        }
                    }
                }
                //prev arrow
                if(arrow.isEqualNode(prev_arrow_card)) {
                    if(card_list.scrollLeft > 0) {
                        let cards_l = [...cards];
                        cards_l.reverse();
                        element = cards_l.find(card => card.offsetLeft < card_list.scrollLeft && card !== element);
                    if(element) {
                            card_list.scrollLeft -= (card_list.scrollLeft - element.offsetLeft + parseInt(getComputedStyle(element).getPropertyValue('margin-right')));
                        }
                    }
                }
            });
        });    
    });
});
//card compnent
let deals = {
    'Top Deal': 'assets/icons/TOP DEAL.svg',
    "Premimum" : 'assets/icons/PREMIUM.svg'
}
let card_containers = document.querySelectorAll('section .swaper .cards-container');
// let card = ({img = 'assets/images/lucas-sankey-378674.jpg', deal = {'Top Deal': false, 'Premimum': false} , fav, spec = 'Montage de video de promotion', name = 'Simon R.', rate = 4, price = 200}) => {
//     //card
//     let card = document.createElement('div');
//     card.classList.add('card');
//     let src = '';
//     let deal_text = '';
//     if(Object.keys(deal).find(val => deal[val])) {
//         src = deals[Object.keys(deal).find(val => deal[val])];
//         deal_text = Object.keys(deal).find(val => deal[val]);
//         card.innerHTML = `
//         <div class="img_favo">
//             <img class="person_img" src="${img}" alt=""><i class="far fa-star ${fav ? 'star-color' : ''}"></i><div class="deal"><img src="${src}" class="top-deal" alt=""> ${deal_text} </div>
//         </div>
//         <p class="spec">${spec}</p>
//         <div class="name_part">
//             <img src="assets/icons/PROFIL.svg" class="user-logo" alt=""><p class="name">${name}</p>
//         </div>
//         <div class="rate_price">
//             <div class="rate">
//                 ${'<img src="assets/icons/NOTE1.svg" class="circ" alt="">\n'.repeat(rate) + '<img src="assets/icons/NOTE2.svg" class="circ" alt="">'.repeat(5 - rate)}
//             </div>
//             <p class="price">a partir de <span>${price} &euro;</span></p>
//         </div>`;
//    }else {
//     card.innerHTML = `
//         <div class="img_favo">
//             <img class="person_img" src="${img}" alt=""><i class="far fa-star ${fav ? 'star-color' : ''}"></i>
//         </div>
//         <p class="spec">${spec}</p>
//         <div class="name_part">
//             <img src="assets/icons/PROFIL.svg" class="user-logo" alt=""><p class="name">${name}</p>
//         </div>
//         <div class="rate_price">
//             <div class="rate">
//                 ${'<img src="assets/icons/NOTE1.svg" class="circ" alt="">\n'.repeat(rate) + '<img src="assets/icons/NOTE2.svg" class="circ" alt="">'.repeat(5 - rate)}
//             </div>
//             <p class="price">a partir de <span>${price} &euro;</span></p>
//         </div>`;
//    }

  
//     return card;
// }

//append cards using JSON and AJAX :
    //github api
    function card({id, avatar_url = 'assets/images/lucas-sankey-378674.jpg', deal = {'Top Deal': false, 'Premimum': false} , fav, spec = 'Montage de video de promotion', login = 'Simon R.', rate = 4, price = 200})  {
        //card
        let card = document.createElement('div');
        card.classList.add('card');
        price = Math.floor(Math.random() * 250);
        let src = '';
        let deal_text = '';
        if(price <= 20) {
            rate = 1;
        }else if(price > 20 && price <= 80) {
            rate = 2;
        }else if (price > 80 && price <= 150) {
            rate = 3;
        }else if(price > 150 && price <= 200) {
            rate = 4;
        }else {
            rate = 5; 
        }
        if(Object.keys(deal).find(val => deal[val])) {
            src = deals[Object.keys(deal).find(val => deal[val])];
            deal_text = Object.keys(deal).find(val => deal[val]);
            card.innerHTML = `
            <div class="img_favo">
                <img class="person_img" src="${avatar_url}" alt=""><i class="far fa-star ${id % 2 == 0 ? 'star-color' : ''}"></i><div class="deal"><img src="${src}" class="top-deal" alt=""> ${deal_text} </div>
            </div>
            <p class="spec">${spec}</p>
            <div class="name_part">
                <img src="assets/icons/PROFIL.svg" class="user-logo" alt=""><p class="name">${login}</p>
            </div>
            <div class="rate_price">
                <div class="rate">
                    ${'<img src="assets/icons/NOTE1.svg" class="circ" alt="">\n'.repeat(rate) + '<img src="assets/icons/NOTE2.svg" class="circ" alt="">'.repeat(5 - rate)}
                </div>
                <p class="price">a partir de <span>${price} &euro;</span></p>
            </div>`;
       }else {
        card.innerHTML = `
            <div class="img_favo">
                <img class="person_img" src="${avatar_url}" alt=""><i class="far fa-star ${id % 2 == 0 ? 'star-color' : ''}"></i>
            </div>
            <p class="spec">${spec}</p>
            <div class="name_part">
                <img src="assets/icons/PROFIL.svg" class="user-logo" alt=""><p class="name">${login}</p>
            </div>
            <div class="rate_price">
                <div class="rate">
                    ${'<img src="assets/icons/NOTE1.svg" class="circ" alt="">\n'.repeat(rate) + '<img src="assets/icons/NOTE2.svg" class="circ" alt="">'.repeat(5 - rate)}
                </div>
                <p class="price">a partir de <span>${price} &euro;</span></p>
            </div>`;
       }
    
      
        return card;
    }
(function apendCards(){
    let req = new XMLHttpRequest();
    // json package
    // req.open('GET', 'package.json');
    // req.send();
    // req.onload = () => {
    //     let data_obj = JSON.parse(req.responseText);
    //     for(let key in data_obj) {
    //         let card_container = document.querySelector(`main section#${key} .swaper .cards-container`);
    //         let cards_arr = data_obj[key];
    //         cards_arr.map(item => {
    //             console.log(deals[Object.keys(item.deal).find(val =>item.deal[val])]);

    //             card_container.append(card(item));
    //         });
    //     };
    // };

    req.open('GET', 'github_api.json', true);
    req.onload = () => {
        for(let i = 0, j = 0, users = JSON.parse(req.responseText); i < users.length; i++) {
            card_containers[j].append(card(users[i]));
            
            if((i+1) % Math.floor(users.length / card_containers.length) == 0) {
                j++;
            }
        }
        
    }
    req.send();
})();


//add star faivorite
window.addEventListener('click', (e) => {
    if(e.target.classList.contains('fa-star')){
        e.target.classList.toggle('star-color');
    }
});

//fadeIn / fadeOut cards on scroll
let winScroll = false;

window.addEventListener('scroll', () => {
    winScroll = true;

});


card_containers.forEach(card_container => {
    if((window.scrollY + window.innerHeight) >= card_container.getBoundingClientRect().top ) {
        card_container.style.opacity = '1';
    }else {
        card_container.style.opacity = '0';
    }
})

setInterval(() => {
    if(winScroll === true) {

        card_containers.forEach(card_container => {
            if((window.scrollY + window.innerHeight) >= card_container.getBoundingClientRect().top ) {
                card_container.style.opacity = '1';
            }else {
                card_container.style.opacity = '0';
            }
        })


        winScroll = false;
    }
}, 300);
