import express from 'express';
import authRoutes from './routes/auth.routes';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config/config';
import http from 'http';

const app = express();

/** Parse the body of the request */
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** Routes go here */
app.use('/auth', authRoutes);

// app.listen(3000);
const PORT = config.server.port_auth;

mongoose
  .connect(config.mongo.url)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(
        `Server is running on http://localhost:${config.server.port_auth}`
      );
    });
  })
  .catch((error) => console.error('MongoDB connection error:', error));

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

/** Error handling */
app.use((req, res, next) => {
  const error = new Error('Not found');

  res.status(404).json({
    message: error.message,
  });
});

// const httpServer = http.createServer(app);
// httpServer.listen(config.server.port);

// app.use((req, res, next) => {
//   console.log('Inside middleware');
//   console.log('test');
//   next(); // Allows the request to continue to the next middleware in the line
// });

// app.use((req, res, next) => {
//   console.log('Inside middleware');
//   console.log('test');
//   res.send('<h1>Hello from ExpressJs</h1>'); // Allows the request to continue to the next middleware in the line
// });
