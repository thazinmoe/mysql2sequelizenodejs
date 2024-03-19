// const { DataTypes, Model } = require('sequelize');
// const sequelize = require('./index')

// const User = sequelize.define('User', {
//   // Model attributes are defined here
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: DataTypes.STRING
//     // allowNull defaults to true
//   }
// }, {
//   // Other model options go here
//   tableName: 'users',
// //   timestamps: false
// createdAt: false,
// updatedAt: 'updated_at'
// });

// // `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

module.exports = (sequelize, DataTypes, Model) => {
class User extends Model {}

User.init({
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isAlpha: {
        msg: "Only alphabets are allowed"
      },
      isLowercase: true,
      len: [2,10]
    },
    get() {
      const rawValue = this.getDataValue('firstName');
      return rawValue ? "Mr. "+ rawValue.toUpperCase() : null;
    }
  },
  lastName: {
    type: DataTypes.STRING,
    defaultValue: "Singh",
    // allowNull defaults to true
    set(value) {
      // Storing passwords in plaintext in the database is terrible.
      // Hashing the value with an appropriate cryptographic hash function is better.
      this.setDataValue('lastName', value + ' ,Indian');
    }
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    set(value) {
      throw new Error('Do not try to set the `fullName` value!');
    }
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});

return User;

// the defined model is the class itself
// console.log(User === sequelize.models.User); // true

}
