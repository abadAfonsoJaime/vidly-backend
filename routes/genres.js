const express = require("express");
const router = express.Router();
const Joi = require("joi");

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Horror" },
  { id: 3, name: "Romance" }
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const theGenre = {
    id: genres.length + 1,
    name: req.body.name
  };
  genres.push(theGenre);
  res.send(theGenre);
});

router.put("/:id", (req, res) => {
  const theGenre = genres.find(c => c.id === parseInt(req.params.id));
  if (!theGenre)
    return res.status(404).send("The genre with the given ID was not found");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0]);

  theGenre.name = req.body.name;
  res.send(theGenre);
});

router.delete("/:id", (req, res) => {
  const theGenre = genres.find(c => c.id === parseInt(req.params.id));
  if (!theGenre)
    return res.status(404).send("The genre with the given ID was not found");

  const index = genres.idndexOf(theGenre);
  genres.splice(index, 1);

  res.send(theGenre);
});

router.get("/:id", (req, res) => {
  const theGenre = genres.find(c => c.id === parseInt(req.params.id));
  if (!theGenre)
    return res.status(404).send("The genre with the given ID was not found");
  res.send(theGenre);
});

function validateGenre(theGenre) {
  const schema = {
    name: join
      .string()
      .min(3)
      .required()
  };
  return Joi.validate(theGenre, schema);
}

module.exports = router;
