var db = require("../models");
const { Sequelize, Op, QueryTypes } = require('sequelize');
var User = db.user;
var Contact = db.contact;
var Education = db.education;

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

// var queryUser = async (req, res) => {
//   const data = await User.create({
//     firstName: 'Roja',
//     lastName: 'Mica'
//   }, { fields: ['firstName'] });
//   // let's assume the default of isAdmin is false
//   console.log(data.firstName); // 'alice123'
//   console.log(data.lastName); // false
//   res.status(200).json({data:data});
// }

// var queryUser = async (req, res) => {
//   const data = await User.findAll({
//       group: ['id'],
//       attributes: [
//         'id',
//       ['firstName', 'first_name'],
//       [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
//     ],
//     });
//   res.status(200).json({data:data});
// }

// const queryUser = async (req, res) => {
//   try {
//       // Query to retrieve the count of distinct ids
//       const countData = await User.count({ distinct: true, col: 'id' });

//       // Query to retrieve the id and first_name fields
//       const userData = await User.findAll({
//           attributes: [
//               'id',
//               ['firstName', 'first_name'],
//               ['lastName', 'last_name']
//           ],
//           raw: true,
//       });

//       // Constructing the response object
//       const data = userData.map(user => ({
//         id: user.id,
//         first_name: user.first_name,
//         last_name: user.last_name,
//         count: countData
//     }));

//       res.status(200).json({ data: data });
//   } catch (error) {
//       console.error("Error querying users:", error);
//       res.status(500).json({ success: false, message: error.message });
//   }
// }

// var queryUser = async (req, res) => {
//   const countData = await User.count({ distinct: true, col: 'id' });
//   const data = await User.findAll({
//       attributes: { exclude: ['firstName', 'lastName'],
//       include: ['id'] 
//     }
//     });
//   res.status(200).json({data:data});
// }

// var queryUser = async (req, res) => {
//   const data = await User.findAll({
//     where: {
//       [Op.and]: [
//         { id: 1 },
//         { firstName: 'Su Su' }
//       ]
//     }
//   });
//   res.status(200).json({data: data});
// }

// var queryUser = async (req, res) => {
//   const data = await User.findAll({
//       order: [
//         ['id', 'DESC']
//       ],
//         group: 'id',
//         limit: 1,
//         offset: 1
//   }); 
//   res.status(200).json({data:data});
// }

var queryUser = async (req, res) => {
  const data = await User.count({
    where: {
      id: {
        [Op.gt]: 3
      }
    }
  });
  res.status(200).json({data:data});
}

// const queryUser = async (req, res) => {
//   try {
//       // Query to retrieve individual columns
//       const userData = await User.findAll({
//           attributes: ['id', ['firstName', 'first_name']]
//       });

//       // Query to retrieve count of records
//       const countData = await User.count();

//       res.status(200).json({ userData: userData, count: countData });
//   } catch (error) {
//       console.error("Error querying users:", error);
//       res.status(500).json({ success: false, message: error.message });
//   }
// }

// Model Querying Finders//
// var findersUser = async (req, res) => {
//   const data = await User.findOne({
//     where: {
//       lastName: 'Singh'
//     }
//   });
//   res.status(200).json({data:data});
// }

// var findersUser = async (req, res) => {
//   const data = await User.findByPk(2);
//   res.status(200).json({data:data});
// }

// var findersUser = async (req, res) => {
//   const [user, created] = await User.findOrCreate({
//     where: { firstName: 'stebin' },
//     defaults: {
//       lastName: 'Technical Lead JavaScript'
//     }
//   });
//   res.status(200).json({data:user, created: created});
// }

var findersUser = async (req, res) => {
  const { count, rows } = await User.findAndCountAll({
    where: { lastName: 'Technical Lead JavaScript' }
  });
  res.status(200).json({data:rows, Count: count});
}

// Getters, Setters and Virtuals
var getSetVirtualUser = async (req, res) => {
  const data = await User.findAll({
    where: { lastName: 'Technical Lead JavaScript' }
  });
  // const data = await User.create({
  //   firstName: 'Naresh',
  //   lastName: 'Kumar'
  // });
  res.status(200).json({data: data});
}

