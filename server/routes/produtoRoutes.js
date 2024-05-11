const express = require('express');
const Produto = require('../models/produtoModel'); // Correct the model name's first letter to be uppercase

const router = express.Router();

// Create Produto
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const newProduto = new Produto(req.body); // Use a different variable name for the new instance
    await newProduto.save();
    res.status(201).send(newProduto);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all Produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.find({});
    res.send(produtos);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read Produto by id
router.get('/:id', async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).send();
    }
    res.send(produto);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update Produto
router.patch('/:id', async (req, res) => {
  try {
    const updatedProduto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedProduto) {
      return res.status(404).send();
    }
    res.send(updatedProduto);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete Produto
router.delete('/:id', async (req, res) => {
  try {
    const produtoToDelete = await Produto.findByIdAndDelete(req.params.id);
    if (!produtoToDelete) {
      return res.status(404).send();
    }
    res.send(produtoToDelete);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
