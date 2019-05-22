// this is for Yoga GraphQL

const { forwardTo } = require('prisma-binding');
// forward to basically copies the prisma query settings to Yoga GraphQL

// this is a resolver below!
const Query = {
	items: forwardTo('db'),
	item: forwardTo('db'),
	itemsConnection: forwardTo('db')
	// async items(parent, args, ctx, info) {
	//   const items = await ctx.db.query.items();
	//   return items;
	// }
};

module.exports = Query;
