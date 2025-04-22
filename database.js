require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  ip: { type: [String], required: true },
});

const User = mongoose.model("User", userSchema);

const createNewUser = (data) => {
  const newUser = new User(data);
  newUser
    .save()
    .then(() => {
      console.log("created user");
    })
    .catch((err) => {
      return new Error(err);
    });
};

const findByName = async (name) => {
  return await User.findOne({ name: name });
};

const saveDocument = async (doc) => {
  doc.save();
  console.log("doc saved");
};

exports.UserModel = User;
exports.createNewUser = createNewUser;
exports.findByName = findByName;
exports.saveDocument = saveDocument;
