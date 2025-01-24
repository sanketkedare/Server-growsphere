const bcrypt = require('bcrypt');

const passwordController = (req, res) => {
    const { enteredPassword, storedHash } = req.body;
    bcrypt.compare(enteredPassword, storedHash, (err, isMatch) => {
      if (isMatch) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    });
}

module.exports = passwordController;