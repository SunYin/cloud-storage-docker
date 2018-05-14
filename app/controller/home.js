'use strict';

const path = require('path');
const sendToWormhole = require('stream-wormhole');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }

  async create() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const date = new Date();
    const eTagName = await ctx.Etag(Object.assign({}, stream));
    const name = date.toLocaleDateString().replace(/\//, '-') + '/' + path.basename(eTagName) + path.extname(stream.filename);

    // 文件处理，上传到云存储等等
    let result;
    try {
      result = await ctx.oss.put(name, stream);
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
    }

    ctx.body = {
      url: result.url,
      // 所有表单字段都能通过 `stream.fields` 获取到
      fields: stream.fields,
    };
  }
}

module.exports = HomeController;
