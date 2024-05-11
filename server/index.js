require('dotenv').config();
const path = require('path');
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// express app
const app = express();
const port = process.env.PORT || 5000;
// Allow requests from your frontend origin
app.use(cors({
  origin: ['http://localhost:3000','http://0.0.0.0:3000','http://192.168.1.242:3000']  // Adjust if your frontend host/port differs
}));



app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Routers
const productRouter = require('./routes/produtoRoutes');
const orderRouter = require('./routes/pedidoRoutes');

app.use('/produtos', productRouter);
app.use('/pedidos', orderRouter);



app.use((req,res,next) =>{
    console.log(req.path,req.method)
    next()
})

app.use(express.static(path.join(__dirname, '../menuapp/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../menuapp/build/index.html'));
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests after successful DB connection
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });