const router = require("express").Router();
const contentful = require("contentful");
require("dotenv").config();

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_TOKEN,
});

router.route("/").get((req, res) => {
  client
    .getEntries({
      content_type: "zonaTamasyaPhoto",
    })
    .then((photo) => res.json(photo))
    .catch((err) => res.status(400).json("Error : " + err));
});

router.route("/highlight").get((req, res) => {
  client
    .getEntries({
      content_type: "zonaHighlightPhoto",
    })
    .then((photo) => res.json(photo))
    .catch((err) => res.status(400).json("Error : " + err));
});

module.exports = router;
