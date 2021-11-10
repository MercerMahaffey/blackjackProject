
// suite, rank, image

// deck = [{}, {}, {}, {}] pop
// shuffle cards

// dealer [{}]  push

// player [{}]  push

// acc 1 or 11

// create list with card ids

// 


let deal = document.querySelector('#deal-button')
let hit = document.querySelector('#hit-button')
let stand = document.querySelector('#stand-button')
let dealerHand = document.querySelector('#dealer-hand')
let playerHand = document.querySelector('#player-hand')
let dealerPoints = document.querySelector('#dealer-points')
let playerPoints = document.querySelector('#player-points')
let messages = document.querySelector('#messages')
let winElement = document.querySelector('#wins')
let lossElement = document.querySelector('#losses')
let deckButton = document.querySelector('#deck-number')
let moneyElement = document.querySelector('#money')
let betButton = document.querySelector('#bet-button')
let restartGame = document.querySelector('#restart')
let animateDealer = document.querySelector('#animate-dealer')
let animatePlayer = document.querySelector('#animate-player')
let dealt = false;
let finished = true;
let revealCard = false;
let player = "player"
let dealer = "dealer"
let wins = 0
let losses = 0
let deckCount = 1
let money = 500
let betAmount = 5

restartGame.addEventListener('click', () => {
  if (dealt == false && finished == true){
  wins = 0
  losses = 0
  deckCount = 1
  money = 500
  betAmount = 5
  playerScore = 0
  dealerScore = 0
  aceInPlayer = 0
  aceInDealer = 0
  playerPoints.textContent = ''
  dealerPoints.textContent = ''
  messages.textContent = '';
  winElement.textContent = wins;
  lossElement.textContent = losses;
  moneyElement.textContent = `$${money}`;
  animateDealer.textContent = ''
  animatePlayer.textContent = ''
  }
  else {
    messages.textContent = "You cannot restart right now. Finish current round."
  }
})

betButton.addEventListener('click', () => {
  if (dealt == false && finished == true){
    if (betAmount == 5){
      betAmount = 10;
    }
    else if (betAmount == 10){
      betAmount = 25;
    }
    else if (betAmount == 25){
      betAmount = 50;
    }
    else if (betAmount == 50){
      betAmount = 100;
    }
    else if (betAmount == 100){
      betAmount = 200;
    }
    else if (betAmount == 200){
      betAmount = 5;
    }
    betButton.textContent = `Bet: ${betAmount}`
  }
  else {
    messages.textContent = "Cannot change bet right now."
  }
})

deckButton.addEventListener('click', ()=> {
  if (dealt == false && finished == true){
    if (deckCount == 1){
      deckCount = 3;
    }
    else if (deckCount == 3){
      deckCount = 6;
    }
    else if (deckCount == 6){
      deckCount = 1;
    }
    deckButton.textContent = `Decks: ${deckCount}`
  }
  else {
    messages.textContent = "Cannot change deck count right now."
  }
})

// loop for number of decks
// for loop filling suite
// nested for loop filling rank and image
function createDeck (){
  givenDeck = []
  console.log("Created Deck");
  for (decksUsed = 0; decksUsed < deckCount; decksUsed++){
    for (let suiteNum = 1; suiteNum <= 4; suiteNum ++){
      let suiteName = '';
      switch (suiteNum) {
        case 1:
          suiteName = "spades"
          break;
        case 2:
          suiteName = "hearts"
          break;
        case 3:
          suiteName = "diamonds"
          break;
        case 4:
          suiteName = "clubs"
          break;
      }
      
      for (let rankNum = 2; rankNum <= 14; rankNum++){
        let rankName = ''
        let rankValue = 0
        switch (rankNum) {
          case 11:
            rankName = 'jack'
            rankValue = 10
            break;
          case 12:
            rankName = 'queen'
            rankValue = 10
            break;
          case 13:
            rankName = 'king'
            rankValue = 10
            break;
          case 14:
            rankName = 'ace'
            rankValue = 11
            break;
          default:
            rankName = rankNum.toString()
            rankValue = rankNum
            break; 
        }
        givenDeck.push({suite: suiteName, rank: rankValue, imgSrc: `images/${rankName}_of_${suiteName}.png`})
      }
    }
  }
  return givenDeck;
}


function shuffleDeck (givenDeck) {
  console.log("Shuffling Deck");
  for (x = 0; x < givenDeck.length; x++){
    randomCardNum = Math.floor(Math.random() * 51)
    let givenX = givenDeck[x];
    givenDeck[x] = givenDeck[randomCardNum];
    givenDeck[randomCardNum] = givenX
  }
  return givenDeck
}


function createImg(source){
  let card = document.createElement('img')
  card.setAttribute('src', source)
  return card
}




function checkScore (cards, person){
  let score = 0
  aceInPlayer = 0
  aceInDealer = 0
  for (y = 0; y < cards.length; y ++){
    score += cards[y].rank
    if (cards[y].rank == 11){
      if (person === 'player'){
        aceInPlayer += 1;
      }
      else if (person === 'dealer'){
        aceInDealer += 1;
      }
    }
  }
  
  return score
}

function checkBusts (){
  if (playerScore > 21){
    messages.textContent = 'You bust.'
    finished = true;
    dealt = false;
    losses += 1;
    lossElement.textContent = losses;
  }
}
function checkAces (){
  if ( playerScore > 21 && aceInPlayer > 0){
      if (playerScore > 21){
        playerScore -= 10;
      }
    
  }
  if (dealerScore > 21 && aceInDealer > 0){
      if (dealerScore > 21){
        dealerScore -= 10;
      }
    
  }
}

