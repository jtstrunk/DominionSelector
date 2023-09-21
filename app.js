async function fetchCards(cardType) {
    let res = await fetch(`http://127.0.0.1:5000/type?cardType=${cardType}`);
    let cards = await res.json();
    return cards;
}

function defaultCase(){
    let imgs = document.getElementsByTagName('img')
    for(let img of imgs){
        if(img.classList.contains("Show")){
            img.classList.remove("Show");
            img.classList.add("Hide");
        }
    }

}

function hideCards(cardType) {
    let container = document.querySelector("#cards");
    container.classList.remove("show-all")
    let cards = document.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i++){
        cards[i].classList.add("Hide")
    }

    console.log("CLICKED ON")
    fetch(`/cards?cardType=${cardType}`)
    .then(response => response.json())
    .then(data => {
        let type = document.querySelector(`#${cardType}`)
        let sorts = document.querySelectorAll(".sort");
        let selectedCount = 0;
        showingCards = document.querySelectorAll(".Show")

        for (let i = 0; i < sorts.length; i++) {
            if (sorts[i].classList.contains("selected")) {
              selectedCount++;
            }
        }
        let toShow = []
        console.log(selectedCount)
 
        if(type.classList.contains("deselected")) {
            // Removing a filter
            let card = ''
            if (selectedCount > 1) {
                let showTheseCards = [];
                let num = 0;
                let promises = []
                for (let i = 0; i < sorts.length; i++) {
                    if (sorts[i].classList.contains("selected")) {
                        let search = sorts[i].id
                        let promise = fetch(`/cards?cardType=${search}`)
                        .then(response => response.json())
                        .then(data => {
                            if(num == 0) {
                                showTheseCards.push(...data)
                            } else if (num > 0) {
                                showTheseCards = showTheseCards.filter(element => data.includes(element));
                            }
                            num++
                        })
                        promises.push(promise);
                        
                    }
                    
                }
                // Only running after every promise has finished
                Promise.all(promises).then(() => {
                    // loop over showingCards and remove hide and add show
                    for(let i = 0; i <showTheseCards.length; i++) {
                        let newelement = document.querySelector(`#${showTheseCards[i]}`)
                        newelement.classList.remove("Hide");
                        newelement.classList.add("Show");
                    }

                })

                
            } else if (selectedCount == 0) {

                for (let j = 0; j < cards.length; j++){
                    if (cards[j].classList.contains("Hide")){
                        cards[j].classList.remove("Hide");
                        cards[j].classList.remove("Show");
                    }
                }
                toShow = []
                showTheseCards = []
                promises = []
            } else {
                // if one thing is selected
                for (let i = 0; i < sorts.length; i++) {
                    if (sorts[i].classList.contains("selected")) {
                        card = sorts[i].id
                    }
                }

                fetch(`/cards?cardType=${card}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    for (let i = 0; i < cards.length; i++){
                        cards[i].classList.add("Hide")
                    }

                    for(let i = 0; i < data.length; i++) {
                        let newelement = document.querySelector(`#${data[i]}`)
                        newelement.classList.remove("Hide");
                        newelement.classList.add("Show");
                    }

                })
            }

        } else if (type.classList.contains("selected")) {
            // Adding a filter
            for(let i = 0; i < data.length; i++) {
                let element = document.querySelector(`#${data[i]}`)
    
                if (selectedCount > 1) {
                    for(let j = 0; j < showingCards.length; j++){
                        
                        if (element == showingCards[j] ){
                            toShow.push(element.id)
                        }
                    }                    
                } 
                else {
                    if(element.classList.contains("Hide")){
                        element.classList.remove("Hide");
                        element.classList.add("Show");
                    }
        
                }
    
            }
    
            if(selectedCount > 1){
                for (let i = 0; i < cards.length; i++){
                    cards[i].classList.add("Hide")
                    cards[i].classList.remove("Show")
                }
                for (let i = 0; i < toShow.length; i++) {
                    let element = document.querySelector(`#${toShow[i]}`);
                    element.classList.remove("Hide");
                    element.classList.add("Show");
                }
            }

        }

    })
    .catch(error => {
        // Handle any errors
        console.log(error);
    });

}


