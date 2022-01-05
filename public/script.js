$(window).on('load', () => {
  $('#staticBackdrop').modal('show');
});

let currentGameId = null;

const createGame = () => {
  axios.post('/games/create')
    .then((res) => {
      currentGameId = res.data.id;
    }).catch((err) => {
      console.error('error: ', err);
    });
};

// signup and login buttons //
const createUser = () => {
  const email = document.querySelector('#floatingInputSignup').value;
  const password = document.querySelector('#floatingPasswordSignup').value;

  axios.post('/users/create', { email, password })
    .then((res) => {
      if (res.data.id) {
        $('#staticBackdrop').modal('hide');
      }
      createGame();
    }).catch((err) => {
      console.error(`error: ${err}`);
    });
};

const signupBtn = document.querySelector('#signup-btn');
signupBtn.addEventListener('click', createUser);

const loginUser = () => {
  const email = document.querySelector('#floatingInputLogin').value;
  const password = document.querySelector('#floatingPasswordLogin').value;

  axios.post('/users/login', { email, password })
    .then((res) => {
      if (res.data.id) {
        $('#staticBackdrop').modal('hide');
      }
      createGame();
    }).catch((err) => {
      console.error(`error: ${err}`);
    });
};

const loginBtn = document.querySelector('#login-btn');
loginBtn.addEventListener('click', loginUser);

// below is board //
const board = document.querySelector('#board');
for (let i = 0; i < 7; i += 1) {
  const col = document.createElement('div');
  col.className = 'column';
  col.id = `col-${i}`;
  board.appendChild(col);
  // eslint-disable-next-line no-loop-func
  col.addEventListener('click', () => {
    axios.put(`/games/${currentGameId}/${i}`)
      .then((res) => {
        col.innerHTML = '';

        for (let k = 0; k < 6; k += 1) {
          const row = document.createElement('div');
          row.classList.add('slot');

          if (res.data.board[i][k] === 0) {
            row.classList.add('red');
          } else if (res.data.board[i][k] === 1) {
            row.classList.add('blue');
          }
          row.id = `row-${k}`;
          col.appendChild(row);
        }

        const player = document.querySelector('#player');
        if (res.data.currentPlayer === 0) {
          player.innerText = 'Player 1 🔴';
        } else if (res.data.currentPlayer === 1) {
          player.innerText = 'Player 2 🔵';
        }
      }).catch((err) => {
        console.error('error: ', err);
      });
  });

  for (let j = 0; j < 6; j += 1) {
    const row = document.createElement('div');
    row.className = 'slot';
    row.id = `row-${j}`;
    col.appendChild(row);
  }
}
