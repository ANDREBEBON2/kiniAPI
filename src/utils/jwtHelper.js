const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken =  (userData) => {
const payload = {
    id: userData._id,
    email: userData.email,
    name: userData.name
};
 
// membuat token dengan masa berlaku 1 jam
return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

return token;
}

module.exports = { generateToken };