const bcrypt = require('bcryptjs');
const password = 'wALyASS@@133';  // Set your desired password

bcrypt.hash(password, 10).then(hashedPassword => {
  console.log('Hashed Password:', hashedPassword);
}).catch(err => {
  console.error('Error generating hash:', err);
});
