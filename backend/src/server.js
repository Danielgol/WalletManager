const express = require('express');
const cors = require('cors')
const app = express();

const routes = require('./routes');  // Since the file is index.js we don't need to specify

app.use(cors());
app.use(express.json());
app.use(routes);  // All routes defined on the routes/index.js file will be added to the app here

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
