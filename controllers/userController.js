var db = require("../models");
var User = db.user;
var addUser = async (req, res) => {
  const jane = await User.create({ firstName: "Robin", lastName: "Singh" });
  //   const jane = User.build({ firstName: "Jane", lastName: "singh" });
  console.log(jane instanceof User); // true
  console.log(jane.firstName); // "Jane"
  //   jane.set({firstName: "Anuj", lastName: "Kumar"});
  await jane.update({ firstName: "Su Su", lastName: "Kyi" });
  await jane.save();
  //   await jane.save();
  console.log("Jane was saved to the database!");
  await jane.destroy();
  console.log(jane.toJSON());
  res.status(200).json(jane.toJSON());
};

module.exports = {
  addUser,
};
