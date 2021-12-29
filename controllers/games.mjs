export default function initGamesController(db) {
  const index = (req, res) => {
    console.log('index');
    res.render('games/index');
  };

  const createForm = (req, res) => {
    console.log('createForm');
    res.send('createForm');
  };

  const create = async (req, res) => {
    const newGame = {
      gameState: [],
    };
    for (let i = 0; i < 7; i += 1) {
      newGame.gameState.push([]);
    }

    try {
      const game = await db.Game.create(newGame);
      res.send(game);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  const show = (req, res) => {
    console.log('show');
    res.send('show');
  };

  const edit = (req, res) => {
    console.log('edit');
    res.send('edit');
  };

  const update = (req, res) => {
    console.log('update');
    res.send('update');
  };

  const destroy = (req, res) => {
    console.log('destroy');
    res.send('destroy');
  };

  return {
    index,
    createForm,
    create,
    show,
    edit,
    update,
    destroy,
  };
}
