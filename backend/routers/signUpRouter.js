const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('sign-up-form')
})
router.post('/', (req, res) => {
  
})

module.exports = router