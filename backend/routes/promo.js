const router = require('express').Router();
let Promo = require('../models/promo.model')

// getAllPromo
router.route('/').get((req, res) => {
  Promo.find()
    .then(promo => res.json(promo))
    .catch(err => res.status(400).json('Error : ' + err))
});

// getPromo
router.route('/:code').get((req, res) => {
  Promo.find({ code: req.params.code })
    .then(promo => res.json(promo))
    .catch(err => res.status(400).json('Error : ' + err))
});

// getPromobyId
router.route('/id/:id').get((req, res) => {
  Promo.findById(req.params.id)
    .then(promo => res.json(promo))
    .catch(err => res.status(400).json('Error : ' + err))
});

// addPromo
router.route('/add').post((req, res) => {
  const tripId = req.body.tripId;
  const code = req.body.code;
  const discount = req.body.discount;
  const description = req.body.description;
  const expDate = req.body.expDate;

  const newPromo = new Promo({ tripId, code, discount, description, expDate });

  newPromo.save()
    .then(() => res.json('New promo added'))
    .catch(err => res.status(400).json('Error : ' + err));
});

// updatePromo
router.route('/update/:id').post((req, res) => {
  Promo.findById(req.params.id)
    .then(promo => {
      promo.code = req.body.code;
      promo.discount = req.body.discount;

      promo.save()
        .then(() => res.json('Promo updated'))
        .catch(err => res.status(400).json('Error : ' + err))
    })
    .catch(err => res.status(400).json('Error : ' + err))
});

// deletePromo
router.route('/:id').delete((req, res) => {
  Promo.findByIdAndDelete(req.params.id)
    .then(() => res.json('Promo deleted'))
    .catch(err => res.status(400).json('Error : ' + err));
});

module.exports = router;