import dotenv from "dotenv";
import { app } from "./express";

dotenv.config();
const port: number = Number(process.env.PORT) || 80;

app.listen(port, () => {
    console.log(`Server está rodando na porta ${port}`);
})