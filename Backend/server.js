import express from "express";
import urlRoutes from "./router/urlRoute.js";
import loggingMiddleware from "./middleware/loggingmiddleware.js";
import errorhandlermiddleware from "./middleware/errorhandlermiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


app.use(loggingMiddleware);

app.use("/shorturls", urlRoutes);

app.use(errorhandlermiddleware);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
