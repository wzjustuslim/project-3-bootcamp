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
    const board = [];
    const currentPlayer = 0;

    for (let i = 0; i < 7; i += 1) {
      board.push([]);
    }

    const newGame = {
      gameState: {
        board,
        currentPlayer,
      },
    };

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

  const update = async (req, res) => {
    try {
      const { id, col } = req.params;

      const game = await db.Game.findByPk(id);

      let { board, currentPlayer } = game.gameState;

      if (board[col].length < 6) {
        board[col].push(currentPlayer);

        if (!currentPlayer) {
          currentPlayer = 1;
        } else {
          currentPlayer = 0;
        }
      }

      await db.Game.update({
        gameState: {
          board: game.gameState.board,
          currentPlayer,
        },
      }, {
        where: { id },
      });

      res.send({
        board: game.gameState.board,
        currentPlayer,
      });
    } catch (err) {
      res.status(500).send(err);
    }
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
