import {
    listarMaterias,
    buscarMateriaPorId,
    criarMateria,
    atualizarMateria,
    removerMateria
} from "../services/subject.service.js";



// LISTAR MATÉRIAS
export async function getSubjects(req, res){

    try{

        const materias = await listarMaterias();


        return res.status(200).json({
            success:true,
            data:materias,
            total:materias.length
        });


    }catch(error){

        return res.status(500).json({
            success:false,
            message:"Erro interno"
        });

    }

}





// BUSCAR POR ID
export async function getSubjectById(req,res){

    try{

        const id = Number(req.params.id);



        if(!id){

            return res.status(400).json({
                success:false,
                message:"ID inválido"
            });

        }



        const materia = await buscarMateriaPorId(id);



        if(!materia){

            return res.status(404).json({
                success:false,
                message:"Matéria não encontrada"
            });

        }



        return res.status(200).json({

            success:true,
            data:materia

        });



    }catch(error){

        return res.status(500).json({
            success:false,
            message:"Erro interno"
        });

    }

}







// CRIAR MATÉRIA
export async function postSubject(req,res){

    try{

        const resultado = await criarMateria(req.body);



        if(!resultado.ok){


            if(resultado.reason === "NAME_CONFLICT"){

                return res.status(409).json({

                    success:false,
                    message:"Matéria já cadastrada"

                });

            }

        }



        return res.status(201).json({

            success:true,
            data:resultado.data

        });



    }catch(error){

        return res.status(500).json({

            success:false,
            message:"Erro interno"

        });

    }

}








// ATUALIZAR MATÉRIA
export async function patchSubject(req,res){

    try{


        const id = Number(req.params.id);



        if(!id){

            return res.status(400).json({

                success:false,
                message:"ID inválido"

            });

        }



        const resultado = await atualizarMateria(

            id,

            req.body

        );




        if(!resultado.ok){


            return res.status(404).json({

                success:false,
                message:"Matéria não encontrada"

            });


        }




        return res.status(200).json({

            success:true,
            data:resultado.data

        });



    }catch(error){

        return res.status(500).json({

            success:false,
            message:"Erro interno"

        });

    }

}








// EXCLUIR MATÉRIA
export async function deleteSubject(req,res){

    try{


        const id = Number(req.params.id);



        if(!id){

            return res.status(400).json({

                success:false,
                message:"ID inválido"

            });

        }



        const resultado = await removerMateria(id);




        if(!resultado.ok){

            return res.status(404).json({

                success:false,
                message:"Matéria não encontrada"

            });

        }




        return res.status(200).json({

            success:true,
            data:resultado.data

        });



    }catch(error){

        return res.status(500).json({

            success:false,
            message:"Erro interno"

        });

    }

}