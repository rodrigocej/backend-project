import express, {Express} from "express"
import authRoutes from "../routes/auth";
import orderRoutes from "../routes/orders"
import issueRoutes from "../routes/issues"
import { conectDB } from "../database/config"

export class Server {
    app: Express
    port: number | string | undefined
    authPath: string
    ordersPath: string
    issuesPath: string

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.authPath = "/auth";
        this.ordersPath = "/order"
        this.issuesPath = "/issue"

        this.dbConection();
        this.middlewares();
        this.routes()
    }

    async dbConection():Promise<void>{
        await conectDB()
    }

    middlewares(): void {
        this.app.use(express.json())
    }

    routes(): void {
        this.app.use(this.authPath, authRoutes)
        this.app.use(this.ordersPath, orderRoutes)
        this.app.use(this.issuesPath, issueRoutes)
    }

    listen(): void{
        this.app.listen(this.port, ()=>{
            console.log("App corriendo en puerto:", this.port)
        })
    }
}