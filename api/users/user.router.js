const router = require("express").Router();
const { checkToken, ApiAutheticateToken } = require("../../auth/token_validation");
const {
  createUser,
  login,
  getUserByUserId,
  getUsers,
  updateUsers,
  deleteUser
} = require("./user.controllar");
// router.get("/", checkToken, getUsers);
router.post("/", ApiAutheticateToken, createUser);
// router.get("/:id", checkToken, getUserByUserId);
router.post("/login", login);
// router.patch("/", checkToken, updateUsers);
// router.delete("/", checkToken, deleteUser);


module.exports = router;