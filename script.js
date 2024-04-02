const yourCards = document.getElementById('your-cards');
const oppCards = document.getElementById('opp-cards');
const goldDisplay = document.getElementById('gold-display');
const yourPlayed = document.getElementById('your-played');
const oppPlayed = document.getElementById('opp-played');
const winnerMessage = document.getElementById('winner-message');
const playButton = document.getElementById('play-button');
const oppScoreDiv = document.getElementById('opp-score-number');
const yourScoreDiv = document.getElementById('your-score-number');
const roundTurn = document.getElementById('round-turn');
const oppColorBonus = document.getElementById('opp-color-bonus');
const yourColorBonus = document.getElementById('your-color-bonus');
const rules = document.getElementById('rules')
const showRules = document.getElementById('show-rules');
const hideRules = document.getElementById('hide-rules');

showRules.addEventListener('click', () => {
    rules.style.display = "block";
    hideRules.style.display = "flex";
})

hideRules.addEventListener('click', () => {
    rules.style.display = "none";
    showRules.style.display = "flex";
    hideRules.style.display = "none";
})

let oppScore = 0;
let yourScore = 0;

const getShapeImg = (shape) => {
    let imageDiv = document.createElement('div');
    switch (shape) {
        case 'circle':
            imageDiv.setAttribute('class', 'circle-div');
            break;
        case 'triangle':
            imageDiv.setAttribute('class', 'triangle-div');
            break;
        case 'square':
            imageDiv.setAttribute('class', 'square-div');
            break;
        case 'pentagon':
            imageDiv.setAttribute('class', 'pentagon-div');
            break;
        case 'octagon':
            imageDiv.setAttribute('class', 'octagon-div');
            break;
        case 'star':
            imageDiv.setAttribute('class', 'star-div');
            break;
        default: console.log(imageDiv);
    }
    return imageDiv;
}

class Card {
    #name;
    #number;
    #color;
    #shape;

    constructor(number, color, shape) {
        this.#number = number;
        this.#color = color;
        this.#shape = shape;
        this.#name = `card${number}${color}${shape}`;
    }

