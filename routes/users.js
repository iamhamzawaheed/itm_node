var express = require('express');
var router = express.Router();
const User = require('../models/user')
const { body, validationResult } = require('express-validator');

router.get('/', async function (req, res, next) {
  const { id } = req.query;

  try {
    let users;

    if (id) {
      users = await User.findByPk(id);
      if (!users) {
        return res.status(200).json({ message: `User with id ${id} not found` });
      }
    } else {
      users = await User.findAll();
    }

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }

});

const validateUser = [
  body('firstName').isString().withMessage('First Name must be a string').notEmpty().withMessage('First Name is required'),
  body('lastName').isString().withMessage('Last Name must be a string').notEmpty().withMessage('Last Name is required'),
  body('email').isEmail().withMessage('Invalid email format').notEmpty().withMessage('Email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').notEmpty().withMessage('Password is required'),
];

router.post('/',validateUser , async function (req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const newUser = await User.create({ firstName: req.firstName, lastName: req.lastName, email: req.email });

  res.send('respond with a resource');
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }

    await user.update({
      firstName: firstName || user.firstName,  // Only update fields that are provided
      lastName: lastName || user.lastName
    });

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

// http://localhost:3000/users/1
router.delete('/:id', async (req, res) => {
  console.log('coming here/...............')
  const { id } = req.params; 
  console.log('The id', id)
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: `User with ID ${id} not found` });
    }
    await user.destroy();

    res.status(200).json({ message: `User with ID ${id} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

module.exports = router;
