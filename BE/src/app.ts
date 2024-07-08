import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routes";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import cookieParser from "cookie-parser";
import deserializeUser from "./middleware/deSerializeUser";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

// Create Express server new Express Instance
const app = express();

// Port to listen to
const port = process.env.PORT || 5000;
const uri = process.env.DB_URL || "";

// Express configuration
app.use(helmet()); // Enable Helmet
app.use(morgan("dev")); // Enable Morgan
app.use(express.json()); // <=== Enable JSON body parser
app.use(cookieParser());
app.use(cors()); // Enable CORS

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

(async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
})();
app.use(deserializeUser);

// Use routes
app.use("/api", router);

// Start Express server
const server = app.listen(port, () => {
  // Callback function when server is successfully started
  console.log(`🚀 ~ Server started at http://localhost:${port}`);
});

server.on("error", (err) => console.log(err.message));

app.use(errorHandler);
export default app;
