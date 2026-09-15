import prisma from "../config/database.js";


export async function listarUsuarios(){

    return await prisma.user.findMany({
        orderBy:{
            id:"asc"
        }
    });

}


export async function buscarUsuarioPorId(id){

    return await prisma.user.findUnique({
        where:{
            id
        }
    });

}


export async function criarUsuario(data){

    const usuarioExistente = await prisma.user.findUnique({
        where:{
            email:data.email
        }
    });


    if(usuarioExistente){

        return {
            ok:false,
            reason:"EMAIL_CONFLICT"
        };

    }


    const usuario = await prisma.user.create({
        data
    });


    return {
        ok:true,
        data:usuario
    };

}



export async function atualizarUsuario(id,data){


    const usuario = await prisma.user.findUnique({
        where:{
            id
        }
    });


    if(!usuario){

        return {
            ok:false,
            reason:"NOT_FOUND"
        };

    }


    const atualizado = await prisma.user.update({

        where:{
            id
        },

        data

    });


    return {
        ok:true,
        data:atualizado
    };


}




export async function removerUsuario(id){


    const usuario = await prisma.user.findUnique({

        where:{
            id
        }

    });


    if(!usuario){

        return {
            ok:false,
            reason:"NOT_FOUND"
        };

    }



    const removido = await prisma.user.delete({

        where:{
            id
        }

    });



    return {
        ok:true,
        data:removido
    };


}