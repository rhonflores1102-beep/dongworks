const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const { connectDatabase } = require('./config/db');
const router = require('./routes');
const { seedDemoData } = require('./data/store');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dongworkx-motor-shop-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 8,
    },
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', router);

app.use((req, res) => {
  res.status(404).render('pages/404', { title: 'Page Not Found' });
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  console.error('Request failed:', error);
  res.status(500).render('pages/error', {
    title: 'Unable to complete request',
    message: 'The request could not be completed. Please try again, and contact an administrator if the problem continues.',
  });
});

async function startServer() {
  await connectDatabase();
  await seedDemoData();
  app.listen(PORT, () => {
    console.log(`Dongworkx Motor Shop app is running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error('Unable to initialize the appointment management system.', error);
  process.exitCode = 1;
});
