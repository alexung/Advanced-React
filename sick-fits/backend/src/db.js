// This file connects to the remote Prisma DB and gives us the ability to query it with JS
// node.js does NOT yet support import { Prisma } from 'prisma-binding'
const { Prisma } = require("prisma-binding");

const db = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  // debug allows us to console.log all queries in server logs
  debug: true
});

module.exports = db;
