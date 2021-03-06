'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class Pagination {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle (ctx, next) {
    
console.log(ctx)
    if(ctx.request.method() === 'GET') {
      const page = ctx.request.input('page') ? parseInt(ctx.request.input('page')) : 1;
      const limit = ctx.request.input('limit') ? parseInt(ctx.request.input('limit')) : 10;

      const arry = ctx.request.input('arry') ?ctx.request.input('arry') : undefined;


      ctx.pagination = {
        page, 
        limit,
        arry
      }

      const perpage = parseInt(ctx.request.input('perpage'));

      if (perpage){
        ctx.pagination.limit = perpage;
      }
    }

    await next()
  }
}

module.exports = Pagination
