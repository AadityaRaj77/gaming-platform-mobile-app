import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.routes.js";
import {createServer} from 'http'
import {initSocket} from './socket.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//routes
app.use("/auth", authRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

/*const httpServer = createServer(app);
initSocket(httpServer);
*/
const port = 4000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

