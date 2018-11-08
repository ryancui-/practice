const env = process.env.NODE_ENV;

module.exports = {
  prod: env === 'production',
  node_env: env
};
