const { Router } = require('express');
const router = Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

//google auth routes
router.get('/', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/callback',
  passport.authenticate('google', { failureRedirect: '/#/signup' }),
  async (req, res) => {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT);
    // Successful authentication, redirect to home.
    res.send(`
      <html>
          <head>
              <script>
                  window.localStorage.setItem('userToken', '${token}');
                  window.document.location = "/#/home"
              </script>
          </head>
      </html>
      `);
  }
);

module.exports = router;
