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

export default router