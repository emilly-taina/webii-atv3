import * as service from "../services/question.service.js";



// LISTAR

export async function list(req,res){

    try{

        const data = await service.listQuestions();

        return res.json({

            success:true,
            data,
            total:data.length

        });


    }catch(error){

        console.log(error);

        return res.status(500).json({

            success:false,
            message:"Erro ao buscar questões"

        });

    }

}



// BUSCAR POR ID

export async function get(req,res){

    try{

        const id = Number(req.params.id);


        const data = await service.getQuestionById(id);


        if(!data){

            return res.status(404).json({

                success:false,
                message:"Questão não encontrada"

            });

        }


        return res.json({

            success:true,
            data

        });


    }catch(error){

        console.log(error);

        return res.status(500).json({

            success:false,
            message:"Erro ao buscar questão"

        });

    }

}




// CRIAR

export async function create(req,res){

    try{


        const data = await service.createQuestion(req.body);


        return res.status(201).json({

            success:true,
            data

        });


    }catch(error){

        console.log(error);


        return res.status(500).json({

            success:false,
            message:"Erro ao criar questão"

        });

    }

}




// ATUALIZAR

export async function update(req,res){

    try{


        const id = Number(req.params.id);


        const data = await service.updateQuestion(
            id,
            req.body
        );


        if(!data){

            return res.status(404).json({

                success:false,
                message:"Questão não encontrada"

            });

        }


        return res.json({

            success:true,
            data

        });


    }catch(error){

        console.log(error);


        return res.status(500).json({

            success:false,
            message:"Erro ao atualizar questão"

        });

    }

}





// EXCLUIR

export async function remove(req,res){

    try{


        const id = Number(req.params.id);


        const data = await service.deleteQuestion(id);


        if(!data){

            return res.status(404).json({

                success:false,
                message:"Questão não encontrada"

            });

        }


        return res.json({

            success:true,
            data

        });



    }catch(error){

        console.log(error);


        return res.status(500).json({

            success:false,
            message:"Erro ao excluir questão"

        });

    }

}