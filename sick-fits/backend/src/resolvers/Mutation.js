const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// this is for Yoga GraphQL
// mutation functions below MUST match up with Mutations in schema.graphql
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
  },
  async signup(parent, args, ctx, info) {
    // lowercase all emails for consistency
    args.email = args.email.toLowerCase();
    // hash their password.  The integer as second arg to bcrypt.hash() is the salt length...
    // ... allows for uniqueness! 10 hash is different from 15 hash.
    const password = await bcrypt.hash(args.password, 10);
    // second arg to createUser (or any mutation) is what we want the server to return to us
    args.user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          // everyone that signs up will be a USER
          permissions: { set: ["USER"] }
        }
      },
      info
    );
    // create the JWT token for them
    // we need to pass our .env's APP_SECRET here so it can sign it with something specific to our app
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // We set the jwt as a cookie on the response, so everytime signed in user clicks another page, that token comes along for the ride
    // setting a 'token' cookie
    ctx.response.cookie("token", token, {
      // to make sure that only http can access it, so malicious js cannot access this cookie
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    // Return the user to the browser
    return user;
  }
};

module.exports = Mutations;
