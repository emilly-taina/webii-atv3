import {
    listarUsuarios,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    removerUsuario
} from "../services/user.service.js";



// GET /users
export async function getUsers(req, res) {

    try {

        const usuarios = await listarUsuarios();

        return res.status(200).json({
            success: true,
            data: usuarios,
            total: usuarios.length
        });


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Erro interno"
        });

    }

}



// GET /users/:id
export async function getUserById(req, res) {

    try {

        const id = Number(req.params.id);


        if (!id) {

            return res.status(400).json({
                success: false,
                message: "ID inválido"
            });

        }


        const usuario = await buscarUsuarioPorId(id);



        if (!usuario) {

            return res.status(404).json({
                success: false,
                message: "Usuário não encontrado"
            });

        }



        return res.status(200).json({
            success: true,
            data: usuario
        });



    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Erro interno"
        });

    }

}



// POST /users
export async function postUser(req, res) {

    try {

        const resultado = await criarUsuario(req.body);



        if (!resultado.ok) {


            if (resultado.reason === "EMAIL_CONFLICT") {

                return res.status(409).json({
                    success: false,
                    message: "Email já cadastrado"
                });

            }

        }



        return res.status(201).json({
            success: true,
            data: resultado.data
        });



    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Erro interno"
        });

    }

}



// PATCH /users/:id
export async function patchUser(req, res) {

    try {

        const id = Number(req.params.id);



        if (!id) {

            return res.status(400).json({
                success: false,
                message: "ID inválido"
            });

        }



        const resultado = await atualizarUsuario(
            id,
            req.body
        );



        if (!resultado.ok) {

            return res.status(404).json({
                success: false,
                message: "Usuário não encontrado"
            });

        }



        return res.status(200).json({
            success: true,
            data: resultado.data
        });



    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Erro interno"
        });

    }

}



// DELETE /users/:id
export async function deleteUser(req, res) {

    try {

        const id = Number(req.params.id);



        if (!id) {

            return res.status(400).json({
                success: false,
                message: "ID inválido"
            });

        }



        const resultado = await removerUsuario(id);



        if (!resultado.ok) {

            return res.status(404).json({
                success: false,
                message: "Usuário não encontrado"
            });

        }



        return res.status(200).json({
            success: true,
            data: resultado.data
        });



    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Erro interno"
        });

    }

}