const dataBase = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
const cardImages = 'https://storage.googleapis.com/ygoprodeck.com/pics/';
const cardBox = document.querySelector('.card-box');
const input = document.querySelector('.input');
const searchForm = document.querySelector('.search');
const searchResults = document.querySelector('.search-results')
const resultImage = document.querySelector('.result-image');
const container = document.querySelector('.container');
const filter = document.querySelector('.filter-by-price');
const searchBar = document.querySelector('.search-bar');
const searchImg = document.querySelector('.search-img');
const openTray = document.querySelector('.open-tray');
const deckTray = document.querySelector('.deck-tray');
const deckBody = document.querySelector('.deck-body');
const trayButton = document.querySelector('.tray-button');
const spellCards = document.querySelector('.spell-cards');
const searchButton = document.querySelector('.fa-search');
const mobileNavBar = document.querySelector('.mobile-search-bar');
const filterTray = document.querySelector('.filter-tray');
const filterTrayButton = document.querySelector('.filter-tray-button');
const filters = document.querySelector('.filters');
const checkBoxElems = document.querySelectorAll("input[type='radio']");
const openFilterTray = document.querySelector('.open-filter-tray');
const allCards = [];
let results = [];
let filteredResults = [];
let userDeck = [];

searchImg.addEventListener('click', () => {
    window.location.reload();
})


const getCards = async() => {
    const response = await fetch(dataBase);
    const data = await response.json();
    return data;
}

