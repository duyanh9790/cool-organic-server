const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

const app = express();
const dotenv = require('dotenv');
const indexRouter = require('./api/v1/routes/index.route');

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoUri = process.env.MONGODB_URL;
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to MongoDB at ${process.env.MONGODB_URL}`);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const db = mongoose.connection;

app.use('/api/v1/', indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
