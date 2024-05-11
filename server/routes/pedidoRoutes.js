const express = require('express');
const Pedido = require('../models/pedidoModel'); // Correctly imported model

const router = express.Router();

// Route to get the last number of Pedido
router.get('/last-number', async (req, res) => {
  try {
      const lastPedido = await Pedido.findOne().sort({ numero: -1 }); // Efficiently fetches the last order by number
      const lastNumber = lastPedido ? lastPedido.numero : 0; // Handles case where there are no existing orders
      res.json({ lastNumber });
  } catch (error) {
      res.status(500).send({ message: "Failed to fetch the last order number.", error: error });
  }
});

// Route to create a new Pedido
router.post('/', async (req, res) => {
  try {
    const newPedido = new Pedido(req.body); // Creates a new instance of Pedido
    await newPedido.save(); // Saves the new Pedido to the database
    res.status(201).send(newPedido);
  } catch (error) {
    res.status(400).send(error); // Sends detailed error message on failure
  }
});

// Route to update the status of a specific Pedido by ID
router.patch('/:id/status', async (req, res) => {
  try {
    // Assuming that 'estado' is a boolean field in your Pedido schema
    const updatedPedido = await Pedido.findByIdAndUpdate(
      req.params.id,
      { estado: true }, // Directly setting the estado to true to mark as delivered
      { new: true, runValidators: true }
    );

    if (!updatedPedido) {
      return res.status(404).send({ message: "Pedido not found" });
    }

    res.send(updatedPedido); // Send back the updated pedido
  } catch (error) {
    res.status(500).send({ message: "Error updating pedido status", error });
  }
});


// Route to get all Pedidos
router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.find({}).populate('items.produto'); // Populates product details in items
    res.send(pedidos);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to get a specific Pedido by id
router.get('/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id).populate('items.produto'); // Ensures deep population for product details
    if (!pedido) {
      return res.status(404).send();
    }
    res.send(pedido);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to update a specific Pedido
router.patch('/:id', async (req, res) => {
  try {
    const updatedPedido = await Pedido.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // Ensures the updated document is returned
    if (!updatedPedido) {
      return res.status(404).send();
    }
    res.send(updatedPedido);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to get the status of a specific Pedido by numero
router.get('/status/:numero', async (req, res) => {
  try {
    // Find the pedido by numero. Assuming numero is unique.
    const pedido = await Pedido.findOne({ numero: req.params.numero }).populate('items.produto');
    if (!pedido) {
      return res.status(404).send({ message: "Pedido not found" });
    }
    // You could also send specific parts of the pedido or the whole pedido object
    res.send({ estado: pedido.estado, message: "Status fetched successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error fetching pedido status", error });
  }
});


// Route to delete a specific Pedido
router.delete('/:id', async (req, res) => {
  try {
    const pedidoToDelete = await Pedido.findByIdAndDelete(req.params.id);
    if (!pedidoToDelete) {
      return res.status(404).send();
    }
    res.send(pedidoToDelete); // Confirms deletion by sending deleted document
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
