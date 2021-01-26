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
const allCards = [];
let results = [];

const getCards = async() => {
    const response = await fetch(dataBase);
    const data = await response.json();
    return data;
}

getCards()
    .then(result => {
        result.data.forEach(data => {
            // if (data.type.includes("Monster")) {
            //     allCards.push(data);
            // }
            allCards.push(data);
            // if (!data.type.includes("Monster") && !data.type.includes("Spell") && !data.type.includes("Trap") && !data.type.includes("Token")) {
            //     console.log(data);
            // }

            // create search results for all types of cards
        }) 
        allCards.forEach(card => {
            card.name = card.name.toLowerCase();
        })

        const filterResults = term => {
           results = allCards.filter(card => card.name.includes(term));
           return results;
        }
        
        // filter.addEventListener('click', () => {
        //    results = allCards.sort((a, b) => parseFloat(b.card_prices[0].cardmarket_price) - parseFloat(a.card_prices[0].cardmarket_price))
        // })

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
            searchImg.style.height = '100px';
            searchImg.style.width = '150px';
            container.innerHTML = '';
            const searchItem = input.value.toLowerCase();
            filterResults(searchItem);
            results.forEach(result => {
                if (result.type.includes("Monster")) {
                    let searchResults = document.createElement('div');
                    searchResults.classList.add('search-results');
                    // <i class="fas fa-plus fa-2x"></i>
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

        })

        container.addEventListener('click', e => {
            if (e.target.classList.contains('search-results')) {
                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
               let containerChildren = Array.from(container.children)
               containerChildren.forEach(child => {
                   child.classList.add('hidden');
               })
               let id = e.target.getElementsByTagName('img')[0].src.replace(/\D/g,'');
               allCards.forEach(card => {
                   if (parseInt(id) === card.id) {
                    let cardPrices = card.card_prices[0];
                    let zoom = document.createElement('div');
                    zoom.classList.add('zoom');
                    if (card.type.includes("Monster")) {
                        zoom.innerHTML = 
                        `
                        <button class="add-to-deck"><i class="add fas fa-plus fa-2x"></i></button>
                        <button class="close"><i class="icon fas fa-times fa-2x"></i></button>
                        <h1 class="name">${card.name.toUpperCase()}</h1>
                        <div class="zoomed-image">
                            <img src="${cardImages+id}.jpg" alt="">
                        </div>
                        <div class="zoomed-desc">
                            <p class="monster-type">TYPE: ${card.type.italics()}</p>
                            <p class="id">ID: ${id}</p>
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
                            <img src="${cardImages+id}.jpg" alt="">
                        </div>
                        <div class="zoomed-desc">
                            <p class="monster-type">TYPE: ${card.type.italics()}</p>
                            <p class="id">ID: ${id}</p>
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
                            <img src="${cardImages+id}.jpg" alt="">
                        </div>
                        <div class="zoomed-desc">
                            <p class="monster-type">TYPE: ${card.type.italics()}</p>
                            <p class="id">ID: ${id}</p>
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
                            <img src="${cardImages+id}.jpg" alt="">
                        </div>
                        <div class="zoomed-desc">
                            <p class="monster-type">TYPE: ${card.type.italics()}</p>
                            <p class="id">ID: ${id}</p>
                            <p class="description">DESCRIPTION: ${card.desc.italics()}</p>
                            <p class="price">PRICE: Card Market: $${cardPrices.cardmarket_price.italics()}; Amazon: $${cardPrices.amazon_price.italics()}; Cool Stuff Inc.: $${cardPrices.coolstuffinc_price.italics()}; EBay: $${cardPrices.ebay_price.italics()}; TCG Player: $${cardPrices.tcgplayer_price.italics()}</p>
                        </div>`
                    container.appendChild(zoom);
                    }
                   }
               })
            }
        })

// card in single variable

        document.addEventListener('click', e => {
            if (e.target.classList.contains('add')) {
                let id = e.target.parentNode.parentNode.getElementsByTagName('img')[0].src.replace(/\D/g,'');
                allCards.forEach(card => {
                    if (parseInt(id) === card.id) {
                        let deckBoxEntry = document.createElement('div');
                        deckBoxEntry.classList.add('deck-box-entry');
                        deckBoxEntry.innerHTML = 
                        `<img src="${cardImages+card.id}.jpg">`
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
        })

        let deckTrayState = false;
        let deckTrayChildren = Array.from(deckTray.children);
        openTray.addEventListener('click', () => {
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