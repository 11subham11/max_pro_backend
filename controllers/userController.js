const { All_Users } = require("../models");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");

// Check for login
const auth = (req, res) => {
  try {
    if (req.user) {
      res.json(req.user);
    } else {
      res.json({ error: "not authorized" });
    }
  } catch (err) {
    console.log(err);
  }
};

// Admin Login
const loginUser = async (req, res) => {
  try {
    const data = req.body.values;
    if (data) {
      const userExists = await All_Users.findOne({
        where: {
          email: data.email,
          isDeleted: 0,
          isConfirmed: 1,
          isSuspended: 0,
        },
      });
      if (userExists) {
        if (userExists.isBlocked === 1) {
          console.log("User is Blocked");
          res.json({ error: "User is Blocked" });
        } else {
          bcrypt
            .compare(data.password, userExists.password)
            .then(async (match) => {
              if (!match) {
                if (userExists.count < 2) {
                  await All_Users.update(
                    { count: userExists.count + 1 },
                    {
                      where: {
                        email: userExists.email,
                      },
                    }
                  );
                  res.json({ error: "Email/Password doesn't match" });
                } else {
                  await All_Users.update(
                    { isBlocked: 1 },
                    {
                      where: {
                        email: userExists.email,
                      },
                    }
                  );
                  return res.json({ error: "User is Blocked" });
                }
              } else {
                await All_Users.update(
                  { count: 0 },
                  {
                    where: {
                      email: userExists.email,
                    },
                  }
                );

                const token = sign(
                  {
                    role: userExists.role,
                    id: userExists.id,
                    name: userExists.firstName,
                    email: userExists.email,
                  },
                  "importantsecret"
                );
                return res.json({
                  token,
                  message: "success",
                  role: userExists.role,
                  id: userExists.id,
                  name: userExists.firstName,
                  email: userExists.email,
                });
              }
            });
        }
      } else {
        res.json({
          error: "Either You are Not User or your account is pending",
        });
      }
    } else {
      console.log("Invalid");
      res.json({ message: "Invalid" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Register Admin
const registerUser = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    if (data) {
      console.log(data.email);
      const emailExists = await All_Users.findOne({
        where: {
          email: data.email,
        },
      });
      const phoneExists = await All_Users.findOne({
        where: {
          phone: data.phone,
        },
      });

      if (emailExists || phoneExists) {
        res.json({
          error:
            "User is already registered with the given Phone Number or Email",
        });
        console.log(
          "User is already registered with the given Phone Number or Email "
        );
      } else {
        await bcrypt.hash(data.password, 10).then((hash) => {
          console.log(hash);
          All_Users.create({ ...data, password: hash });
        });
        res.json({ message: "User has been successfully registered" });
      }
    } else
      (error) => {
        console.log(error);
      };
  } catch (err) {
    res.json(err);
    console.log(err);
  }
};

//Get all Users
const getAllUsers = async (req, res) => {
  try {
    const users = await All_Users.findAll();
    res.json(users);
  } catch (err) {
    console.log(err);
  }
};

//Get User by Id
const getUser = async (req, res) => {
  try {
    const data = await All_Users.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json({ message: "success", data });
  } catch (error) {
    console.log(error);
  }
};

//Deleted User By Id
const DeletedUserById = async (req, res) => {
  try {
    const UserId = req.params.id;
    if (UserId) {
      await All_Users.update(
        {
          isDeleted: 1,
        },
        {
          where: {
            id: UserId,
          },
        }
      );

      res.json("User Deleted!");
      console.log("User Deleted!");
    } else {
      res.json("Invalid User Id...");
      console.log("Invalid User Id...");
    }
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

//Activate User By Id
const ActivateUser = async (req, res) => {
  try {
    const UserId = req.params.id;
    if (UserId) {
      await All_Users.update(
        {
          isDeleted: 0,
        },
        {
          where: {
            id: UserId,
          },
        }
      );

      res.json("User Activate!");
      console.log("User Activate!");
    } else {
      res.json("Invalid User Id...");
      console.log("Invalid User Id...");
    }
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

//Blocked User By Id
const BlockedUserById = async (req, res) => {
  try {
    const UserId = req.params.id;
    if (UserId) {
      await All_Users.update(
        {
          isBlocked: 1,
        },
        {
          where: {
            id: UserId,
          },
        }
      );

      res.json("User Blocked!");
      console.log("User Blocked!");
    } else {
      res.json("Invalid User Id...");
      console.log("Invalid User Id...");
    }
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

//UnBlock User By Id
const UnBlockUser = async (req, res) => {
  try {
    const UserId = req.params.id;
    if (UserId) {
      await All_Users.update(
        {
          isBlocked: 0,
        },
        {
          where: {
            id: UserId,
          },
        }
      );

      res.json("User UnBlocked!");
      console.log("User UnBlocked!");
    } else {
      res.json("Invalid User Id...");
      console.log("Invalid User Id...");
    }
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

//Confirm User By Id
const ConfirmUserById = async (req, res) => {
  try {
    const UserId = req.params.id;
    if (UserId) {
      await All_Users.update(
        {
          isConfirmed: 1,
        },
        {
          where: {
            id: UserId,
          },
        }
      );

      res.json("User Confirm!");
      console.log("User Confirm!");
    } else {
      res.json("Invalid User Id...");
      console.log("Invalid User Id...");
    }
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

//UnConfirm User By Id
const UnConfirmUser = async (req, res) => {
  try {
    const UserId = req.params.id;
    if (UserId) {
      await All_Users.update(
        {
          isConfirmed: 0,
        },
        {
          where: {
            id: UserId,
          },
        }
      );

      res.json("User UnConfirm!");
      console.log("User UnConfirm!");
    } else {
      res.json("Invalid User Id...");
      console.log("Invalid User Id...");
    }
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

//Suspend User By Id
const SuspendUserById = async (req, res) => {
  try {
    const UserId = req.params.id;
    if (UserId) {
      await All_Users.update(
        {
          isSuspended: 1,
        },
        {
          where: {
            id: UserId,
          },
        }
      );

      res.json("User Suspend!");
      console.log("User Suspend!");
    } else {
      res.json("Invalid User Id...");
      console.log("Invalid User Id...");
    }
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

//UnSuspend User By Id
const UnSuspendUser = async (req, res) => {
  try {
    const UserId = req.params.id;
    if (UserId) {
      await All_Users.update(
        {
          isSuspended: 0,
        },
        {
          where: {
            id: UserId,
          },
        }
      );

      res.json("User UnSuspend!");
      console.log("User UnSuspend!");
    } else {
      res.json("Invalid User Id...");
      console.log("Invalid User Id...");
    }
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  getUser,
  loginUser,
  auth,
  DeletedUserById,
  ActivateUser,
  BlockedUserById,
  UnBlockUser,
  ConfirmUserById,
  UnConfirmUser,
  SuspendUserById,
  UnSuspendUser,
};
