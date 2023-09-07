const User = require('../../config/schema');

module.exports = {
    create: (data, callBack) => {

      const newUser = new User({
        firstName: data.first_name,
        lastName: data.last_name,
        gender: data.gender,
        email: data.email,
        password: data.password,
        number: data.number
      });
  
      newUser.save((error, result) => {
        if (error) {
          callBack(error);
        }
        callBack(null, result);
      });
    },


    getUserByUserEmail: (email, callBack) => {
        User.findOne({ email: email }, (error, result) => {
          if (error) {
            callBack(error);
          }
          callBack(null, result);
        });
      },


      getUser: (callBack) => {
        User.find({}, (error, result) => {
          if (error) {
            callBack(error);
          }
          callBack(null, result);
        });
      },

      updateUser:(data,callBack) =>{
        User.updateOne(
            { id: data.id }, // Filter to find the user by their id
            {
                $set: {
                    firstName: data.first_name,
                    lastName: data.last_name,
                    gender: data.gender,
                    email: data.email,
                    password: data.password,
                    number: data.number
                }
            },
            (error, result) => {
                
                if (error) {
                    callBack(error);
                    return;
                }
                callBack(null, result);
            }
        );
      },
      deleteUser: (data, callBack) => {
        User.findByIdAndDelete(data.id, (error, result) => {
          if (error) {
            callBack(error);
          }
          callBack(null, result);
        });
      }
    };

    
