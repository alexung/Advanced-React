// this is for Yoga GraphQL

const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: check if they are logged in
    // ctx.db accesses db
    // createItem is a promise
    const item = await ctx.db.mutation.createItem({
      data: {
        ...args
        // we can spread like above, or manually do it below.
        // title: args.title,
        // description: args.desc
      },
      info
    }); // pass in info here so that actual item is returned to us from db after we've created it
    return item;
  }
};

module.exports = Mutations;
