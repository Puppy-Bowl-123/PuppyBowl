const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2305-FTB-PT-WEB-PT';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;
const allPlayersURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;
/*
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */

const fetchAllPlayers = async () => {
    try {
        const response = await fetch(allPlayersURL);
        const players = await response.json();
        return players
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(`${allPlayersURL}/${playerId}`)
        const singlePlayerData = await response.json();
        const player = singlePlayerData.data
        return player
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

const addNewPlayer = async (player) => {
    try {
        const response = await fetch(allPlayersURL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(player)
                });
        
        const newPlayer = await response.json()
        return newPlayer
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};


const removePlayer = async (playerId) => {
    try {
        const response = await fetch(`${allPlayersURL}/${playerId}`, {
            method: 'DELETE',
        });
        const removePlayer = await response.json();
        return removePlayer
    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`, err
        );
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
const renderAllPlayers = (playerList) => {
    try {
        playerContainer.innerHTML = ""
        playerList.forEach((player) => {
            const playerElement = document.createElement('div')
            playerElement.classList.add('player');
            playerElement.innerHTML = `
                <h2>${player.name}</h2>
                <img height="400" src = "${player.imageUrl}" alt ="error"></img>
                <br>
                <button class = "details-button" data-id = "${player.id}"> See Details </button>
                <button class = "delete-button" data-id = "${player.id}"> Delete </button>
                <br> <br>
                `
newPlayerFormContainer.appendChild(playerElement)

            const deleteButton = playerElement.querySelector('.delete-button')
            deleteButton.addEventListener('click', async (event) => {
                event.preventDefault()
                playerElement.remove()
            })

            const detailsButton = playerElement.querySelector('.details-button')
            detailsButton.addEventListener('click', async (event) => {
                event.preventDefault()
                const playerDetails = document.createElement('div2')
                const fetchDetails = fetchSinglePlayer(`${player.id}`)
                playerDetails.innerHTML = `
                    <p>ID: ${player.id}</p>
                    <p>Name: ${player.name}</p>
                    <p>Breed: ${player.breed}</p>
                    <p>Status: ${player.status}</p>
                    <p>ImageURL: ${player.imageUrl}</>
                    <p>CreatedAt: ${player.createdAt}</p>
                    <p>UpdatedAt: ${player.updatedAt}</p>
                    <p>TeamID: ${player.teamId}</p>
                    <p>CohortID: ${player.cohortId}</p>
                    <button style="font-size: 17px"; class = "close-button" data-id = "${player.id}"> Close </button>
                    <br> <br>
                    `
                console.log(fetchDetails)
        
playerElement.appendChild(playerDetails)

                const closeButton = playerDetails.querySelector('.close-button')
                closeButton.addEventListener('click', async (event) => {
                    event.preventDefault()
                    playerDetails.remove()
                })

            })
        })
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};



/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = async () => {
    try {
        playerContainer.innerHTML=""
            const newPlayerForm = document.createElement('div3')
            newPlayerForm.innerHTML=`
                <form>
                    <h3>Add a Puppy!</h3>
                <br>
                    <label for="name">Name</label>
                    <input id="name" type="text"/>
            <br> <br>
                    <label for="imageUrl">ImageURL</label>
                    <input id=imageUrl" type="img src"/>
            <br> <br>
                    <p>Details:</p>
            <br>
                    <label for="id">ID</label>
                    <input id="id" type="text"/>
            <br> <br>
                    <label for="breed">Breed</label>
                    <input id="breed" type="text"/>
            <br> <br>
                    <label for="status">Status</label>
                    <input id="status" type="text"/>
            <br> <br>
                    <label for="createdAt">CreatedAt</label>
                    <input id="createdAt" type="text"/>
            <br> <br>
                    <label for="updatedAt">UpdatedAt</label>
                    <input id="updatedAt" type="text"/>
            <br> <br>
                    <label for="teamId">TeamID</label>
                    <input id="teamId" type="text"/>
            <br> <br>
                    <label for="cohortId">CohortID</label>
                    <input id="cohortId" type="text"/>
            <br> <br>
                    <button type="submit">Submit</button>
                </form>
            `
    playerContainer.appendChild(newPlayerForm)

            newPlayerForm.addEventListener('submit', async (event) => {
                event.preventDefault()
                const id = document.getElementById('id');
                const name = document.getElementById('name');
                const breed = document.getElementById('breed');
                const status = document.getElementById('status');
                const imageUrl = document.getElementById('imageUrl');
                const createdAt = document.getElementById('createdAt');
                const updatedAt = document.getElementById('updatedAt');
                const teamId = document.getElementById('teamId');
                const cohortId = document.getElementById('cohortId');

                const newPlayer = {
                    id: id,
                    name: id,
                    breed: breed,
                    status: status,
                    imageUrl: imageUrl,
                    createdAt: createdAt,
                    updatedAt: updatedAt,
                    teamId: teamId,
                    cohortId: cohortId,
                };

                await addNewPlayer(newPlayer)
                const players = await fetchAllPlayers()
                renderAllPlayers(players.data.players)

            });    
        
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players.data.players);
    renderNewPlayerForm();
}

init();