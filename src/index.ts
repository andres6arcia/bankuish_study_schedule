import Server from "./Server/server"

class App {
    public server: Server
    constructor() {
        this.server = new Server()
    }
}
const app = new App()