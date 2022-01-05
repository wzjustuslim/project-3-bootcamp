import jwt from 'jsonwebtoken';

export default function requireAuth(req, res, next) {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.SALT, (err, decoded) => {
      if (err) {
        console.error(err.message);
        res.status(403).send({});
      } else {
        console.log(`decoded token: ${decoded.email}`);
        next();
      }
    });
  } else {
    res.status(403).send({});
  }
}
