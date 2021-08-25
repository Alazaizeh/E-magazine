'use strict';

module.exports = (users) => (req, res, next) => {
  if (!req.headers.authorization) {
      console.error(`No authorization header found - jwt`);
      next('Invalid login');
      return;
  }

  // Basic lkahsdfklhsdf
  // Bearer lksahdflkjhdsaflkhasdlkfhj

  let token = req.headers.authorization.split(' ').pop();
console.log();
  users.authenticateToken(token)
  .then((user) => {
      req.user = user;
      next();
  })
  .catch((err) => next('Invalid login'))
  
}

//   function _authError() {
//     next('Invalid Login');
//   }
// }
