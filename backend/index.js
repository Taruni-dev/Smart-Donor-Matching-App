const express = require('express');
const mongoose = require('mongoose');
const admin = require('firebase-admin');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
app.use(express.json());  // For parsing application/json
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/bloodDonationDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebase-service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Routes
const routes = require('./routes'); // If you have general routes here
app.use('/api', routes);

const recipientRoutes = require('./routes/recipientRoutes'); // Donor matching route
app.use('/api/recipients', recipientRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const bloodRoutes = require('./routes/bloodRoutes');
app.use('/api/blood', bloodRoutes);

