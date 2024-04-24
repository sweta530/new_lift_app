const express = require('express')
const router = express.Router()
const liftController = require('../controllers/lift.controller')

router.post('/lift', liftController.add)
router.put('/lift/:id', liftController.update)
router.delete('/lift/:id', liftController.delete)
router.get('/lift/:id', liftController.get)
router.get('/lift', liftController.getall)

module.exports = router