//
let categories = document.getElementsByClassName('categories');
let type = document.getElementsByClassName('type');

for(let i=0; i <categories.length;i++){
    categories[i].addEventListener('click', function(){
        playerSelect(event);
    })
}

for(let i=0; i <type.length;i++){
    type[i].addEventListener('click', function(){
        playerSelect(event);
    })
}

function playerSelect(event) {
    let btn = event.target;
    if(!btn.classList.contains("selected")){
        btn.classList.add("selected");
        btn.classList.remove("deselected");
        
    } else {
        btn.classList.add("deselected");
        btn.classList.remove("selected");
    }
}

let attackBTN = document.querySelector("#attack");
attackBTN.addEventListener('click', () => hideCards("attack"));

let actionBTN = document.querySelector("#action");
actionBTN.addEventListener('click', () => hideCards("action"));

let durationBTN = document.querySelector("#duration");
durationBTN.addEventListener('click', () => hideCards("duration"));

let victoryBTN = document.querySelector("#victory");
victoryBTN.addEventListener('click', () => hideCards("victory"));

let treasureBTN = document.querySelector("#treasure");
treasureBTN.addEventListener('click', () => hideCards("treasure"));

let reactionBTN = document.querySelector("#reaction");
reactionBTN.addEventListener('click', () => hideCards("reaction"));

let villageBTN = document.querySelector("#village");
villageBTN.addEventListener('click', () => hideCards("village"));

let cantripBTN = document.querySelector("#cantrip");
cantripBTN.addEventListener('click', () => hideCards("cantrip"));

let gainerBTN = document.querySelector("#gainer");
gainerBTN.addEventListener('click', () => hideCards("gainer"));

let trasherBTN = document.querySelector("#trasher");
trasherBTN.addEventListener('click', () => hideCards("trasher"));

let sifterBTN = document.querySelector("#sifter");
sifterBTN.addEventListener('click', () => hideCards("sifter"));

let terminalDrawBTN = document.querySelector("#terminalDraw");
terminalDrawBTN.addEventListener('click', () => hideCards("terminalDraw"));

let terminalSilverBTN = document.querySelector("#terminalSilver");
terminalSilverBTN.addEventListener('click', () => hideCards("terminalSilver"));

const cardsDiv = document.querySelector("#selcards");
const imgs = document.querySelectorAll("img");
const maxMiniCards = 10;
let alertElement = document.querySelector("#alert");

for (let i = 0; i < imgs.length; i++) {
  imgs[i].addEventListener('click', () => {

    const existingImg = document.querySelector(`#Mini${imgs[i].id}`);
    if (existingImg) {
        alertElement.textContent = "Card Already Added"

    } else if (cardsDiv.querySelectorAll(".miniCard").length < maxMiniCards) {
        alertElement.textContent = ""
        console.log(imgs[i].id);
        console.log(imgs[i].classList[1]);

        let newImg = document.createElement("img");
        newImg.src = `static/images/${imgs[i].classList[1]}/200px-${imgs[i].id}.jpg`;
        // newImg.classList.add("card")
        newImg.classList.add("miniCard")
        newImg.id = `Mini${imgs[i].id}`
        newImg.addEventListener('click', () => {
            newImg.remove();
            alertElement.textContent = ""
        });
        console.log(newImg)
        cardsDiv.appendChild(newImg);
    } else {
        
        alertElement.textContent = "Maximum Cards Reached"
    }

    
  });

}


let selectedCardsBTN = document.querySelector("#selectedCardsbtn");
let randomCardsBTN = document.querySelector("#randomCardsbtn");
let clearBTN = document.querySelector("#clearSele");
let fillBTN = document.querySelector("#randomFill");

let popUP = document.querySelector("#popUP");


selectedCardsBTN.addEventListener('click', () => {
    let playingCards = document.querySelectorAll(".miniCard");
    console.log(playingCards)
    popUP.classList.remove("Hide")
});

