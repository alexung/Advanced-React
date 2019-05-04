const Query = {
  // shorthand for function dogs().
  // ctx gives us access to headers
  dogs(parent, args, ctx, info) {
    global.dogs = global.dogs || [];
    return global.dogs;
  }
};

module.exports = Query;
