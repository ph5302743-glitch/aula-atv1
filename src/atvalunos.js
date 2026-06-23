import express from "express"
import dotenv from "dotenv"

dotenv.config();
const app = express()

// IMPORTANTE: sem isso, req.body sempre vem undefined no POST
app.use(express.json())

const porta = process.env.PORTA || 3000

const alunos = []

app.get("/listar", (req, res) => {
    try {
        if (alunos.length === 0) {
            return res.status(200).json({ mensagem: "nenhum aluno a bordo" })
        }
        res.status(200).json(alunos);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao listar os alunos", msgerro: error.message })
    }
});

// endpoint para listar aluno pela matricula
// http://localhost:3000/listar/a92222

app.get("/listar/:matricula", (req, res) => {
    try {
        const matricula = req.params.matricula
        const aluno = alunos.find(aluno => aluno.matricula === matricula);

        if (!aluno) {
            return res.status(404).json({ mensagem: "aluno não encontrado" })
        }
        res.status(200).json(aluno)
    } catch (error) {
        res.status(500).json({ mensagem: "erro ao listar", msgerro: error.message })
    }
})

app.post("/cadastrar", (req, res) => {
    try {
        // corpo da requisição: essas infos são enviadas para o servidor
        const { matricula, nome, email } = req.body

        if (!matricula || !nome || !email) {
            return res.status(400).json({ mensagem: "todos os campos são obrigatórios!" })
        }

        const matriculaExiste = alunos.some(aluno => aluno.matricula === matricula)
        if (matriculaExiste) {
            return res.status(409).json({ mensagem: "matrícula já cadastrada!" })
        }

        const dados = { matricula, nome, email }
        alunos.push(dados)

        res.status(201).json({ mensagem: "cadastro realizado com sucesso!", aluno: dados })
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao cadastrar usuario!", msgerro: error.message })
    }
})

app.listen(porta, () => {
    console.log(`servidor em execução: http://localhost:${porta}`)
})