randomCardsBTN.addEventListener('click', () => {
    let playingCards = []
    let cards = document.querySelectorAll(".card");
    for (let i = 0; i < 10; i++){
        console.log("generate new card");
        let randNum = Math.floor(Math.random() * (cards.length - 1 + 1))
        console.log(randNum)
        let card = imgs[randNum]
        playingCards.push(card)
        
    }
    console.log(playingCards)
    popUP.classList.remove("Hide")
});

clearBTN.addEventListener('click', () => {
    let miniCards = document.querySelectorAll(".miniCard");
    miniCards.forEach(card => card.remove());
    alertElement.textContent = ""
});

fillBTN.addEventListener('click', () => {
    let cards = document.querySelectorAll(".card");
    console.log(cards.length);

    let minicards = document.querySelectorAll(".miniCard");
    console.log(minicards.length);

    for (let i = minicards.length; i < 10; i++){
        console.log("generate new card");
        let randNum = Math.floor(Math.random() * (cards.length - 1 + 1))
        console.log(randNum)

        
        let newImg = document.createElement("img");
        newImg.src = `static/images/${imgs[randNum].classList[1]}/200px-${imgs[randNum].id}.jpg`;
        newImg.classList.add("miniCard")
        cardsDiv.appendChild(newImg);
        newImg.id = `Mini${imgs[i].id}`
    }

})

let playerCount = document.querySelector("#playerCount");
let currValue = 0;
let names = document.querySelector("#names")

playerCount.addEventListener('change', () => {
    console.log("joshy washy")
    console.log(playerCount.value)
    console.log(currValue)
    
    if (currValue === 0){
        for (let i = 0; i < playerCount.value; i++){
            newName = document.createElement("input");
            newName.id = `name${i + 1}`
            newName.classList.add("nameInput")

            names.appendChild(newName);

        }
        currValue = playerCount.value;
    } else if (currValue < playerCount.value) {
        // delete reverse
        console.log("MORE")
        let inputs = document.querySelectorAll(".nameInput");
        console.log(inputs)
        console.log(inputs.length)
        console.log(playerCount.value)
        for (let j = inputs.length; j < playerCount.value; j++) {
            console.log("val")
            console.log(j)
            newName = document.createElement("input");
            newName.id = `name${j}`
            newName.classList.add("nameInput")

            names.appendChild(newName);
        }
        currValue = playerCount.value;
    } else if (currValue > playerCount.value) {
        // add
        console.log("Less")
        let inputs = document.querySelectorAll(".nameInput");
        console.log(inputs)
        currValue = playerCount.value;

        console.log(inputs)
        console.log(inputs.length)
        console.log(playerCount.value)

        // let diff = inputs.length - playerCount.value;

        // console.log("diff")
        // console.log(diff)

        for (let j = inputs.length; j > playerCount.value; j--) {
            console.log("MINUS")
            console.log(inputs[j - 1])

            inputs[j - 1].remove();
        }
    }

})

function minusclicked(element){
    console.log("MINUS");
    let val = element.id.match(/\d+$/)[0];
    let card = element.id.substring(0, element.id.indexOf("minus"));
    let newEle = card + `AmountP${val}`;
    let changing = document.querySelector(`#${newEle}`);
    changing.innerText = parseInt(changing.innerText) - 1;
}

function plusclicked(element){
    let val = element.id.match(/\d+$/)[0];
    let card = element.id.substring(0, element.id.indexOf("plus"));
    let newEle = card + `AmountP${val}`;
    let changing = document.querySelector(`#${newEle}`);
    changing.innerText = parseInt(changing.innerText) + 1;
}

let createGame = document.querySelector("#createGame");
let scoreCards = document.querySelector("#scoreCards");

