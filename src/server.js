const express = require('express');
const cors = require('cors'); 

const portfolioRoutes = require('../routes/portfolio.routes');

const app = express();
/* Enable CORS for all routes cross-origin requests have to be allowed
 for the frontend to communicate with the backend */
app.use(cors()); 
app.use(express.json()); // Parse JSON request bodies

app.use('/api/portfolio', portfolioRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});