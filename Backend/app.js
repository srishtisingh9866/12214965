
import express from 'express';
import url from './routes/urlRoute.js';
const app = express();
 
app.use(express.json())

app.use(`/shorturls, ${shortcode}`);

app.use(errorHandleMiddleware)
export default app;