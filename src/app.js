import express from "express";
import prisma from "./config/database.js";

import userRoutes from "./routes/user.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import questionRoutes from "./routes/question.routes.js";


const app = express();

app.use(express.json());


app.get("/health", async (req,res)=>{

    try{

        await prisma.$queryRaw`SELECT 1`;

        res.status(200).json({
            status:"OK",
            message:"API do Gerador de Provas"
        });

    }catch(error){

        res.status(500).json({
            status:"ERROR"
        });

    }

});


app.use("/users", userRoutes);

app.use("/subjects", subjectRoutes);

app.use("/questions", questionRoutes);



app.use((req,res)=>{

    res.status(404).json({
        success:false,
        message:`Rota ${req.method} ${req.originalUrl} não encontrada`
    });

});


export default app;