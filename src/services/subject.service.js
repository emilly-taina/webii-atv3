import prisma from "../config/database.js";


// LISTAR MATÉRIAS
export async function listarMaterias(){

    return await prisma.subject.findMany({

        include:{
            professor:true
        }

    });

}



// BUSCAR MATÉRIA POR ID
export async function buscarMateriaPorId(id){

    return await prisma.subject.findUnique({

        where:{
            id
        },

        include:{
            professor:true
        }

    });

}



// CRIAR MATÉRIA
export async function criarMateria(data){

    const existe = await prisma.subject.findFirst({

        where:{
            nome:data.nome
        }

    });


    if(existe){

        return {
            ok:false,
            reason:"NAME_CONFLICT"
        };

    }



    const materia = await prisma.subject.create({

        data:{
            nome:data.nome,
            professorId:data.professorId
        },

        include:{
            professor:true
        }

    });



    return {

        ok:true,
        data:materia

    };

}




// ATUALIZAR MATÉRIA
export async function atualizarMateria(id,data){


    const subject = await prisma.subject.findUnique({

        where:{
            id
        }

    });



    if(!subject){

        return {
            ok:false
        };

    }



    const atualizado = await prisma.subject.update({

        where:{
            id
        },


        data:{


            nome:data.nome,

            professorId:data.professorId

        },


        include:{
            professor:true
        }


    });



    return {

        ok:true,
        data:atualizado

    };


}





// EXCLUIR MATÉRIA
export async function removerMateria(id){


    const subject = await prisma.subject.findUnique({

        where:{
            id
        }

    });



    if(!subject){

        return {

            ok:false

        };

    }



    // remove questões vinculadas primeiro
    await prisma.question.deleteMany({

        where:{

            disciplinaId:id

        }

    });




    // remove a matéria
    const deleted = await prisma.subject.delete({

        where:{

            id

        },

        include:{

            professor:true

        }

    });




    return {

        ok:true,

        data:deleted

    };


}