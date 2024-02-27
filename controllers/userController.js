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
  // await jane.destroy();
  await jane.reload();
  console.log(jane.toJSON());
  res.status(200).json(jane.toJSON());
};

var getUsers = async (req, res) => {
  const data = await User.findAll({});
  res.status(200).json({data:data});
}

var getUser = async (req, res) => {
  const data = await User.findOne({
    where: {
      id: req.params.id
    }
  });
  res.status(200).json({data:data});
}

var postUsers = async (req, res) => {
  var postData = req.body;
  if(postData.length>1){
    var data = await User.bulkCreate(postData);
  }else {
    var data = await User.create(postData);
  }
  res.status(200).json({data:data});
}

var deleteUser = async (req, res) => {
  const data = await User.destroy({
    where: {
      id: req.params.id
    }
  });
  res.status(200).json({data:data});
}

var patchUser = async (req, res) => {
  var updatedData = req.body;
  const data = await User.update(updatedData,{
    where: {
      id: req.params.id
    }
  });
  res.status(200).json({data:data});
}

module.exports = {
  addUser,
  getUsers,
  getUser,
  postUsers,
  deleteUser,
  patchUser
};
