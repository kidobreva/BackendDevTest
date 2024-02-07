import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'user';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'userpassword@1';

const MONGO = {
  password: MONGO_PASSWORD,
  username: MONGO_USERNAME,
  url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.euqcq3d.mongodb.net/?retryWrites=true&w=majority`,
};

const SERVER_PORT_BLOG = process.env.SERVER_PORT_BLOG || 1330;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 60;
const SERVER_TOKEN_SECRET =
  process.env.SERVER_TOKEN_SECRET || 'encryptedsecret';

const SERVER = {
  port_blog: SERVER_PORT_BLOG,
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    secret: SERVER_TOKEN_SECRET,
  },
};

const AUTH_SERVICE_PATH =
  process.env.AUTH_SERVICE_PATH || 'http://localhost:3000/auth/validate';

const config = {
  mongo: MONGO,
  server: SERVER,
  authServicePath: AUTH_SERVICE_PATH,
};

export default config;
