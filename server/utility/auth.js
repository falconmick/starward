export const mustLoginXhrMiddleware = (req, res, next) => {
  if (req.bearerAuthenticated) {
    next();
  } else {
    res.setHeader('WWW-Authenticate', 'Bearer realm="xhr"');
    res.status(401).json({ error: 'must be logged in' });
  }
};

export const mustLoginHttpMiddleware = ({failureRedirect = '/unauthorized'}) => (req, res, next) => {
  if (req.cookieAuthenticated) {
    next();
  } else {
    res.setHeader('WWW-Authenticate', 'Bearer realm="http"');
    res.redirect(failureRedirect);
  }
};