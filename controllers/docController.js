const Dos = require('../models/Doc');

// CREATE DOS
const createDos = async (req, res) => {
  try {
    const { name, brand } = req.body;

    if (!name || !brand) {
      return res.status(400).json({ success: false, message: 'Name and brand required' });
    }

    const dos = await Dos.create({
      name,
      brand,
      user: req.user, // from auth middleware
    });

    res.status(201).json({ success: true, data: dos });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// GET ALL DOS FOR LOGGED-IN USER
const getMyDos = async (req, res) => {
  try {
    const dos = await Dos.find({ user: req.user });
    res.status(200).json({ success: true, data: dos });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { createDos, getMyDos };