createGame.addEventListener('click', () => {
    console.log("Create Game");
    let players = document.querySelector("#playerCount").value
    console.log(players);
    let test = document.querySelector("#test");
    let sets = document.querySelector("#sets");

    let selcards = [];
    let selectedCards = document.querySelectorAll(".miniCard");

    for (let card of selectedCards){
        let shortenedName = card.id.substring(4);
        selcards.push(shortenedName);
    }
    console.log("cards");
    console.log(selcards);

    for(let i = 0; i < players; i++) {
        newPlayer = document.createElement("div");
        newPlayer.id = `player${i+1}`;
        newPlayer.classList.add("player");
        scoreCards.appendChild(newPlayer);

        PlayerInfo = document.createElement("div");
        newPlayer.appendChild(PlayerInfo);
        playerName = document.createElement("p");
        let name = document.querySelector(`#name${i+1}`);
        console.log('name');
        console.log(name);
        playerName.innerText = name.value;
        playerPoints = document.createElement("p");
        playerPoints.innerText = `3`;
        PlayerInfo.appendChild(playerName);
        PlayerInfo.appendChild(playerPoints);


        newCards = document.createElement("div");
        newCards.classList.add("scoreKeeper");
        newPlayer.appendChild(newCards);

        cardsBTNminus = document.createElement("button");
        cardsBTNminus.classList.add("minus");
        cardsBTNminus.innerText = "-";
        cardsBTNminus.id = `cardsminusPlayer${i+1}`;
        cardsAmount = document.createElement("span");
        cardsAmount.id = `cardsAmountP${i+1}`
        cardsAmount.value = "10";
        cardsAmount.innerText = cardsAmount.value;
        cardsBTNplus = document.createElement("button");
        cardsBTNplus.classList.add("plus");
        cardsBTNplus.innerText = "+";
        cardsBTNplus.id = `cardsplusPlayer${i+1}`;
        cards = document.createElement("p");
        cards.innerText = "Cards";
        cards.classList.add("fixing");

        newCards.appendChild(cardsBTNminus);
        newCards.appendChild(cardsAmount);
        newCards.appendChild(cardsBTNplus);
        newCards.appendChild(cards);


        newEstate = document.createElement("div");
        newEstate.classList.add("scoreKeeper");
        newPlayer.appendChild(newEstate);
        estateBTNminus = document.createElement("button");
        estateBTNminus.classList.add("minus");
        estateBTNminus.innerText = "-";
        estateBTNminus.id = `estateminusPlayer${i+1}`;
        estateAmount = document.createElement("span");
        estateAmount.id = `estateAmountP${i+1}`
        estateAmount.value = "3";
        estateAmount.innerText = estateAmount.value;
        estateBTNplus = document.createElement("button");
        estateBTNplus.classList.add("plus");
        estateBTNplus.innerText = "+";
        estateBTNplus.id = `estateplusPlayer${i+1}`;
        estate = document.createElement("p");
        estate.innerText = "Estate";
        estate.classList.add("fixing");
        newEstate.appendChild(estateBTNminus);
        newEstate.appendChild(estateAmount);
        newEstate.appendChild(estateBTNplus);
        newEstate.appendChild(estate);

        newDuchy = document.createElement("div");
        newDuchy.classList.add("scoreKeeper");
        newPlayer.appendChild(newDuchy);
        duchyBTNminus = document.createElement("button");
        duchyBTNminus.classList.add("minus");
        duchyBTNminus.innerText = "-";
        duchyBTNminus.id = `duchyminusPlayer${i+1}`;
        duchyAmount = document.createElement("span");
        duchyAmount.id = `duchyAmountP${i+1}`;
        duchyAmount.value = "0";
        duchyAmount.innerText = duchyAmount.value;
        duchyBTNplus = document.createElement("button");
        duchyBTNplus.classList.add("plus");
        duchyBTNplus.innerText = "+";
        duchyBTNplus.id = `duchyplusPlayer${i+1}`;
        duchy = document.createElement("p");
        duchy.innerText = "Duchy";
        duchy.classList.add("fixing");
        newDuchy.appendChild(duchyBTNminus);
        newDuchy.appendChild(duchyAmount);
        newDuchy.appendChild(duchyBTNplus);
        newDuchy.appendChild(duchy);

        newProvince = document.createElement("div");
        newProvince.classList.add("scoreKeeper");
        newPlayer.appendChild(newProvince);
        provinceBTNminus = document.createElement("button");
        provinceBTNminus.classList.add("minus");
        provinceBTNminus.innerText = "-";
        provinceBTNminus.id = `provinceminusPlayer${i+1}`;
        provinceAmount = document.createElement("span");
        provinceAmount.id = `provinceAmountP${i+1}`
        provinceAmount.value = "0";
        provinceAmount.innerText = provinceAmount.value;
        provinceBTNplus = document.createElement("button");
        provinceBTNplus.classList.add("plus");
        provinceBTNplus.innerText = "+";
        provinceBTNplus.id = `provinceplusPlayer${i+1}`;
        province = document.createElement("p");
        province.innerText = "Province";
        province.classList.add("fixing");
        newProvince.appendChild(provinceBTNminus);
        newProvince.appendChild(provinceAmount);
        newProvince.appendChild(provinceBTNplus);
        newProvince.appendChild(province);

    }

    if (selcards.includes("Gardens")) {
        console.log("Contains Gardens");
        for(let i = 0; i < players; i++) {
            let addplayer = document.querySelector(`#player${i+1}`);
            newGardens = document.createElement("div");
            newGardens.classList.add("scoreKeeper");
            addplayer.appendChild(newGardens);
            gardensBTNminus = document.createElement("button");
            gardensBTNminus.classList.add("minus");
            gardensBTNminus.innerText = "-";
            gardensBTNminus.id = `gardensminusPlayer${i+1}`;
            gardensAmount = document.createElement("span");
            gardensAmount.id = `gardensAmountP${i+1}`
            gardensAmount.value = "0";
            gardensAmount.innerText = gardensAmount.value;
            gardensBTNplus = document.createElement("button");
            gardensBTNplus.classList.add("plus");
            gardensBTNplus.innerText = "+";
            gardensBTNplus.id = `gardensplusPlayer${i+1}`;
            gardens = document.createElement("p");
            gardens.innerText = "Gardens";
            gardens.classList.add("fixing");
            newGardens.appendChild(gardensBTNminus);
            newGardens.appendChild(gardensAmount);
            newGardens.appendChild(gardensBTNplus);
            newGardens.appendChild(gardens);
        }
    }
    if (selcards.includes("Nobles")) {
        console.log("Contains Nobles");
        for(let i = 0; i < players; i++) {
            let addplayer = document.querySelector(`#player${i+1}`);
            newNobles = document.createElement("div");
            newNobles.classList.add("scoreKeeper");
            addplayer.appendChild(newNobles);
            noblesBTNminus = document.createElement("button");
            noblesBTNminus.classList.add("minus");
            noblesBTNminus.innerText = "-";
            noblesBTNminus.id = `noblesminusPlayer${i+1}`;
            noblesAmount = document.createElement("span");
            noblesAmount.id = `noblesAmountP${i+1}`
            noblesAmount.value = "0";
            noblesAmount.innerText = noblesAmount.value;
            noblesBTNplus = document.createElement("button");
            noblesBTNplus.classList.add("plus");
            noblesBTNplus.innerText = "+";
            noblesBTNplus.id = `noblesplusPlayer${i+1}`;
            nobles = document.createElement("p");
            nobles.innerText = "Nobles";
            nobles.classList.add("fixing");
            newNobles.appendChild(noblesBTNminus);
            newNobles.appendChild(noblesAmount);
            newNobles.appendChild(noblesBTNplus);
            newNobles.appendChild(nobles);
        }
    }
    if (selcards.includes("Island")) {
        console.log("Contains Island");
        for(let i = 0; i < players; i++) {
            let addplayer = document.querySelector(`#player${i+1}`);
            newIsland = document.createElement("div");
            newIsland.classList.add("scoreKeeper");
            addplayer.appendChild(newIsland);
            islandBTNminus = document.createElement("button");
            islandBTNminus.classList.add("minus");
            islandBTNminus.innerText = "-";
            islandBTNminus.id = `islandminusPlayer${i+1}`;
            islandAmount = document.createElement("span");
            islandAmount.id = `islandAmountP${i+1}`
            islandAmount.value = "0";
            islandAmount.innerText = islandAmount.value;
            islandBTNplus = document.createElement("button");
            islandBTNplus.classList.add("plus");
            islandBTNplus.innerText = "+";
            islandBTNplus.id = `islandplusPlayer${i+1}`;
            island = document.createElement("p");
            island.innerText = "Island";
            island.classList.add("fixing");
            newIsland.appendChild(islandBTNminus);
            newIsland.appendChild(islandAmount);
            newIsland.appendChild(islandBTNplus);
            newIsland.appendChild(island);
        }
    }
    if (selcards.includes("Harem")) {
        console.log("Contains Harem");
        for(let i = 0; i < players; i++) {
            let addplayer = document.querySelector(`#player${i+1}`);
            newHarem = document.createElement("div");
            newHarem.classList.add("scoreKeeper");
            addplayer.appendChild(newHarem);
            haremBTNminus = document.createElement("button");
            haremBTNminus.classList.add("minus");
            haremBTNminus.innerText = "-";
            haremBTNminus.id = `haremminusPlayer${i+1}`;
            haremAmount = document.createElement("span");
            haremAmount.id = `haremAmountP${i+1}`
            haremAmount.value = "0";
            haremAmount.innerText = haremAmount.value;
            haremBTNplus = document.createElement("button");
            haremBTNplus.classList.add("plus");
            haremBTNplus.innerText = "+";
            haremBTNplus.id = `haremplusPlayer${i+1}`;
            harem = document.createElement("p");
            harem.innerText = "Harem";
            harem.classList.add("fixing");
            newHarem.appendChild(haremBTNminus);
            newHarem.appendChild(haremAmount);
            newHarem.appendChild(haremBTNplus);
            newHarem.appendChild(harem);
        }

    }
    if (selcards.includes("Duke")) {
        console.log("Contains Duke");
        for(let i = 0; i < players; i++) {
            let addplayer = document.querySelector(`#player${i+1}`);
            newDuke = document.createElement("div");
            newDuke.classList.add("scoreKeeper");
            addplayer.appendChild(newDuke);
            dukeBTNminus = document.createElement("button");
            dukeBTNminus.classList.add("minus");
            dukeBTNminus.innerText = "-";
            dukeBTNminus.id = `dukeminusPlayer${i+1}`;
            dukeAmount = document.createElement("span");
            dukeAmount.id = `dukeAmountP${i+1}`
            dukeAmount.value = "0";
            dukeAmount.innerText = dukeAmount.value;
            dukeBTNplus = document.createElement("button");
            dukeBTNplus.classList.add("plus");
            dukeBTNplus.innerText = "+";
            dukeBTNplus.id = `dukeplusPlayer${i+1}`;
            duke = document.createElement("p");
            duke.innerText = "Duke";
            duke.classList.add("fixing");
            newDuke.appendChild(dukeBTNminus);
            newDuke.appendChild(dukeAmount);
            newDuke.appendChild(dukeBTNplus);
            newDuke.appendChild(duke);
        }

    }
    if (selcards.includes("Mill")) {
        console.log("Contains Mill");
        for(let i = 0; i < players; i++) {
            let addplayer = document.querySelector(`#player${i+1}`);
            newMill = document.createElement("div");
            newMill.classList.add("scoreKeeper");
            addplayer.appendChild(newMill);
            millBTNminus = document.createElement("button");
            millBTNminus.classList.add("minus");
            millBTNminus.innerText = "-";
            millBTNminus.id = `millminusPlayer${i+1}`;
            millAmount = document.createElement("span");
            millAmount.id = `millAmountP${i+1}`
            millAmount.value = "0";
            millAmount.innerText = millAmount.value;
            millBTNplus = document.createElement("button");
            millBTNplus.classList.add("plus");
            millBTNplus.innerText = "+";
            millBTNplus.id = `millplusPlayer${i+1}`;
            mill = document.createElement("p");
            mill.innerText = "Mill";
            mill.classList.add("fixing");
            newMill.appendChild(millBTNminus);
            newMill.appendChild(millAmount);
            newMill.appendChild(millBTNplus);
            newMill.appendChild(mill);
        }

    }

    popUP.classList.add("Hide");

    let pluses = document.querySelectorAll(".plus");

    pluses.forEach(plus => {
        plus.addEventListener('click', () => {
            plusclicked(plus);
        });
    });

    let minuses = document.querySelectorAll(".minus");

    minuses.forEach(minus => {
        minus.addEventListener('click', () => {
            minusclicked(minus);
        });
    });

})