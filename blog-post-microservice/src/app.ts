import express from 'express';
import postsRoutes from './routes/posts.routes';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config/config';
import cors from 'cors';

const app = express();

/** Parse the body of the request */
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

/** Routes go here */
app.use('/blog', postsRoutes);

// app.listen(3000);
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

// const httpServer = http.createServer(app);
// httpServer.listen(config.server.port);

/** Rules of our API */
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );

//   if (req.method == 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//     return res.status(200).json({});
//   }

//   next();
// });