function endConditions (){
  if (playerScore < 22 && playerScore > dealerScore){
    messages.textContent = `You win $${(betAmount*1.5)}.`
    finished = true
    dealt = false
    wins += 1;
    money += (betAmount *1.5)
  }
  else if (dealerScore < 22 && playerScore < dealerScore){
    messages.textContent = "Dealer Wins."
    finished = true
    dealt = false
    losses += 1;
  }
  else if (playerScore == dealerScore){
    messages.textContent = "Tie. Your bet is returned."
    finished = true
    dealt = false
    money += betAmount;
  }
  else if (dealerScore > 21){
    messages.textContent = `You win $${(betAmount*1.5)}.`
    finished = true
    dealt = false
    wins += 1;
    money += (betAmount *1.5)
  }
  else if (playerScore > 21){
    messages.textContent = "Dealer wins."
    finished = true
    dealt = false
    losses += 1;
  }
}

function givePlayerCardFromDeck (newDeck) {
  let lastCard = newDeck[newDeck.length -1]
  playerCards.push(lastCard)
  newDeck.pop()
}

function giveDealerCardFromDeck (newDeck) {
  let lastCard = newDeck[newDeck.length-1]
  dealerCards.push(lastCard)
  newDeck.pop()
}

function printCards (cards, person){
  if (person == "player"){
    animatePlayer.textContent = ''
    for (x = 0; x < cards.length; x++){
      let card = createImg(cards[x].imgSrc)
      animateCardPlayer(card)
    }
  }
  if (person == "dealer"){
    animateDealer.textContent = ''
    for (x = 0; x < cards.length; x++){
      if (revealCard == false && x == 1){
        let card = createImg("images/card_back.png")
        animateCardDealer(card)
      }
      else{
      let card = createImg(cards[x].imgSrc)
      animateCardDealer(card)
      }
    }
  }

  playerPoints.textContent = playerScore.toString()
  if (revealCard == true){
    dealerPoints.textContent = dealerScore.toString()
  }
  else{
    dealerPoints.textContent = ''
  }
}

function animateCardDealer(card, xPos = 60, yPos = 300) {
  let id = null;
  movingElement = animateDealer
  movingElement.append(card)
  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 1);
  function frame() {
    pos++;
    x = pos;
    y = pos;
    if (x >= xPos && y >= yPos) {
      clearInterval(id);
    }
    if (y < yPos){
      movingElement.style.top = pos + "px"; 
    }
    if (x < xPos){  
      movingElement.style.left = pos + "px"; 
    }
  }
}

function animateCardPlayer(card, xPos = 60, yPos = 470) {
  let id = null;
  
  animatePlayer.append(card)
  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 1);
  function frame() {
    pos++;
    x = pos;
    y = pos;
    if (x >= xPos && y >= yPos) {
      clearInterval(id);
    } 
    if (y < yPos){
      animatePlayer.style.top = pos + "px"; 
    }
    if (x < xPos){  
      animatePlayer.style.left = pos + "px"; 
    }
  }
}


deal.addEventListener('click', () =>{
  messages.textContent = '';
  winElement.textContent = wins;
  lossElement.textContent = losses;
  moneyElement.textContent = `$${money}`;
if (dealt == false && finished == true && money >= betAmount){
  revealCard = false;
  newDeck = []
  playerCards = []
  dealerCards = []
  playerScore = 0
  dealerScore = 0
  aceInDealer = 0
  aceInPlayer = 0
  finished = false;

  money -= betAmount;
  moneyElement.textContent = `$${money}`;
  
  newDeck = createDeck()

  newDeck = shuffleDeck(newDeck)
  newDeck = shuffleDeck(newDeck)
  
  console.log(newDeck);

  givePlayerCardFromDeck(newDeck)
  giveDealerCardFromDeck(newDeck)
  givePlayerCardFromDeck(newDeck)
  giveDealerCardFromDeck(newDeck)

  playerScore = checkScore(playerCards, player)
  dealerScore = checkScore(dealerCards, dealer)
  
  checkAces ()
  
  printCards(dealerCards, dealer)
  printCards(playerCards, player)

  checkBusts()
  dealt = true
}
else if (dealt == false && finished == true && money < 5){
  messages.textContent = "You don't have enough money to continue playing!"
}
else if (dealt == false && finished == true && money < betAmount){
  messages.textContent = "You don't have that much money to bet."
}
else{
  messages.textContent = "You have already been dealt cards. Press Hit or Stand."
}
})

hit.addEventListener('click', () => {
  messages.textContent = '';
  winElement.textContent = wins;
  lossElement.textContent = losses;
  if (dealt == true && finished == false){
  givePlayerCardFromDeck(newDeck)
  

  playerScore = checkScore(playerCards, player)
  checkAces ()

  printCards(playerCards, player)

  checkBusts()

  }
  else{
    messages.textContent = "You cannot get another card."
  }
})

stand.addEventListener('click', (e) => {
  revealCard = true
  messages.textContent = '';
  winElement.textContent = wins;
  lossElement.textContent = losses;

  if (dealt == true && finished == false){
  while (playerScore < 22 && playerScore > dealerScore && dealerScore < 17){
    giveDealerCardFromDeck(newDeck)
    dealerScore = checkScore(dealerCards, dealer)
    printCards(dealerCards, dealer)
  }

  dealerScore = checkScore(dealerCards)

  printCards(dealerCards, dealer)

  checkBusts()

  endConditions()
  finished = true;
  dealt = false;
  revealCard = true;
  moneyElement.textContent = `$${money}`;
  winElement.textContent = wins;
  lossElement.textContent = losses;
}
  else {
    messages.textContent = "You cannot stand. Click Deal to begin another round"
  }

})
