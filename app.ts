import { Server } from "./models/severs";
import dotenv from "dotenv"

dotenv.config()

const server = new Server()

server.listen()