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
	},
	updateItem(parent, args, ctx, info) {
		// first take a copy of the updates
		const updates = { ...args };
		// remove the ID from the updates
		delete updates.id;
		// run the update method
		return ctx.db.mutation.updateItem(
			{
				data: updates,
				where: {
					id: args.id
				}
			},
			info
		);
	},
	async deleteItem(parent, args, ctx, info) {
		const where = { id: args.id };
		// 1. find the item
		const item = await ctx.db.query.item({ where }, `{ id title}`);
		// 2. Check if they own that item, or have the permissions
		// TODO
		// 3. Delete it!
		return ctx.db.mutation.deleteItem({ where }, info);
	}
};

module.exports = Mutations;
