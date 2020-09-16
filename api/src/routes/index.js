const { Router } = require("express");
// import all routers;
const shopifyRouter = require("./shopify.js");
const product = require("./product");

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
router.use("/api/product", product);
router.use("/shopify", shopifyRouter);

module.exports = router;
