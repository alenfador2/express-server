const passport = require('passport');

const authMiddleware = async (req, res, next) => {
  await passport.authenticate('jwt', { session: false }),
    (req, res) => {
      req.user = user;
      if (!user || error) {
        console.log(user);
        console.error('Error with authentication:', error);
        return res.json({
          status: 401,
          message: 'Unauthorized',
        });
      }
      next();
    };
};

export default authMiddleware;