var validateUser = async (req, res) => {
  var data = {};
  var messages={};
  try{
      data = await User.create({
      firstName: 'a12345',
      lastName: 'Kumar'
    });
  }catch(e){
    // console.log(e.errors)
    let message;
    e.errors.forEach(error => {
      switch(error.validatorKey){
        case 'isAlpha':
          message=error.message
          break;
        case 'isLowercase':
          message='Only lowercase is allowed'
          break;
        case 'len':
          message='min 2 max 10 characters are allowed'
          break;
      }
      messages[error.path]=message
    });
  }
  res.status(200).json({data: data, messages: messages});
}

  // var rawQueryUser = async (req, res) => {
  //   const users = await db.sequelize.query("SELECT * FROM `users`",
  //   { type: QueryTypes.SELECT,
  //     model: User,
  //     mapToModel: true,
  //     plain: false });
  //   res.status(200).json({data:users});
  // }

  var rawQueryUser = async (req, res) => {
    const users = await db.sequelize.query(
      "SELECT * FROM users WHERE id=$id",
      {
        bind: { id: '3' },
        type: QueryTypes.SELECT
      });
    res.status(200).json({data:users});
  }

  var oneToOneUser = async (req, res) => {
    // var data = await User.create({firstName: "gurmeet", lastName: "singh"})
    // if(data && data.id){
    //   await Contact.create({permanent_address: 'abc', current_address: 'xyz',
    //   'user_id': data.id})
    // }
    // var data = await User.findAll({
    //   // include: Contact,
    //   // attributes: ['firstName', 'lastName'],
    //   attributes: ['firstName', 'lastName'],
    //   include:[{
    //     model: Contact,
    //     as:'contactDetails',
    //     attributes: ['permanent_address', 'current_address']
    //   }],
    //   where: {id:2}
    // })
    var data = await Contact.findAll({
      attributes: ['permanent_address', 'current_address'],
      include:[{
        model: User,
        as:'userDetails',
        attributes: ['firstName', 'lastName'],
      }],
      where: {id:2}
    })
    res.status(200).json({data:data});
  }

  var oneToManyUser = async (req, res) => {
        // var data = await User.create({firstName: "gurmeet", lastName: "singh"})
    // if(data && data.id){
    //   await Contact.create({permanent_address: 'abc', current_address: 'xyz',
    //   'user_id': data.id})
    // }
    // var data = await Contact.findAll({
    //   attributes: ['permanent_address', 'current_address'],
    //   include:[{
    //     model: User,
    //     as:'userDetails',
    //     attributes: ['firstName', 'lastName'],
    //   }],
    //   where: {id:1}
    // })
    var data = await Contact.findAll({
      attributes: ['permanent_address', 'current_address'],
      include:[{
        model: User,
        as:'userDetails',
        attributes: ['firstName', 'lastName'],
      }]
    })
    res.status(200).json({data:data});
  }

  var manyToManyUser = async (req, res) => {
    // var data = await User.create({firstName: "rahul", lastName: "singh"})
    // if(data && data.id){
    //   await Contact.create({permanent_address: 'delhi', current_address: 'meerut'})
    // }
    // var data = {}
    // var data = await Contact.findAll({
    //   attributes: ['permanent_address', 'current_address'],
    //   include:[{
    //     model: User,
    //     attributes: ['firstName', 'lastName'],
    //   }]
    // })
    var data = await User.findAll({
      attributes: ['firstName', 'lastName'],
      include:[{
        model: Contact,
        attributes: ['permanent_address', 'current_address'],
      }]
    })
    res.status(200).json({data:data});
  }

  var paranoidUser = async (req, res) => {
    // var data = await User.create({firstName: 'jagat', lastName: 'kumar'})
    // var data = await User.destroy({
    //   where: {
    //     id: 2
    //   },
    //   // force: true
    // });
    // var data = await User.restore({where: {
    //   id: 2
    // }});
    // var data = await User.findAll({paranoid: false})
    var data = await User.findByPk(2, { paranoid: false });
    res.status(200).json({data:data});
  }

  var loadingUser = async (req, res) => {
    // var data = await User.create({firstName: "manoj", lastName: "kumar"})
    // if(data && data.id){
    //   await Contact.create({permanent_address: 'hapur', current_address: 'meerut', 'UserId':data.id})
    // }
    // var data = await User.findOne({
    //   where: {
    //     id: 2
    //   },
    //   // include: Contact
    // })
    // var contactData = await data.getContacts();
    // res.status(200).json({data:data, contactData: contactData})
    var data = await User.findAll({
      attributes: ['firstName', 'lastName'],
      include:[{
        model: Contact,
        attributes: ['permanent_address', 'current_address'],
      }]
    })
    res.status(200).json({data:data})
  }

  var eagerUser = async (req, res) => {
    //  var data = await User.create({firstName: "manoj", lastName: "kumar"})
    // if(data && data.id){
    //   await Contact.create({permanent_address: 'hapur', current_address: 'meerut', 'UserId':data.id})
    // }
    var data = await User.findAll({
      // include: [{
      //   model:Contact,
      //   required: false,
      //   right: true
      // },{
      //   model:Education
      // }]
      include:{
        model:Contact,
        include:{
          model:Education,
          where:{
            id:1
          }
        },
        where:{
          id:1
        }
      }
    })
    res.status(200).json({data: data, nested: true})
  }

module.exports = {
  addUser,
  getUsers,
  getUser,
  postUsers,
  deleteUser,
  patchUser,
  queryUser,
  findersUser,
  getSetVirtualUser,
  validateUser,
  rawQueryUser,
  oneToOneUser,
  oneToManyUser,
  manyToManyUser,
  paranoidUser,
  loadingUser,
  eagerUser,
};
