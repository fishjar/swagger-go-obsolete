const NODE_ENV = process.env.NODE_ENV || 'development';
const USERNAME = process.env.USERNAME || 'admin';
const PASSWORD = process.env.PASSWORD || '123456';
const JWT_SECRET = process.env.JWT_SECRET || '654321';

export {
  NODE_ENV,
  USERNAME,
  PASSWORD,
  JWT_SECRET,
};
