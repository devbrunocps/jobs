import express from 'express';
import db from '../db/db.js';

const router = express.Router();

router.get('/', (req, res) => {
    const q = 'SELECT * FROM companies'
    db.query(q, (err, result) => {
        if (err) res.json(err)
        res.status(200).json(result)
    })
})

router.get('/:cnpj', (req, res) => {
    const q = 'SELECT * FROM companies WHERE cnpj = ? '
    db.query(q, [req.params.cnpj], (err, result) => {

        if (err) res.json(err)
        res.status(200).json(result)
    })
})

router.post('/complete-register', (req, res) => {
    const { about, collaborators, foundation, local, phone, cnpj, firstAccess } = req.body;

    const q = 'UPDATE companies SET about =?, collaborators =?, foundation =?, location =?, phone =?, first_access =? WHERE cnpj =?'
    db.query(q, [about, collaborators, foundation, local, phone, firstAccess, cnpj], (err, result) => {
        if (err) res.json(err)
        res.status(200).json({ message: 'Registro completo com sucesso!' })
    })
})

//EDITAR EMPRESA

router.put('/:cnpj', (req, res) => {
    const { name, about, collaborators, foundation, location, phone } = req.body;
    const { cnpj } = req.params;

    // VALIDAR SE NENHUM DADO É NULL OU UNDEFINED
    if (!name || !about || !collaborators || !foundation || !location || !phone) {
        return res.status(400).json({ message: 'Todos os dados são obrigatórios.' })
    }

    const q = 'UPDATE companies SET name =?, about =?, collaborators =?, foundation =?, location =?, phone =? WHERE cnpj =?'
    db.query(q, [name, about, collaborators, foundation, location, phone, cnpj], (err, result) => {
        if (err) return res.json({ message: err })
        return res.status(200).json(result)
    })
})

export default router