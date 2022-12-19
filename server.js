const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
var passport = require("passport");
var LocalStrategy = require("passport-local");
const User = require("./public/models/user.js");
var { LocalStorage } = require("node-localstorage");
let localStorage = new LocalStorage("./");
let count = 0;
app.listen(3000);

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tiwarivv_3@rknec.edu",
    pass: "Vinit@1912",
  },
});

let details = {
  from: "tiwarivv_3@rknec.edu",
  to: `${localStorage.getItem("userEmail")}`,
  subject: "Task Reminder !",
  text: "texting text out",
};

// transporter.sendMail(details,(err)=>{
//   if(err){
//     console.log(err)
//   }
//   else{
//     console.log('success')
//   }
// })

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
  Collection,
} = require("mongodb");
const { json } = require("body-parser");
const uri =
  "mongodb+srv://admin:admin@user-database-cluster.2aycy78.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("TODO").collection("TASKS");
  console.log("Database connected");
  app.get("/", (req, res) => {
    console.log(localStorage.getItem("userEmail"));
    collection
      .find({ email: localStorage.getItem("userEmail") })
      .toArray(function (err, result) {
        if (!err) {
          console.log(result[0].reminders);
          res.render("index", { data: result[0].reminders });
        }
      });
  });


  app.post("/", async (req, res) => {
    let userArr = [];
    let { task, date, tasktime } = req.body;
    let taskObj = { task: task, date: date, tasktime: tasktime };
    details.text = "Task: " + task + ", Date: " + date + ", Time: " + tasktime;
    details.to = `${localStorage.getItem("userEmail")}`;
    transporter.sendMail(details, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
      }
    });
    collection
      .find({ email: localStorage.getItem("userEmail") })
      .toArray(async (err, res) => {
        // console.log("previous", res[0].reminders);
        userArr = res[0].reminders;
        await userArr.push(taskObj);
        // console.log("user aray", userArr);
        await collection.findOneAndUpdate(
          { email: localStorage.getItem("userEmail") },
          {
            $set: {
              reminders: userArr,
            },
          }
        );
      });
    res.redirect("/");
  });

  app.get("/register", (req, res) => {
    res.render("register");
  });

  app.post("/register", async (req, res) => {
    const { name, email } = req.body;
    var hashedPassword = null;
    bcrypt.genSalt(10, function (err, Salt) {
      bcrypt.hash(req.body.password, Salt, function (err, hash) {
        if (err) {
          return console.log("Cannot encrypt");
        }
        hashedPassword = hash;
      });
    });
    let existing = null;
    existing = await collection.findOne({ email: email });
    if (existing) {
      res.send("User Already Registered");
    } else {
      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        reminders: [],
      });
      localStorage.setItem("userEmail", newUser.email);
      console.log(localStorage.getItem("userEmail"));
      collection.insertOne(newUser);
      res.redirect("/");
    }
    
  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.post("/login", async function (req, res) {
    let count = 0;
    const { email, password } = req.body;
    collection.find({ email: email }).toArray((req, rs) => {
      console.log(password);
      bcrypt.compare(password, rs[0].password, function (err, resu) {
        console.log(resu);
        if (resu) {
          localStorage.setItem("userEmail", email);
          res.redirect("/");
        } else {
          res.redirect("/login");
        }
      });
      // if(){
      //   console.log('sdsddsdsdsdsdsds')
      //   localStorage.setItem("userEmail", email);
      //   res.redirect("/")
      // }
      // else{
      //   res.redirect("/login")
      // }
    });
  });

  });

  app.get("/delete/:id", (req, res) => {
    console.log(req.params.id);
    collection
      .findOneAndUpdate(
        { email: localStorage.getItem("userEmail") },
        {
          $pull: {
            reminders: { task: req.params.id },
          },
        }
      )
      .then(() => {
        console.log("deleted");
        res.redirect("/");
      });
  });
});
