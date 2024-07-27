let currentPlayerIndex = 1;
let totalCount = 0;
let playerCount = 0;
const playerDetails = [];

// Create content container and players container only once
const contentContainer = document.createElement('div');
contentContainer.className = 'content-container';
const playersContainer = document.createElement('div');
playersContainer.className = 'players-container';
contentContainer.appendChild(playersContainer);
document.body.appendChild(contentContainer);

function showpopup() {
    document.getElementById('hero').style.display = 'none';
    document.getElementById('box').style.display = 'block';
}

function handleOptionClick(event) {
    const options = event.currentTarget.parentNode.children;
    Array.from(options).forEach(option => option.classList.remove('selected'));
    event.currentTarget.classList.add('selected');
}

function showPlayerOptions() {
    const selectedTotalCount = document.querySelector('input[name="totalCount"]:checked');
    if (selectedTotalCount) {
        document.getElementById('totalCountSection').style.display = 'none';
        document.getElementById('playerCountSection').style.display = 'block';
        document.getElementById('previousButton').disabled = false;
        document.getElementById('previousButton').classList.remove('disabled-button');
        document.getElementById('playButton').style.display = 'block';
    } else {
        alert('Please select a total count option.');
    }
}

function showTotalCountOptions() {
    document.getElementById('totalCountSection').style.display = 'block';
    document.getElementById('playerCountSection').style.display = 'none';
    document.getElementById('previousButton').disabled = true;
    document.getElementById('previousButton').classList.add('disabled-button');
    document.getElementById('playButton').style.display = 'none';
}

function play() {
    totalCount = parseInt(document.querySelector('input[name="totalCount"]:checked').value, 10);
    playerCount = parseInt(document.querySelector('input[name="playerCount"]:checked').value, 10);

    document.querySelector('.box').style.display = 'none';
    showPlayerInputPopup();
}

function showPlayerInputPopup() {
    const popup = document.createElement('div');
    popup.className = 'popup bg-white rounded-lg p-4 absolute inset-0 m-auto';
    popup.style.width = '300px';
    popup.style.height = '300px';

    const header = document.createElement('h3');
    header.innerText = `Player ${currentPlayerIndex}, choose your number and name:`;
    popup.appendChild(header);

    const numberInput = document.createElement('input');
    numberInput.type = 'number';
    numberInput.min = 1;
    numberInput.max = totalCount;
    numberInput.placeholder = `Number (1-${totalCount})`;
    popup.appendChild(numberInput);

    const info = document.createElement('p');
    info.innerText = `Choose a number from 1 to ${totalCount}`;
    popup.appendChild(info);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Name';
    popup.appendChild(nameInput);

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    const nextButtonClickHandler = function () {
        const number = parseInt(numberInput.value, 10);
        const name = nameInput.value.trim();
        nextButton.removeEventListener('click', nextButtonClickHandler);
        if (number >= 1 && number <= totalCount && name) {
        // Store the player's number and name
        playerDetails.push({ number, name });
        currentPlayerIndex++;
        if (currentPlayerIndex > playerCount) {
        // All players have entered their details
        document.body.removeChild(popup);
        startGame();
        } else {
        document.body.removeChild(popup);
        showPlayerInputPopup();
        }
        } else {
        // Handle invalid input
        alert('Please enter a valid number and name.');
        }
        };
    nextButton.addEventListener('click', nextButtonClickHandler);
    popup.appendChild(nextButton);

    document.body.appendChild(popup);
}

function startGame() {
    // Create squares container
    const squaresContainer = document.createElement('div');
    squaresContainer.className = 'squares-container';

    for (let i = 1; i <= totalCount; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        square.innerText = i;
        squaresContainer.appendChild(square);
    }

    // Update players container
    playersContainer.innerHTML = '';
    playerDetails.forEach((player, index) => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'player-detail';
        playerDiv.innerText = `Player ${index + 1}: ${player.name}`;
playersContainer.appendChild(playerDiv);
});

// Append squares container to content container
contentContainer.appendChild(squaresContainer);
}

document.getElementById('start').addEventListener('click', showpopup);
document.querySelectorAll('.option').forEach(option => {
option.addEventListener('click', handleOptionClick);
});
document.getElementById('nextButton').addEventListener('click', showPlayerOptions);
document.getElementById('playButton').addEventListener('click', play);