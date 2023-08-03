const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2305-ftb-web-pt';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/2305-ftb-web-pt`;
const PLAYERS_API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/2305-ftb-web-pt/players`;
// const PLAYERS_API_URL_ID = `https://fsa-puppy-bowl.herokuapp.com/api/2305-ftb-web-pt/players/PLAYER-ID`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
        const response = await fetch(PLAYERS_API_URL);
        const players = await response.json();
        return players;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(`${PLAYERS_API_URL}/${playerId}`);
        const playerData =await response.json(); 
        const player = playerData.data;
        console.log(player);
        return player;
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

const addNewPlayer = async (playerObj) => {
    try {
        const response = await fetch(PLAYERS_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(playerObj)
        });

        if (!response.ok){
             throw new Error("Failed to add the new player.");
        }

        const newPlayer = await response.json();
        return newPlayer;
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
        throw err;
    }
};


const removePlayer = async (playerId) => {
    try {
        const response = await fetch(`${PLAYERS_API_URL}/${playerId}`, {
            method: "DELETE",
        });
        
        if (!response.ok) {
            throw new Error("Failed to remove player.")
        }

        const removePlayer = await response.json();
        return removePlayer;
    } catch (err) {
        console.error(`Whoops, trouble removing player #${playerId} from the roster!`, err);
        throw err;
    }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = async (playerList) => {
    try {
        playerContainer.innerHTML = "";
        playerList.forEach((player) => {
            const playerElement = document.createElement("div");
        playerElement.classList.add("player");
        playerElement.innerHTML = `
        <h2>${player.name}</h2>
        <p>${player.id}</p>
        <p>${player.breed}</p>
        <p>${player.status}</p>
        <img src="${player.imageUrl}" alt="img broken"/>
        <button class="details-button" data-id="${player.id}">See Details</button>
        <button class="delete-button" data-id="${player.id}">Delete</button>
        `;
        playerContainer.appendChild(playerElement);

        // See details
        const detailsButton = playerElement.querySelector(".details-button");
        detailsButton.addEventListener("click", async (event) => {
        const playerId = event.target.dataset.id;
        try {
           
        } catch (err) {
            console.error('Error fetching player details:', err);
        }
    });

        // Delete button
        const deleteButton = playerElement.querySelector(".delete-button");
        
        
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};


/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
            try {
              
                
                try {
                   
                } catch (err) {
                console.error('Uh oh, trouble rendering the new player form!', err);
                }
        }


const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players.data.players);
    console.log(players.data.players);

    renderNewPlayerForm();
}

init();