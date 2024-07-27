let totalCount = 0;
        let playerCount = 0;
        let currentPlayer = 1;
        let players = [];
        let timer;

        function showpopup() {
            document.getElementById('hero').style.display = 'none';
            document.getElementById('box').style.display = 'block';
        }

        function handleOptionClick(event) {
            const options = document.querySelectorAll('.option');
            options.forEach(option => option.classList.remove('selected'));
            event.currentTarget.classList.add('selected');
        }

        function showPlayerOptions() {
            const selectedTotalCount = document.querySelector('input[name="totalCount"]:checked');
            if (selectedTotalCount) {
                totalCount = parseInt(selectedTotalCount.value, 10);
                document.getElementById('totalCountSection').style.display = 'none';
                document.getElementById('playerCountSection').style.display = 'block';
                document.getElementById('navigationButtons').style.display = 'none';
                document.getElementById('nextPlayerCountButton').style.display = 'block';
            } else {
                alert('Please select a total count option.');
            }
        }

        function showPlayerDetails() {
            const selectedPlayerCount = document.querySelector('input[name="playerCount"]:checked');
            if (selectedPlayerCount) {
                playerCount = parseInt(selectedPlayerCount.value, 10);
                document.getElementById('playerCountSection').style.display = 'none';
                document.getElementById('nextPlayerCountButton').style.display = 'none';
                showPlayerInputForm(currentPlayer);
            } else {
                alert('Please select a player count option.');
            }
        }

        function showPlayerInputForm(playerNumber) {
            document.getElementById('playerDetailsSection').style.display = 'block';
            document.getElementById('playerDetailsContainer').innerHTML = `
                <label class="block mb-4 text-xl font-medium text-white text-center">Player ${playerNumber} Details:</label>
                <div class="flex flex-col mb-4">
                    <label class="text-white">Number (1-${totalCount}):</label>
                    <input type="number" name="playerNumber" class="input-field" min="1" max="${totalCount}" required>
                </div>
                <div class="flex flex-col mb-4">
                    <label class="text-white">Name:</label>
                    <input type="text" name="playerName" class="input-field" required>
                </div>
                <button type="button" onclick="savePlayerDetails()" class="px-4 py-2 bg-green-500 text-white font-bold rounded">Next</button>
            `;
        }

        function savePlayerDetails() {
            const playerNumber = document.querySelector('input[name="playerNumber"]').value;
            const playerName = document.querySelector('input[name="playerName"]').value;

            if (playerNumber < 1 || playerNumber > totalCount) {
                alert(`Please enter a number between 1 and ${totalCount}.`);
                return;
            }

            players.push({ number: playerNumber, name: playerName });

            if (currentPlayer < playerCount) {
                currentPlayer++;
                showPlayerInputForm(currentPlayer);
            } else {
                document.getElementById('playerDetailsSection').style.display = 'none';
                document.getElementById('playButton').style.display = 'block';
            }
        }

        function startPlayerTurn(playerIndex) {
            const player = players[playerIndex];
            let timeLeft = 15;

            document.getElementById('timer').innerText = `Player ${playerIndex + 1}'s turn (${timeLeft}s)`;

            timer = setInterval(() => {
                timeLeft--;
                document.getElementById('timer').innerText = `Player ${playerIndex + 1}'s turn (${timeLeft}s)`;

                if (timeLeft <= 0) {
                    clearInterval(timer);
                    currentPlayer = (currentPlayer + 1) % playerCount;
                    startPlayerTurn(currentPlayer);
                }
            }, 1000);
        }

        function handleSquareClick(event) {
            const clickedSquare = event.target;
            const clickedNumber = parseInt(clickedSquare.innerText, 10);
            const player = players[currentPlayer];
        
            if (clickedNumber === parseInt(player.number)) {
                alert(`You can't click your own number!`);
                return;
            }
        
            const winner = players.find(p => parseInt(p.number) === clickedNumber);
        
            if (winner) {
                alert(`${winner.name} wins!`);
                clearInterval(timer);
                return;
            }
        
            // Set the background color to transparent and disable click
            clickedSquare.style.backgroundColor = 'transparent';
            clickedSquare.style.pointerEvents = 'none'; // Disable clicks
            clickedSquare.style.cursor = 'default'; // Change cursor to default
        
            clearInterval(timer);
            currentPlayer = (currentPlayer + 1) % playerCount;
            startPlayerTurn(currentPlayer);
        }
        
        
        
        

        function play() {
            document.getElementById('box').style.display = 'none';
            const body = document.querySelector('body');

            const contentContainer = document.createElement('div');
            contentContainer.className = 'content-container';

            const squaresContainer = document.createElement('div');
            squaresContainer.className = 'squares-container';

            for (let i = 1; i <= totalCount; i++) {
                const square = document.createElement('div');
                square.className = 'square';
                square.innerText = i;
                square.style.cursor = 'pointer';
                square.onclick = handleSquareClick;
                squaresContainer.appendChild(square);
            }

            const playersContainer = document.createElement('div');
            playersContainer.className = 'players-container';

            players.forEach(player => {
                const playerDiv = document.createElement('div');
                playerDiv.className = 'player-detail';
                playerDiv.innerText = `${player.name}`;
                playersContainer.appendChild(playerDiv);
            });

            const timerDiv = document.createElement('div');
            timerDiv.id = 'timer';
            timerDiv.className = 'timer text-white text-xl mb-4';

            contentContainer.appendChild(timerDiv);
            contentContainer.appendChild(squaresContainer);
            contentContainer.appendChild(playersContainer);
            body.appendChild(contentContainer);

            startPlayerTurn(0);
        }