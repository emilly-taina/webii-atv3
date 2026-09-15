import prisma from "../config/database.js";


// LISTAR QUESTÕES
export async function listQuestions(){

    const questions = await prisma.question.findMany({

        include:{
            disciplina:true,
            autor:true
        }

    });


    return questions.map((q)=>({

        ...q,

        subject:q.disciplina,

        author:q.autor,

    }));

}



// BUSCAR QUESTÃO POR ID
export async function getQuestionById(id){

    const q = await prisma.question.findUnique({

        where:{
            id
        },

        include:{
            disciplina:true,
            autor:true
        }

    });


    if(!q){
        return null;
    }


    return {

        ...q,

        subject:q.disciplina,

        author:q.autor

    };

}



// CRIAR QUESTÃO
export async function createQuestion(data){

    return await prisma.question.create({

        data,

        include:{
            disciplina:true,
            autor:true
        }

    });

}



// ATUALIZAR QUESTÃO
export async function updateQuestion(id,data){

    const question = await prisma.question.findUnique({

        where:{
            id
        }

    });


    if(!question){
        return null;
    }


    return await prisma.question.update({

        where:{
            id
        },

        data,

        include:{
            disciplina:true,
            autor:true
        }

    });

}



// EXCLUIR QUESTÃO
export async function deleteQuestion(id){

    const question = await prisma.question.findUnique({

        where:{
            id
        }

    });


    if(!question){
        return null;
    }


    return await prisma.question.delete({

        where:{
            id
        }

    });

}