//src/app.js
import express from "express";
import prisma from "./database.js";

const app = express();

app.use(express.json());

app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: "OK",
      message: "API do Gerador de Provas",
      timestamp: new Date().toISOString(),
      services: {
        api: "OK",
        database: { status: "OK" },
      },
    });
  } catch (error) {
    console.error("Erro na verificação do banco:", error);

    res.status(503).json({
      status: "DEGRADED",
      message: "API do Gerador de Provas",
      services: {
        api: "OK",
        database: { status: "ERROR" },
      },
    });
  }
});

app.get("/users", async (req, res) => {
  try {
    const usuarios = await prisma.user.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        papel: true,
        foto: true,
        createdAt: true,
      },
      orderBy: { id: "asc" },
    });

    res.status(200).json({
      success: true,
      data: usuarios,
      total: usuarios.length,
    });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);

    res.status(500).json({
      success: false,
      message: "Erro ao buscar usuários",
    });
  }
});


app.get("/subjects", async (req, res) => {
  try {
    const materias = await prisma.subject.findMany({
      include: {
        professor: {
          select: { id: true, nome: true, email: true, foto: true }
        }
      },
      orderBy: { id: "asc" }
    });

    res.status(200).json({ success: true, data: materias, total: materias.length });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erro ao buscar matérias" });
  }
});

app.post("/subjects", async (req, res) => {
  try {
    const { nome, professorId } = req.body;

    if (!nome || !professorId) {
      return res.status(400).json({
        success: false,
        message: "Nome e professorId são obrigatórios"
      });
    }

    const professor = await prisma.user.findUnique({
      where: {
        id: Number(professorId)
      }
    });

    if (!professor) {
      return res.status(404).json({
        success: false,
        message: "Professor não encontrado"
      });
    }

    const subject = await prisma.subject.create({
      data: {
        nome,
        professorId: Number(professorId)
      }
    });

    res.status(201).json({
      success: true,
      data: subject
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Erro ao criar matéria"
    });
  }
});

app.post("/questions", async (req, res) => {
  try {
    const {
      enunciado,
      dificuldade,
      respostaCorreta,
      disciplinaId,
      autorId
    } = req.body;

    if (!enunciado || !dificuldade || !disciplinaId || !autorId) {
      return res.status(400).json({
        success: false,
        message: "Campos obrigatórios ausentes"
      });
    }

    if (![1, 2, 3].includes(Number(dificuldade))) {
      return res.status(400).json({
        success: false,
        message: "Dificuldade deve ser 1, 2 ou 3"
      });
    }

    const disciplina = await prisma.subject.findUnique({
      where: {
        id: Number(disciplinaId)
      }
    });

    if (!disciplina) {
      return res.status(404).json({
        success: false,
        message: "Matéria não encontrada"
      });
    }

    const autor = await prisma.user.findUnique({
      where: {
        id: Number(autorId)
      }
    });

    if (!autor) {
      return res.status(404).json({
        success: false,
        message: "Autor não encontrado"
      });
    }

    const question = await prisma.question.create({
      data: {
        enunciado,
        dificuldade: Number(dificuldade),
        respostaCorreta,
        disciplinaId: Number(disciplinaId),
        autorId: Number(autorId)
      }
    });

    res.status(201).json({
      success: true,
      data: question
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Erro ao criar questão"
    });
  }
});
app.get("/questions", async (req, res) => {
  try {
    const questoes = await prisma.question.findMany({
      include: {
        disciplina: {
          select: {
            id: true,
            nome: true
          }
        },
        autor: {
          select: {
            id: true,
            nome: true,
            email: true,
            foto: true
          }
        }
      },
      orderBy: {
        id: "asc"
      }
    });

    const data = questoes.map((q) => ({
      id: q.id,
      enunciado: q.enunciado,
      dificuldade: q.dificuldade,
      respostaCorreta: q.respostaCorreta,
      ativa: q.ativa,
      subject: q.disciplina,
      author: q.autor,
      createdAt: q.createdAt,
      updatedAt: q.updatedAt
    }));

    res.status(200).json({
      success: true,
      data,
      total: data.length
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Erro ao buscar questões"
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Rota " + req.method + " " + req.originalUrl + " não encontrada",
  });
});

export default app;