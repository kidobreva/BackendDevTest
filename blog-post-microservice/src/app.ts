import express from 'express';
import postsRoutes from './routes/posts.routes';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config/config';

const app = express();

/** Parse the body of the request */
app.use(bodyParser.json());

/** Routes go here */
app.use('/blog', postsRoutes);

const PORT = config.server.port_blog;

mongoose
  .connect(config.mongo.url)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(
        `Server is running on http://localhost:${config.server.port_blog}`
      );
    });
  })
  .catch((error) => console.error('MongoDB connection error:', error));

/** Error handling */
app.use((req, res, next) => {
  const error = new Error('Not found');

  res.status(404).json({
    message: error.message,
  });
});
