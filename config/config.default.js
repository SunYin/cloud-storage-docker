'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1525932647707_8356';

  // add your config here
  config.middleware = [];

  config.oss = {
    client: {
      accessKeyId: 'LTAILZ4NAAuRRRT8',
      accessKeySecret: 'xiB2flis6dyke7T4PiNaB53mzJDEHO',
      bucket: 'test-sunyin-oss',
      endpoint: 'oss-cn-shanghai.aliyuncs.com',
      timeout: '60s',
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ 'http://localhost:1234' ],
  };

  config.bodyParser = {
    enable: true,
    jsonLimit: '1mb',
    formLimit: '1mb',
  };

  return config;
};
