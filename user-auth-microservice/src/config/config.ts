import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'user';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'userpassword@1';

const MONGO = {
  password: MONGO_PASSWORD,
  username: MONGO_USERNAME,
  url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.euqcq3d.mongodb.net/?retryWrites=true&w=majority`,
};

const SERVER_PORT_AUTH = process.env.SERVER_PORT_AUTH || 1337;
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 60;
const SERVER_TOKEN_SECRET =
  process.env.SERVER_TOKEN_SECRET || 'encryptedsecret';

const SERVER = {
  port_auth: SERVER_PORT_AUTH,
  token: {
    expireTime: SERVER_TOKEN_EXPIRETIME,
    secret: SERVER_TOKEN_SECRET,
  },
};

const config = {
  mongo: MONGO,
  server: SERVER,
};

export default config;
