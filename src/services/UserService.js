const User = require("../models/UserModel");

const createUser = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const doc = new User(data);
      await doc.save();
      resolve(doc);
    } catch (err) {
      reject(err);
    }
  });

module.exports = { createUser };