    displayUpCard = () => {
        let cardDiv = document.createElement("div");
        cardDiv.style.backgroundColor = this.#color;
        cardDiv.setAttribute('class', 'your-card');
        if (this.#number == 2) {
            cardDiv.style.flexDirection = "column";
        }
        if (this.#number == 5 || this.#number == 7) {
            cardDiv.style.flexWrap = "wrap-reverse";
        }
        for (let i = 0; i < this.#number; i++) {
            cardDiv.appendChild(getShapeImg(this.#shape));
        }
        return cardDiv;
    }

    displayDownCard = () => {
        let cardDiv = document.createElement("div");
        cardDiv.setAttribute('class', 'opp-card');
        return cardDiv;
    }

    getName = () => {
        return this.#name;
    }

    getShape = () => {
        return this.#shape;
    }

    getNumber = () => {
        return this.#number;
    }

    getColor = () => {
        return this.#color;
    }

    getColorName = () => {
        switch (this.#color) {
            case '#6fede5':
                return "blue";
            case '#7ded79':
                return "green";
            case '#f0c0ed':
                return "purple";
            case '#f79577':
                return "red";
            default: break;
        }
    }

    getColorRank = () => {
        switch (this.#color) {
            case '#6fede5':
                return 1;
            case '#7ded79':
                return 2;
            case '#f79577':
                return 3;
            case '#f0c0ed':
                return 4;
            default: break;
        }
    }

    getShapeRank = () => {
        switch (this.#shape) {
            case 'circle':
                return 1;
            case 'triangle':
                return 2;
            case 'square':
                return 3;
            case 'pentagon':
                return 4;
            case 'octagon':
                return 5;
            case 'star':
                return 6;
            default: break;
        }
    }
}

//randomizers for creating new cards and gold amounts
let colors = ["#6fede5", "#7ded79", "#f79577", "#f0c0ed"];
let shapes = ["circle", "triangle", "square", "pentagon", "octagon", "star"];
let randomColor = () => {
    let randomNumberC = Math.floor(Math.random() * colors.length);
    return colors[randomNumberC];
}
let randomShape = () => {
    let randomNumberS = Math.floor(Math.random() * shapes.length);
    return shapes[randomNumberS];
}
let randomNumber = () => {
    return (1 + Math.floor(Math.random() * 8));
}
let goldAmountArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3,
    4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7,
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12,
    13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 19, 19, 20];

let cardYouPlayed;
let cardOppPlayed;

let turnNumber = 1;
let roundNumber = 0;

isFirst = true;

const round = () => {
    let your4AgoColor = null;
    let your3AgoColor = null;
    let your2AgoColor = null;
    let yourPrevColor = null;
    let yourCurrentColor = null;

    let opp4AgoColor = null;
    let opp3AgoColor = null;
    let opp2AgoColor = null;
    let oppPrevColor = null;
    let oppCurrentColor = null;
    roundNumber++;
    let oppCardsArray = [new Card(randomNumber(), randomColor(), randomShape()), new Card(randomNumber(), randomColor(), randomShape()), new Card(randomNumber(), randomColor(), randomShape()),
    new Card(randomNumber(), randomColor(), randomShape()), new Card(randomNumber(), randomColor(), randomShape())];
    let yourCardsArray = [new Card(randomNumber(), randomColor(), randomShape()), new Card(randomNumber(), randomColor(), randomShape()), new Card(randomNumber(), randomColor(), randomShape()),
    new Card(randomNumber(), randomColor(), randomShape()), new Card(randomNumber(), randomColor(), randomShape())];

    yourCardsArray.sort((b, a) => {
        return a.getColorRank() - b.getColorRank();
    })
    oppCardsArray.sort((b, a) => {
        return b.getColorRank() - a.getColorRank();
    })
    yourCardsArray.sort((b, a) => {
        return a.getNumber() - b.getNumber();
    })
    oppCardsArray.sort((b, a) => {
        return b.getNumber() - a.getNumber();
    })
    yourCardsArray.sort((b, a) => {
        return a.getShapeRank() - b.getShapeRank();
    })
    oppCardsArray.sort((b, a) => {
        return b.getShapeRank() - a.getShapeRank();
    })

    //code for individual turn
    const turn = () => {
        yourColorBonus.textContent = "";
        oppColorBonus.textContent = "";
        playButton.style.visibility = "hidden";
        roundTurn.textContent = `ROUND ${roundNumber} TURN ${turnNumber}`;
        console.log(turnNumber, roundNumber, "before")
        if(turnNumber === 5){
            turnNumber = 0;
            playButton.removeEventListener("click", turn);
            round();
        }
        turnNumber++;
        playButton.textContent = "NEXT";
        let goldNumber = goldAmountArray[Math.floor(Math.random() * 210)];
        goldDisplay.textContent =  "$" + goldNumber;
        winnerMessage.textContent = "";
        for(let i = 0; i < yourCards.length; i++){
            console.log(yourCards[i])
        }
        //remove and re-display cards
        while(yourCards.firstChild){
            yourCards.removeChild(yourCards.firstChild)
        }
        while(oppCards.firstChild){
            oppCards.removeChild(oppCards.firstChild)
        }
        //remove cards from played rectangles if there are any
        if(oppPlayed.firstChild){
            oppPlayed.removeChild(oppPlayed.childNodes[0]);
        }
        if(yourPlayed.firstChild){
            yourPlayed.removeChild(yourPlayed.childNodes[0]);
        }
        //display cards and add event listener
        for (let i = 0; i < oppCardsArray.length; i++) {
            oppCards.appendChild(oppCardsArray[i].displayDownCard());
        }
        for (let i = 0; i < yourCardsArray.length; i++) {
            let newDiv = yourCardsArray[i].displayUpCard();
            yourCards.appendChild(newDiv);

            const handlePlayedCard = () => {

                yourCards.removeChild(newDiv);
                yourPlayed.appendChild(newDiv);
                cardYouPlayed = yourCardsArray[i];
                yourCardsArray.splice(i, 1);

                while(yourCards.firstChild){
                    yourCards.removeChild(yourCards.firstChild)
                }
                while(oppCards.firstChild){
                    oppCards.removeChild(oppCards.firstChild)
                }
                for (let i = 0; i < oppCardsArray.length; i++) {
                    oppCards.appendChild(oppCardsArray[i].displayDownCard());
                }
                for (let i = 0; i < yourCardsArray.length; i++) {
                    let newDiv = yourCardsArray[i].displayUpCard();
                    yourCards.appendChild(newDiv);
                }

                const computerPlayLogic = () => {
                    let cardOppPlayed;
                    //if gold is less than 5
                    let randomNumber = Math.random();
                    if (goldNumber <= 5) {
                        if (randomNumber < .15) {
                            if (oppCardsArray.length > 2) {
                                cardOppPlayed = 2;
                            } else if (oppCardsArray.length > 1) {
                                cardOppPlayed = 1;
                            } else {
                                cardOppPlayed = 0;
                            }
                        } else if (randomNumber >= .15 && randomNumber < .45) {
                            if (oppCardsArray.length > 1) {
                                cardOppPlayed = 1;
                            } else {
                                cardOppPlayed = 0;
                            }
                        } else {
                            cardOppPlayed = 0;
                        }
                    //if gold is between 6 and 10
                    } else if (goldNumber > 5 && goldNumber <= 10) {
                        if (oppCardsArray.length == 5) {
                            cardOppPlayed = 2;
                        } else if (oppCardsArray.length == 4) {
                            if (randomNumber < .5) {
                                cardOppPlayed = 1;
                            } else {
                                cardOppPlayed = 2;
                            }
                        } else if (oppCardsArray.length == 3) {
                            cardOppPlayed = 1;
                        } else if (oppCardsArray.length == 2) {
                            if (randomNumber < .5) {
                                cardOppPlayed = 0;
                            } else {
                                cardOppPlayed = 1;
                            }
                        } else {
                            cardOppPlayed = 0;
                        }
                    } else if (goldNumber > 10 && goldNumber <= 15){
                        if(oppCardsArray.length === 5){
                            if(randomNumber < .2){
                                for (let i in oppCardsArray) {
                                    if (oppCardsArray[i].getShape() === 'circle') {
                                        cardOppPlayed = i;
                                    } else {
                                        cardOppPlayed = oppCardsArray.length - 1;
                                    }
                                }
                            } else if (randomNumber >= .2 && randomNumber < .6){
                                    cardOppPlayed = 4;
                            } else {
                                cardOppPlayed = 3;
                            }
                        } else if (oppCardsArray.length === 4){
                            if(randomNumber < .2){
                                for (let i in oppCardsArray) {
                                    if (oppCardsArray[i].getShape() === 'circle') {
                                        cardOppPlayed = i;
                                    } else {
                                        cardOppPlayed = oppCardsArray.length - 1;
                                    }
                                }
                            } else if (randomNumber >= .2 && randomNumber < .70){
                                    cardOppPlayed = 3;
                            } else {
                                cardOppPlayed = 2;
                            }
                        } else if (oppCardsArray.length === 3){
                            if(randomNumber < .2){
                                for (let i in oppCardsArray) {
                                    if (oppCardsArray[i].getShape() === 'circle') {
                                        cardOppPlayed = i;
                                    } else {
                                        cardOppPlayed = oppCardsArray.length - 1;
                                    }
                                }
                            } else {
                                cardOppPlayed = 1;
                            }
                        } else if (oppCardsArray.length === 2){
                            if(randomNumber < .2){
                                for (let i in oppCardsArray) {
                                    if (oppCardsArray[i].getShape() === 'circle') {
                                        cardOppPlayed = i;
                                    } else {
                                        cardOppPlayed = oppCardsArray.length - 1;
                                    }
                                }
                            } else {
                                cardOppPlayed = 0;
                            }
                        } else {
                            cardOppPlayed = 0;
                        }
                    } else {
                        if (randomNumber < .4) {
                            for (let i in oppCardsArray) {
                                if (oppCardsArray[i].getShape() === 'circle') {
                                    cardOppPlayed = i;
                                } else {
                                    cardOppPlayed = oppCardsArray.length - 1;
                                }
                            }
                        } else {
                            cardOppPlayed = oppCardsArray.length - 1;
                        }
                    }
                    return cardOppPlayed;
                }
                let logicNumber = computerPlayLogic();
                cardOppPlayed = oppCardsArray[logicNumber];

                setTimeout(() => {
                    playButton.style.visibility = "visible";
                    oppCards.removeChild(oppCards.firstChild);
                    console.log(oppCardsArray, logicNumber)
                    oppPlayed.appendChild(oppCardsArray[logicNumber].displayUpCard());
                    oppCardsArray.splice(logicNumber, 1);
                    const determineOutcome = () => {
                        let outcome;
                        if(cardYouPlayed.getShape() === "circle" && cardOppPlayed.getShape() === "star"){
                            outcome = goldNumber + cardYouPlayed.getNumber();
                            return outcome;
                        }
                        if(cardOppPlayed.getShape() === "circle" && cardYouPlayed.getShape() === "star"){
                            outcome = (goldNumber + cardOppPlayed.getNumber()) * -1;
                            return outcome;
                        }
                        if(cardYouPlayed.getShapeRank() > cardOppPlayed.getShapeRank()){
                            outcome = goldNumber + cardYouPlayed.getNumber();
                        } else if (cardYouPlayed.getShapeRank() < cardOppPlayed.getShapeRank()){
                            outcome = (goldNumber + cardOppPlayed.getNumber()) * -1;
                        } else {
                            if(cardYouPlayed.getNumber() > cardOppPlayed.getNumber()){
                                outcome = goldNumber + cardYouPlayed.getNumber();
                            } else if (cardYouPlayed.getNumber() < cardOppPlayed.getNumber()){
                                outcome = (goldNumber + cardOppPlayed.getNumber()) * -1;
                            } else {
                                if(cardYouPlayed.getColorRank() > cardOppPlayed.getColorRank()){
                                    outcome = goldNumber + cardYouPlayed.getNumber();
                                } else if (cardYouPlayed.getColorRank() < cardOppPlayed.getColorRank()){
                                    outcome = (goldNumber + cardOppPlayed.getNumber()) * -1;
                                } else {
                                    outcome = 0;
                                }
                            }
                        }
                        return outcome;
                    }
                    if(yourCurrentColor && yourPrevColor && your2AgoColor && your3AgoColor){
                        your4AgoColor = your3AgoColor;
                        your3AgoColor = your2AgoColor;
                        your2AgoColor = yourPrevColor;
                        yourPrevColor = yourCurrentColor;
                    } else if(yourCurrentColor && yourPrevColor && your2AgoColor){
                        your3AgoColor = your2AgoColor;
                        your2AgoColor = yourPrevColor;
                        yourPrevColor = yourCurrentColor;
                    } else if(yourCurrentColor && yourPrevColor){
                        your2AgoColor = yourPrevColor;
                        yourPrevColor = yourCurrentColor;
                    } else if(yourCurrentColor){
                       yourPrevColor = yourCurrentColor;
                    }
                    yourCurrentColor = cardYouPlayed.getColor();
                    if(oppCurrentColor && oppPrevColor && opp2AgoColor && opp3AgoColor){
                        opp4AgoColor = opp3AgoColor;
                        opp3AgoColor = opp2AgoColor;
                        opp2AgoColor = oppPrevColor;
                        oppPrevColor = oppCurrentColor;
                    }else if(oppCurrentColor && oppPrevColor && opp2AgoColor){
                        opp3AgoColor = opp2AgoColor;
                        opp2AgoColor = oppPrevColor;
                        oppPrevColor = oppCurrentColor;
                    }else if(oppCurrentColor && oppPrevColor){
                        opp2AgoColor = oppPrevColor;
                        oppPrevColor = oppCurrentColor;
                    }else if(oppCurrentColor){
                        oppPrevColor = oppCurrentColor;
                    }
                    oppCurrentColor = cardOppPlayed.getColor();
                    

                    if((yourCurrentColor === yourPrevColor) && (yourPrevColor === your2AgoColor) && (your2AgoColor === your3AgoColor) && (your3AgoColor === your4AgoColor)){
                        yourScore = yourScore + 16;
                        yourScoreDiv.textContent = "$" + yourScore;
                        yourColorBonus.textContent = `5 straight ${cardYouPlayed.getColorName()} cards: +$16`
                    }else if((yourCurrentColor === yourPrevColor) && (yourPrevColor === your2AgoColor) && (your2AgoColor === your3AgoColor)){
                        yourScore = yourScore + 12;
                        yourScoreDiv.textContent = "$" + yourScore;
                        yourColorBonus.textContent = `4 straight ${cardYouPlayed.getColorName()} cards: +$12`
                    }else if((yourCurrentColor === yourPrevColor) && (yourPrevColor === your2AgoColor)){
                        yourScore = yourScore + 8;
                        yourScoreDiv.textContent = "$" + yourScore;
                        yourColorBonus.textContent = `3 straight ${cardYouPlayed.getColorName()} cards: +$8`
                    }else if(yourCurrentColor === yourPrevColor){
                        yourScore = yourScore + 4;
                        yourScoreDiv.textContent = "$" + yourScore;
                        yourColorBonus.textContent = `2 straight ${cardYouPlayed.getColorName()} cards: +$4`
                    }

                    if((oppCurrentColor === oppPrevColor) && (oppPrevColor === opp2AgoColor) && (opp2AgoColor === opp3AgoColor) && (opp3AgoColor === opp4AgoColor)){
                        oppScore = oppScore + 16;
                        oppScoreDiv.textContent = "$" + oppScore;
                        oppColorBonus.textContent = `5 straight ${cardOppPlayed.getColorName()} cards: +$16`
                    }else if((oppCurrentColor === oppPrevColor) && (oppPrevColor === opp2AgoColor) && (opp2AgoColor === opp3AgoColor)){
                        oppScore = oppScore + 12;
                        oppScoreDiv.textContent = "$" + oppScore;
                        oppColorBonus.textContent = `4 straight ${cardOppPlayed.getColorName()} cards: +$12`
                    }else if((oppCurrentColor === oppPrevColor) && (oppPrevColor === opp2AgoColor)){
                        oppScore = oppScore + 8;
                        oppScoreDiv.textContent = "$" + oppScore;
                        oppColorBonus.textContent = `3 straight ${cardOppPlayed.getColorName()} cards: +$8`
                    }else if(oppCurrentColor === oppPrevColor){
                        oppScore = oppScore + 4;
                        oppScoreDiv.textContent = "$" + oppScore;
                        oppColorBonus.textContent = `2 straight ${cardOppPlayed.getColorName()} cards: +$4`
                    }
                    
                    let outcomeResult = determineOutcome();
                    if(outcomeResult > 0){
                       winnerMessage.textContent = `You win $${outcomeResult}`;
                       yourScore = yourScore + outcomeResult;
                        yourScoreDiv.textContent = "$" + yourScore;
                    } else if (outcomeResult < 0){
                        winnerMessage.textContent = `Opponent wins $${-outcomeResult}`;
                        oppScore = oppScore + (outcomeResult * -1);
                        oppScoreDiv.textContent = "$" + oppScore;
                    } else {
                        winnerMessage.textContent = "It's a tie!";
                    }
                }, 500
                );
            }
            newDiv.addEventListener("click", handlePlayedCard, { once: true });
        }
    }
    playButton.addEventListener("click", turn); 
}
round()
