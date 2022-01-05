import jsSHA from 'jssha';
import jwt from 'jsonwebtoken';

const hashFunc = (str) => {
  const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
  shaObj.update(str);
  const hash = shaObj.getHash('HEX');
  return hash;
};

const createToken = (id, email) => {
  const maxAge = 5 * 24 * 60 * 60;
  return jwt.sign({ id, email }, process.env.SALT, { expiresIn: maxAge });
};

export default function initUsersController(db) {
  const index = (req, res) => {
    console.log('index');
    res.send('index');
  };

  const createForm = (req, res) => {
    console.log('createForm');
    res.send('createForm');
  };

  const create = async (req, res) => {
    const { email, password } = req.body;

    const hashedPassword = hashFunc(password);

    const newUser = {
      email,
      password: hashedPassword,
    };

    try {
      const user = await db.User.create(newUser);
      const token = createToken(user.id, user.email);
      const maxAge = 5 * 24 * 60 * 60 * 1000;
      res.cookie('jwt', token, { httpOnly: true, maxAge });
      res.status(201).send({ id: user.id, email: user.email });
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

  const login = async (req, res) => {
    const { email, password } = req.body;

    const hashedPassword = hashFunc(password);

    try {
      const user = await db.User.findOne({ where: { email } });

      if (hashedPassword === user.password) {
        const token = createToken(user.id, user.email);
        const maxAge = 5 * 24 * 60 * 60 * 1000;
        res.cookie('jwt', token, { httpOnly: true, maxAge });
        res.status(200).send({ id: user.id, email: user.email });
      } else {
        res.status(403).send({});
      }
    } catch (err) {
      res.status(500).send(err);
    }
  };

  return {
    index,
    createForm,
    create,
    show,
    edit,
    update,
    destroy,
    login,
  };
}
