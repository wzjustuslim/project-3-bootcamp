const createBtn = document.createElement('button');
createBtn.innerText = 'Start game';
document.body.appendChild(createBtn);

const createGame = () => {
  axios.post('/games/create')
    .then((res) => {
      console.log('response: ', res.data);
    }).catch((err) => {
      console.error('error: ', err);
    });
};
createBtn.addEventListener('click', createGame);

const board = document.querySelector('#board');
for (let i = 0; i < 7; i += 1) {
  const col = document.createElement('div');
  col.className = 'col';
  col.id = `col-${i}`;
  board.appendChild(col);

  for (let j = 0; j < 6; j += 1) {
    const row = document.createElement('div');
    row.className = 'row';
    row.id = `row-${j}`;
    col.appendChild(row);
  }
}
