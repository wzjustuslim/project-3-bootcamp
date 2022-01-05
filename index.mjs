import express from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import dotenv from 'dotenv';

import bindRoutes from './routes.mjs';

dotenv.config();
const app = express();
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json());

bindRoutes(app);

const PORT = process.env.PORT || 3004;
app.listen(PORT);
