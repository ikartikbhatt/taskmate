const bcrypt = require("bcrypt");

// encPassword
async function encPass(password, { encrypt, dcrypt, hashPassword }) {
  const passwordSalt = await bcrypt.genSalt(10);

  if (encrypt) {
    const hashedPassword = await bcrypt.hash(password, passwordSalt);
    return hashedPassword;
  } else if (dcrypt) {
    return await bcrypt.compare(password, hashPassword);
  }
}

module.exports = encPass;
