/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA) //turns the GAMES_DATA into an array of object stored in GAMES_JSON

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");
// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (var i=0; i<games.length; i++){
        var newDiv = document.createElement("div");
        newDiv.classList.add("game-card");
        var gameImage = games[i].img;
        newDiv.innerHTML = `<img src=${gameImage} class="game-img"> <h3>${games[i].name}</h3> <p>${games[i].description}</p>`;
        document.querySelector("#games-container").append(newDiv);
    }

        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games

addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const totalContributions = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + game.backers;
}, 0);

const totalContributionsVal = totalContributions.toLocaleString('en-US');
contributionsCard.innerHTML = `<h1>${totalContributionsVal}</h1>`;
// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalAmountRaised = GAMES_JSON.reduce((accumulator, game) => {
    return accumulator + game.pledged;
}, 0);
// set inner HTML using template literal

raisedCard.innerHTML = `<h1>$${totalAmountRaised.toLocaleString('en-US')}</h1>`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = `<h1>${GAMES_JSON.length}</h1>`;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    
    // use filter() to get a list of games that have not yet met their goal
    
    const gamesUnfunded = GAMES_JSON.filter(game => game.pledged<game.goal);
    // use the function we previously created to add the unfunded games to the DOM

    addGamesToPage(gamesUnfunded);
}


// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const gamesFunded = GAMES_JSON.filter(game => game.pledged>=game.goal);


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(gamesFunded);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
    // add all games from the JSON data to the DOM

}

function showRandomGame(){
    deleteChildElements(gamesContainer);
    const randGameIndex = Math.floor(Math.random()*GAMES_JSON.length);
    const randGame = GAMES_JSON[randGameIndex];

    var newDiv = document.createElement("div");
    newDiv.classList.add("game-card");
    var gameImage = randGame.img;
    newDiv.innerHTML = `<img src=${gameImage} class="game-img"> <h3>${randGame.name}</h3> <p>${randGame.description}</p>`;
    document.querySelector("#games-container").append(newDiv);

}
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");
const randBtn = document.getElementById("random-btn");

// add event listeners with the correct functions to each button

document.querySelector("#unfunded-btn").addEventListener("click", filterUnfundedOnly);
document.querySelector("#funded-btn").addEventListener("click", filterFundedOnly);
document.querySelector("#all-btn").addEventListener("click", showAllGames);
document.querySelector("#random-btn").addEventListener("click", showRandomGame);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games

const unfundedGamesTotal = GAMES_JSON.filter(game => game.pledged<game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const numberGamesEvenOdd = GAMES_JSON.length==1 ? 'game' : 'games';
const numberGamesUnfundedEvenOdd = unfundedGamesTotal==1 ? 'game' : 'games';


const displayStr = `A total of $${totalAmountRaised.toLocaleString('en-US')} has been raised for ${GAMES_JSON.length} ${numberGamesEvenOdd}. Currently, ${unfundedGamesTotal} ${numberGamesUnfundedEvenOdd} remains unfunded.`; 

// create a new DOM element containing the template string and append it to the description container

var newP = document.createElement("p");
newP.innerHTML = displayStr;
document.querySelector("#description-container").append(newP);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const [first, second, ...rest] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
var firstGame = document.createElement("h2");
firstGame.innerHTML = `${first.name}`;
document.querySelector("#first-game").append(firstGame);

// do the same for the runner up item

var secondGame = document.createElement("h2");
secondGame.innerHTML = `${second.name}`;
document.querySelector("#second-game").append(secondGame);


var worstGame = document.createElement("h2");
worstGame.innerHTML = `${rest[rest.length-1].name}`;
document.querySelector("#gameNeedingMostHelp").append(worstGame);