getCards() // Connect to API and get all the cards
    .then(result => {
        result.data.forEach(data => {
            allCards.push(data); // Push all cards into an array
        }) 
        allCards.forEach(card => {
            card.name = card.name.toLowerCase();
        })


        // The primary search function, called when submitting forms
        const filterResults = term => {
           results = allCards.filter(card => card.name.includes(term));
           return results;
        }

        // filter.addEventListener('click', () => {
        //    results = allCards.sort((a, b) => parseFloat(b.card_prices[0].cardmarket_price) - parseFloat(a.card_prices[0].cardmarket_price))
        // })

        // clear container and replace "results" with the filtered results


        // Filling the DOM when submitting a search
        const filterContainer = toBeFiltered => {
            toBeFiltered.forEach(result => {
                if (result.type.includes("Monster")) {
                    let searchResults = document.createElement('div');
                    searchResults.classList.add('search-results');
                    searchResults.innerHTML = `
                    <button class="add-to-deck"><i class="add fas fa-plus fa-2x"></i></button>
                    <h1 class="name">${result.name.toUpperCase()}</h1>
                    <div class="result-info">
                    <div class="result-image">
                        <img src="${cardImages+result.id}.jpg" alt="">
                    </div>
                    <div class="result-desc">
                        <p class="monster-type">TYPE: ${result.type.italics()}</p>
                        <p class="id">ID: ${result.id}</p>
                        <p class="atk">ATK: ${result.atk}</p>
                        <p class="def">DEF: ${result.def}</p>
                        <p class="level">LEVEL: ${result.level}</p>
                        <p class="description">DESCRIPTION / EFFECT: ${result.desc}</p>
                        <p class="attribute">ATTRIBUTE: ${result.attribute}</p>
                        <p class="price">PRICE: $${result.card_prices[0].cardmarket_price.italics()}</p>
                    </div>
                    </div>`
                    container.appendChild(searchResults);
                }
                if (result.type.includes("Spell") || result.type.includes("Trap")) {
                    let searchResults = document.createElement('div');
                    searchResults.classList.add('search-results');
                    searchResults.innerHTML = `
                    <button class="add-to-deck"><i class="add fas fa-plus fa-2x"></i></button>
                    <h1 class="name">${result.name.toUpperCase()}</h1>
                    <div class="result-info">
                    <div class="result-image">
                        <img src="${cardImages+result.id}.jpg" alt="">
                    </div>
                    <div class="result-desc">
                        <p class="monster-type">TYPE: ${result.type.italics()}</p>
                        <p class="id">ID: ${result.id}</p>
                        <p class="description">EFFECT: ${result.desc}</p>
                        <p class="price">PRICE: $${result.card_prices[0].cardmarket_price.italics()}</p>
                        </div>
                    </div>`
                    container.appendChild(searchResults);
                }
                if (result.type.includes("Token")) {
                    let searchResults = document.createElement('div');
                    searchResults.classList.add('search-results');
                    searchResults.innerHTML = `
                    <button class="add-to-deck"><i class="add fas fa-plus fa-2x"></i></button>
                    <h1 class="name">${result.name.toUpperCase()}</h1>
                    <div class="result-info">
                    <div class="result-image">
                        <img src="${cardImages+result.id}.jpg" alt="">
                    </div>
                    <div class="result-desc">
                        <p class="monster-type">TYPE: ${result.type.italics()}</p>
                        <p class="id">ID: ${result.id}</p>
                        <p class="atk">ATK: ${result.atk}</p>
                        <p class="def">DEF: ${result.def}</p>
                        <p class="level">LEVEL: ${result.level}</p>
                        <p class="attribute">ATTRIBUTE: ${result.attribute}</p>
                        <p class="description">EFFECT: ${result.desc}</p>
                        <p class="price">PRICE: $${result.card_prices[0].cardmarket_price.italics()}</p>
                        </div>
                    </div>`
                    container.appendChild(searchResults);
                }
                if (result.type.includes("Skill")) {
                    let searchResults = document.createElement('div');
                    searchResults.classList.add('search-results');
                    searchResults.innerHTML = `
                    <button class="add-to-deck"><i class="add fas fa-plus fa-2x"></i></button>
                    <h1 class="name">${result.name.toUpperCase()}</h1>
                    <div class="result-info">
                    <div class="result-image">
                        <img src="${cardImages+result.id}.jpg" alt="">
                    </div>
                    <div class="result-desc">
                        <p class="monster-type">TYPE: ${result.type.italics()}</p>
                        <p class="id">ID: ${result.id}</p>
                        <p class="description">EFFECT: ${result.desc}</p>
                        <p class="price">PRICE: $${result.card_prices[0].cardmarket_price.italics()}</p>
                        </div>
                    </div>`
                    container.appendChild(searchResults);
                }
            })
        }

        let checkNum = 0;
        const filterByType = (e) => {
            if (e.target.id === "Spell") {
                if (e.target.checked) {
                    checkNum++;
                    container.innerHTML = '';
                    let filteredResults = results.filter(result => result.type.includes("Spell"));
                    filterContainer(filteredResults);
                } else {
                    checkNum--;
                    container.innerHTML = '';
                    filterContainer(results);
                }
            }
            if (e.target.id === "Trap") {
                if (e.target.checked) {
                    checkNum++;
                    container.innerHTML = '';
                    let filteredResults = results.filter(result => result.type.includes("Trap"));
                    filterContainer(filteredResults);
                } else {
                    checkNum--;
                    container.innerHTML = '';
                    filterContainer(results);
                }
            }
            if (e.target.id === "Monster") {
                if (e.target.checked) {
                    checkNum++;
                    container.innerHTML = '';
                    let filteredResults = results.filter(result => result.type.includes("Monster"));
                    filterContainer(filteredResults);  
                } else {
                    checkNum--;
                    container.innerHTML = ''
                    filterContainer(results);
                }
            }
            if (e.target.id === "None") {
                if (e.target.checked) {
                    container.innerHTML = '';
                    filterContainer(results);
                }
            }
            // for (let i = 0; i < checkBoxElems.length; i++) {
            //     if (checkBoxElems[i].checked) {
            //         checkBoxElems[i].checked = false;
            //     }
            // }
        }
        for (let i = 0; i < checkBoxElems.length; i++) {
            checkBoxElems[i].addEventListener('click', filterByType);
        }

        // What happens when a search is submitted 
        searchForm.addEventListener('submit', e => {
            e.preventDefault();
            var declaration = document.styleSheets[0].rules[3].style;
            var oldValue = declaration.removeProperty('top');
            var oldValue = declaration.removeProperty('left');
            var oldValue = declaration.removeProperty('position');
            var oldValue = declaration.removeProperty('flex-direction');
            var oldValue = declaration.removeProperty('transform');
            var declaration1 = document.styleSheets[0].rules[53].style;
            var oldValue = declaration1.removeProperty('display');
            var declaration3 = document.styleSheets[0].rules[68].style;
            var oldValue = declaration3.removeProperty('display');
            console.log(document.styleSheets[0].rules);
            searchImg.style.height = '100px';
            searchImg.style.width = '150px';
            if (window.screen.width < 750) {
                searchImg.style.height = '70px';
                searchImg.style.width = '100px';
                searchBar.style.display = 'none';
                mobileNavBar.style.display = 'inline-flex';
            }
            container.innerHTML = '';
            const searchItem = input.value.toLowerCase();
            filterResults(searchItem);
            filterContainer(results);
        })

        // When selecting a card from the list, a larger view of the card is presented
        const zoom = cardIdNum => {
            allCards.forEach(card => {
                if (parseInt(cardIdNum) === card.id) {
                    let cardPrices = card.card_prices[0];
                    let zoom = document.createElement('div');
                    zoom.classList.add('zoom');
                    if (card.type.includes("Monster")) {
                        zoom.innerHTML = 
                        `<button class="add-to-deck"><i class="add fas fa-plus fa-2x"></i></button>
                        <button class="close"><i class="icon fas fa-times fa-2x"></i></button>
                        <h1 class="name">${card.name.toUpperCase()}</h1>
                        <div class="zoomed-image">
                            <img src="${cardImages+cardIdNum}.jpg" alt="">
                        </div>
                        <div class="zoomed-desc">
                            <p class="monster-type">TYPE: ${card.type.italics()}</p>
                            <p class="id">ID: ${cardIdNum}</p>
                            <p class="atk">ATK: ${card.atk}</p>
                            <p class="def">DEF: ${card.def}</p>
                            <p class="level">LEVEL: ${card.level}</p>
                            <p class="attribute">ATTRIBUTE: ${card.attribute.italics()}</p>
                            <p class="description">DESCRIPTION: ${card.desc.italics()}</p>
                            <p class="price">PRICE: Card Market: $${cardPrices.cardmarket_price.italics()}; Amazon: $${cardPrices.amazon_price.italics()}; Cool Stuff Inc.: $${cardPrices.coolstuffinc_price.italics()}; EBay: $${cardPrices.ebay_price.italics()}; TCG Player: $${cardPrices.tcgplayer_price.italics()}</p>
                        </div>`
                    container.appendChild(zoom);
                    }
                    if (card.type.includes("Spell") || card.type.includes("Trap")) {
                        zoom.innerHTML = 
                        `
                        <button class="add-to-deck"><i class="add fas fa-plus fa-2x"></i></button>
                        <button class="close"><i class="icon fas fa-times fa-2x"></i></button>
                        <h1 class="name">${card.name.toUpperCase()}</h1>
                        <div class="zoomed-image">
                            <img src="${cardImages+cardIdNum}.jpg" alt="">
                        </div>
                        <div class="zoomed-desc">
                            <p class="monster-type">TYPE: ${card.type.italics()}</p>
                            <p class="id">ID: ${cardIdNum}</p>
                            <p class="description">DESCRIPTION: ${card.desc.italics()}</p>
                            <p class="price">PRICE: Card Market: $${cardPrices.cardmarket_price.italics()}; Amazon: $${cardPrices.amazon_price.italics()}; Cool Stuff Inc.: $${cardPrices.coolstuffinc_price.italics()}; EBay: $${cardPrices.ebay_price.italics()}; TCG Player: $${cardPrices.tcgplayer_price.italics()}</p>
                        </div>`
                    container.appendChild(zoom);
                    }
                    if (card.type.includes("Token")) {
                        zoom.innerHTML = 
                        `
                        <button class="add-to-deck"><i class="add fas fa-plus fa-2x"></i></button>
                        <button class="close"><i class="icon fas fa-times fa-2x"></i></button>
                        <h1 class="name">${card.name.toUpperCase()}</h1>
                        <div class="zoomed-image">
                            <img src="${cardImages+cardIdNum}.jpg" alt="">
                        </div>
                        <div class="zoomed-desc">
                            <p class="monster-type">TYPE: ${card.type.italics()}</p>
                            <p class="id">ID: ${cardIdNum}</p>
                            <p class="atk">ATK: ${card.atk}</p>
                            <p class="def">DEF: ${card.def}</p>
                            <p class="level">LEVEL: ${card.level}</p>
                            <p class="attribute">ATTRIBUTE: ${card.attribute.italics()}</p>
                            <p class="description">DESCRIPTION: ${card.desc.italics()}</p>
                            <p class="price">PRICE: Card Market: $${cardPrices.cardmarket_price.italics()}; Amazon: $${cardPrices.amazon_price.italics()}; Cool Stuff Inc.: $${cardPrices.coolstuffinc_price.italics()}; EBay: $${cardPrices.ebay_price.italics()}; TCG Player: $${cardPrices.tcgplayer_price.italics()}</p>
                        </div>`
                    container.appendChild(zoom);
                    }
                    if (card.type.includes("Skill")) {
                        zoom.innerHTML = 
                        `
                        <button class="add-to-deck"><i class="add fas fa-plus fa-2x"></i></button>
                        <button class="close"><i class="icon fas fa-times fa-2x"></i></button>
                        <h1 class="name">${card.name.toUpperCase()}</h1>
                        <div class="zoomed-image">
                            <img src="${cardImages+cardIdNum}.jpg" alt="">
                        </div>
                        <div class="zoomed-desc">
                            <p class="monster-type">TYPE: ${card.type.italics()}</p>
                            <p class="id">ID: ${cardIdNum}</p>
                            <p class="description">DESCRIPTION: ${card.desc.italics()}</p>
                            <p class="price">PRICE: Card Market: $${cardPrices.cardmarket_price.italics()}; Amazon: $${cardPrices.amazon_price.italics()}; Cool Stuff Inc.: $${cardPrices.coolstuffinc_price.italics()}; EBay: $${cardPrices.ebay_price.italics()}; TCG Player: $${cardPrices.tcgplayer_price.italics()}</p>
                        </div>`
                    container.appendChild(zoom);
                    }
                }
            })
       }


       // Hiding all the other search results when a card is selected for bigger view
        container.addEventListener('click', e => {
            if (e.target.classList.contains('search-results')) {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
               let containerChildren = Array.from(container.children)
               containerChildren.forEach(child => {
                   child.classList.add('hidden');
               })
               let id = e.target.getElementsByTagName('img')[0].src.replace(/\D/g,'');
               zoom(id);
            }
        })


        // Deck management 
        document.addEventListener('click', e => {
            if (e.target.classList.contains('add')) {
                let id = e.target.parentNode.parentNode.getElementsByTagName('img')[0].src.replace(/\D/g,'');
                allCards.forEach(card => {
                    if (parseInt(id) === card.id) {
                        userDeck.push(card);
                        let deckBoxEntry = document.createElement('div');
                        let deckBoxEntryButtons = document.createElement('div');
                        deckBoxEntryButtons.classList.add('deck-box-entry-buttons');
                        deckBoxEntryButtons.innerHTML = 
                            `<button class="tray-card-view">View</button>
                            <button class="tray-card-delete">Delete</button>`
                        deckBoxEntry.classList.add('deck-box-entry');
                        deckBoxEntry.innerHTML = `<img src="${cardImages+card.id}.jpg">`
                        deckBoxEntry.appendChild(deckBoxEntryButtons);
                        deckBody.appendChild(deckBoxEntry)
                        let notification = document.createElement('div');
                        notification.classList.add('notification');
                        notification.textContent = 'Card Added to Deck';
                        container.appendChild(notification);
                        notification.style.opacity = 1;
                        setTimeout(() => {
                            notification.style.opacity = 0;
                        }, 2000)
                    }
                })
            }
            if (e.target.classList.contains('icon')) {
                let parent = e.target.parentNode.parentNode;
                parent.style.display = 'none';
                let containerChildren = Array.from(container.children);
                containerChildren.forEach(child => {
                    child.classList.remove('hidden');
                })
            }
            if (e.target.classList.contains('tray-card-delete')) {
                let id = parseInt(e.target.parentNode.previousSibling.src.replace(/\D/g,''));
                console.log(e.target.parentNode.parentNode);
                e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode);
                userDeck.forEach(card => {
                    if (id === card.id) {
                        let toRemove = userDeck.indexOf(card);
                        userDeck.splice(toRemove, 1);
                    }
                })
                let notification = document.createElement('div');
                notification.classList.add('notification');
                notification.textContent = 'Card Deleted';
                deckBody.appendChild(notification);
                notification.style.opacity = 1;
                setTimeout(() => {
                    notification.style.opacity = 0;
                }, 2000)
            }
            if (e.target.classList.contains('tray-card-view')) {
                let id = parseInt(e.target.parentNode.previousSibling.src.replace(/\D/g,''));
                let containerChildren = Array.from(container.children)
                containerChildren.forEach(child => {
                   child.classList.add('hidden');
                })
                zoom(id);
            }
            if (e.target.classList.contains('fa-th')) {
                openTrayFunction();
            }

            if (e.target.classList.contains('fa-sliders-h')) {
                if (!filterTrayToggle) {
                    filterTray.style.width = '450px';
                    if (window.screen.width < 750) {
                        filterTray.style.width = '100%';
                    }
                    filterTrayToggle = true;
                    setTimeout(() => {
                        filters.style.opacity = 1;
                    }, 600)
                }
            }
            if (e.target.classList.contains('open-filter-tray')) {
                if (!filterTrayToggle) {
                    filterTray.style.width = '450px';
                    if (window.screen.width < 750) {
                        filterTray.style.width = '100%';
                    }
                    filterTrayToggle = true;
                    setTimeout(() => {
                        filters.style.opacity = 1;
                    }, 600)
                } 
            }
            if (e.target.classList.contains('filter-tray-button')) {
                if (filterTrayToggle) {
                    filterTray.style.width = 0;
                    filterTrayToggle = false;
                    filters.style.opacity = 0;
                }
            }
        })

        let filterTrayToggle = false;

        // Creating a search function for mobile
        let mobileSearchInputToggle = false;
        let mobileSearchForm = document.createElement('form');
        let mobileSearchInput = document.createElement('input');
        mobileSearchForm.classList.add('mobile-search-form');
        mobileSearchInput.classList.add('mobile-search-input');
        mobileSearchInput.type = 'text';
        mobileSearchInput.placeholder = "Search...";
        mobileSearchForm.appendChild(mobileSearchInput);
        searchButton.addEventListener('click', () => {
            if (!mobileSearchInputToggle) {
                container.prepend(mobileSearchForm);
                mobileSearchInputToggle = true;
                mobileSearchInput.style.height = '50px';
            } else {
                mobileSearchInput.style.height = '0px';
                container.removeChild(mobileSearchForm);
                    mobileSearchInput.style.height = 0;
                mobileSearchInputToggle = false;
            }
        })


        // What happens when submitting a form on mobile
        mobileSearchForm.addEventListener('submit', e => {
            e.preventDefault();
            container.removeChild(mobileSearchForm);
            mobileSearchInputToggle = false;
            container.innerHTML = '';
            let searchEntry = mobileSearchInput.value.toLowerCase();
            filterResults(searchEntry);
            filterContainer(results);
        })

        // Using icons to open and close the deck tray
        let deckTrayState = false;
        let deckTrayChildren = Array.from(deckTray.children);

        const openTrayFunction = () => {
            if (!deckTrayState) {
                deckTray.style.width = '450px';
                if (window.screen.width < 750) {
                    deckTray.style.width = '100%'
                }
                openTray.textContent = 'Close Deck';
                deckTray.ontransitionend = () => {
                    deckTrayChildren.forEach(child => {
                        child.style.opacity = 99;
                    })
                }
                deckTrayState = true;
            } else {
                deckTray.style.width = 0;
                deckTrayState = false;
                openTray.textContent = 'Open Deck';
                deckTrayChildren.forEach(child => {
                    child.style.opacity = 0;
                })
            }
        }


        openTray.addEventListener('click', () => {
            openTrayFunction();
        })
        trayButton.addEventListener('click', () => {
            if (deckTrayState) {
                deckTray.style.width = 0;
                deckTrayState = false;
                openTray.textContent = 'Open Deck';
                deckTrayChildren.forEach(child => {
                    child.style.opacity = 0;
                })
            }
        })
    })
