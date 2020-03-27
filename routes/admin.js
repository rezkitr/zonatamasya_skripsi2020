const router = require("express").Router();
const bcrypt = require("bcrypt");
let Admin = require("../models/admin.model");

// getAllAdmin
router.route("/").get((req, res) => {
  Admin.find()
    .then(adm => res.json(adm))
    .catch(err => res.status(400).json("Error : " + err));
});

// getAdminforLogin
router.route("/login").post((req, res) => {
  Admin.findOne({ username: req.body.username })
    .then(admin => {
      bcrypt.compare(req.body.password, admin.password, function(err, isMatch) {
        if (err) {
          throw err;
        } else if (isMatch) {
          res.json("sukses");
        } else {
          res.json(null);
        }
      });
    })
    .catch(err => res.status(400).json("Error" + err));
});

// getAdminbyId
router.route("/id/:id").get((req, res) => {
  Admin.findById(req.params.id)
    .then(admin => res.json(admin))
    .catch(err => res.status(400).json("Error" + err));
});

// addAdmin
router.route("/add").post((req, res) => {
  const username = req.body.username;
  let password = req.body.password;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      throw err;
    } else {
      bcrypt.hash(password, salt, function(err, hash) {
        if (err) {
          throw err;
        } else {
          password = hash;
          const newAdmin = new Admin({ username, password });

          newAdmin
            .save()
            .then(() => res.json("New admin added"))
            .catch(err => res.status(400).json("Error : " + err));
        }
      });
    }
  });
});

// updateAdmin
router.route("/update/:id").post((req, res) => {
  Admin.findById(req.params.id)
    .then(admin => {
      admin.username = req.body.username;

      bcrypt.genSalt(10, function(err, salt) {
        if (err) {
          throw err;
        } else {
          bcrypt.hash(req.body.password, salt, function(err, hash) {
            if (err) {
              throw err;
            } else {
              admin.password = hash;
              admin
                .save()
                .then(() => res.json("Admin updated"))
                .catch(err => res.status(400).json("Error : " + err));
            }
          });
        }
      });
    })
    .catch(err => res.status(400).json("Error : " + err));
});

// deleteAdmin
router.route("/:id").delete((req, res) => {
  Admin.findByIdAndDelete(req.params.id)
    .then(() => res.json("Admin deleted"))
    .catch(err => res.status(400).json("Error : " + err));
});

module.exports = router;
