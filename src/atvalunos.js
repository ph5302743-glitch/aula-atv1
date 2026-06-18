import express from "express"
import dotenv from "dotenv"

dotenv.config();
const app = express()

const porta = process.env.PORTA

const alunos =[
    {
        matricula: "a92222",
        nome: "thiago",
        email: "gordogames@gmail.com"

    },
    {
        matricula: "a95966",
        nome: "de oliveira",
        email: "oliveira@gmail.com"

    },
    {
        matricula: "a95977",
        nome: "megamind",
        email: "mega@gmail.com"

    }

]

app.get("/listar", (req, res) => {
    try {
        if (alunos.length === 0) {
            return res.status(200).json({ mensagem: "nemhum aluno a bordo"})
        }
        res.status(200).json(alunos);
    }  catch (error) {
        res.status(500).json({ mensagem: "Erro ao listar os alunos", msgerro:error})
    }
});
// end point para listar aluno pela matricula
//http://localhost:3000?listar?a92222

app.get("/listar/:matricula", (req, res) => {
    try {
        const matricula = req.params.matricula
                            //ordem            //parametro
        const aluno = alunos.find(aluno => aluno.matricula === matricula);

        if(!aluno){
            return res.status(200).json({mensagem: "aluno não encontrado"})
        }
        res.status(200).json(aluno)
    } catch (error) {
        res.status(500).json({mensagem: "erro ao listar", msgerro: error})
    }
})

app.listen(porta, () => {
    console.log(`servidor em execução: localhost:${3000}`)
})