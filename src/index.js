const express = require('express');

const app = express();
const dotenv = require('dotenv');
const indexRouter = require('./api/v1/routes/index.route');

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use('/api/v1/', indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
