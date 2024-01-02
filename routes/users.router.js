const express = require('express');
const UsersService = require('../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createUserSchema, getUserSchema } = require('../schemas/user.schema');

const router = express.Router()
const service = new UsersService

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const users = await service.findOne(id);
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(createUserSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', validatorHandler(getUserSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(204).json({ id });
  } catch (error) {
    next(error);
  }
})

module.exports = router
