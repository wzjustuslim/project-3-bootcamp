export default function initUsersController(db) {
  const index = (req, res) => {
    console.log('index');
    res.send('index');
  };

  const createForm = (req, res) => {
    console.log('createForm');
    res.send('createForm');
  };

  const create = (req, res) => {
    console.log('create');
    res.send('create');
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
