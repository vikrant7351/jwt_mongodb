const {
    create,
    getUserByUserEmail,
    getUser,
    updateUser,
    deleteUser

} = require("./user.service");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");


module.exports = {
    createUser: (req, res) => {
      const body = req.body;
      body.password = hashSync(body.password, genSaltSync(10));
      create(body, (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error"
          });
        }
        return res.status(201).json({
          success: 1,
          data: results
        });
      });
    },

    
  login: (req, res) => {
   
    getUserByUserEmail(req.body.email, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: 0,
          message: "Error fetching user"
        });
      }
      if (!results || !compareSync(req.body.password, results.password)) {
        return res.status(401).json({
          success: 0,
          message: "Invalid email or password"
        });
      }

      const token = sign({ result: results }, process.env.JWT_KEY, {
        expiresIn: "1h"
      });

      results.password = undefined;
      return res.json({
        success: 1,
        message: "Logged in successfully",
        token
      });
    });
  },


  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: 0,
          message: "Error fetching users"
        });
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },

  updateUsers: (req, res) => {
    const body = req.body;
    body.password = hashSync(body.password, genSaltSync(10));
    updateUser(body, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: 0,
          message: "Error updating user"
        });
      }
      return res.json({
        success: 1,
        message: "User updated successfully"
      });
    });
  },

  deleteUser: (req, res) => {
    deleteUser(req.body, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: 0,
          message: "Error deleting user"
        });
      }
      if (!results) {
        return res.status(404).json({
          success: 0,
          message: "User not found"
        });
      }
      return res.json({
        success: 1,
        message: "User deleted successfully"
      });
    });
  }
};