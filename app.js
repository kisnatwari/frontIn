const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multer = require('multer');
const multipart = multer().none();

const indexRoute = require("./routes/index.routes");
const signupRoute = require("./routes/signup.routes");
const companyRoute = require("./routes/company.routes");
const tokenService = require("./services/token.service");
const userRoute = require("./routes/user.routes");
const loginRoute = require("./routes/login.routes");
const profileRoute = require("./routes/profile.routes");
const authController = require('./controllers/auth.controller');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(multipart);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoute);
app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);


//Middleware verifying token For private API
app.use((request, response, next) => {
  const jwtVerification = tokenService.verifyToken(request);
  if (jwtVerification.isVerified) {
    next();
  }
  else {
    response.clearCookie("authToken");
    response.status(401).redirect("/");
  }
});

const autoLogger = () => {
  return async (request, response, next) => {
    const isLogged = await authController.checkUserLog(request);
    if (isLogged) {
      next();
    }
    else {
      response.clearCookie('authToken');
      response.redirect("/");
    }
  }
}

app.use("/api/private/company", companyRoute);
app.use("/api/private/user", userRoute);
app.use("/profile", autoLogger(), profileRoute);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('index');
});

module.exports = app;
