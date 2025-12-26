const express = require("express");
const app = express();
const path = require("path");
const PORT = 2000;
require("dotenv").config();
const connect_data = require("./config/db");
// const user_cpy = require("./models/user_cpy");
// const staff = require("./models/staff");
connect_data();
require("./routes/authRoutes");

const registeredUser = require("./models/User");

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const authRoutes = require("./routes/authRoutes");

// use router
app.use("/", authRoutes);
// app.use((req, res, next) => {
//   const registeredEmail = registeredUser.findOne({
//     email: req.body,
//   });

//   console.log("middleware check");
//   if (registeredUser) {
//     res.json("user already existed");
//   } else {
//     next();
//   }
// });
// app.post("/userRegistration", async (req, res) => {
//   try {
//     const register = await registeredUser.create(req.body);
//     res.status(201).json(register);
//   } catch (error) {
//     console.log(error);
//     res.json({ message: "cant create the user" });
//   }
// });

// console.log(process.env.MONGO_URI);

// app.get("/", (req, res) => {
//   res.send("this is home hello,welcome to the home");
// });

// // const getdata = async () => {
// //   try {
// //     const store_data = await user_cpy.create({
// //       name: "Karan Choudhary",
// //       age: 23,
// //       email: "karan@gmail.com",
// //     });
// //     // res.send("this is open");
// //     console.log("user created");
// //   } catch (error) {
// //     console.error("error creating user : ", error.message);
// //   }
// // };

// // getdata();

// app.get("/users", async (req, res) => {
//   try {
//     const users = await user_cpy.find(); // fetch all documents
//     res.status(200).json(users); // send data as JSON to browser
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.post("/createUser/:id", async (req, res) => {
//   let data = req.headers;
//   let params = req.headers;
//   // const userData = await user_cpy.create(data);
//   res.send(params);
// });

// app.post("/users", async (req, res) => {
//   const newUser = await user_cpy.create(req.body);
//   res.status(201).json(newUser);
// });

// app.get("/users", async (req, res) => {
//   const newUsers = await user_cpy.find();
//   res.status(200).json(newUsers);
// });

// app.get("/users/:id", async (req, res) => {
//   try {
//     console.log(req.params);
//     const newUserById = await user_cpy.findById(req.params.id);
//     if (!newUserById)
//       return res.status(404).json({ message: "User not found" });
//     res.status(200).json(newUserById);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.put("/users", async (req, res) => {
//   try {
//     const updatedUser = await user_cpy.findByIdAndUpdate(
//       req.query.id,
//       req.body,
//       {
//         new: true,
//       }
//     );
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });

// app.delete("/users/:id", async (req, res) => {
//   try {
//     const deletedUser = await user_cpy.findByIdAndDelete(req.params.id);
//     if (!deletedUser)
//       return res.status(404).json({ message: "User not found" });
//     res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post("/staff", async (req, res) => {
//   try {
//     const addStaff = await staff.create(req.body);
//     res.status(201).json(addStaff);
//   } catch (error) {
//     res.status(500).json({ message: "user not created" });
//   }
// });

// app.get("/staff", async (req, res) => {
//   try {
//     const getStaffData = await staff.findOne({
//       emailId: "mehtapratham@gmail.com",
//     });
//     res.status(200).json(getStaffData);
//   } catch (error) {
//     res.status(500).json({ message: "Data not found" });
//   }
// });

// app.put("/staff", async (req, res) => {
//   try {
//     const UpdateStaffData = await staff.findOneAndUpdate(
//       req.query.staffId,
//       req.body,
//       { new: true }
//     );
//     res.status(200).json(UpdateStaffData);
//   } catch (error) {
//     res.status(500).json({ message: "Data not found" });
//   }
// });

app.get("/health", function () {
  res.send("server is healthy ");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
