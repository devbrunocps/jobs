import express from 'express';
import db from '../db/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { configDotenv } from 'dotenv';

configDotenv();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// LOGIN USUÁRIO
router.post('/user/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const query = 'SELECT * FROM users WHERE email = ?';
        const [result] = await db.promise().query(query, [email]);

        if (result.length === 0) {
            return res.status(401).json({ message: 'USUÁRIO NÃO ENCONTRADO' });
        }

        const user = result[0];

        // Verifica a senha
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'SENHA INCORRETA' });
        }

        // Gera um token JWT
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'ERRO NO SERVIDOR' });
    }
});

// CADASTRO USUÁRIO
router.post('/user/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verifica se já existe um usuário com esse email
        const query = 'SELECT * FROM users WHERE email = ?';
        const [result] = await db.promise().query(query, [email]);

        if (result.length > 0) {
            return res.status(400).json({ message: 'EMAIL JÁ EM USO!' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insere o usuário no banco de dados
        const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?,?,?)';
        await db.promise().query(insertQuery, [name, email, hashedPassword]);

        res.status(201).json({ message: 'USUÁRIO CADASTRADO COM SUCESSO' });
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'ERRO NO SERVIDOR' });
    }
});

// LOGIN EMPRESA
router.post('/company/login', async (req, res) => {
    try {
        const { cnpj, password } = req.body;

        const query = 'SELECT * FROM companies WHERE cnpj = ?';
        const [result] = await db.promise().query(query, [cnpj]);

        if (result.length === 0) {
            return res.status(401).json({ message: 'CNPJ NÃO ENCONTRADA' });
        }

        const company = result[0];

        // Verifica a senha
        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'SENHA INCORRETA' });
        }

        // Gera um token JWT
        const token = jwt.sign({ id: company.id }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'ERRO NO SERVIDOR' });
    }
});

// CADASTRO EMPRESA
router.post('/company/register', async (req, res) => {
    try {
        const { name, cnpj, password } = req.body;

        // Verifica se já existe uma empresa com esse CNPJ
        const query = 'SELECT * FROM companies WHERE cnpj = ?';
        const [result] = await db.promise().query(query, [cnpj]);

        if (result.length > 0) {
            return res.status(400).json({ message: 'CNPJ JÁ EM USO' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insere a empresa no banco de dados
        const insertQuery = 'INSERT INTO companies (name, cnpj, password) VALUES (?,?,?)';
        await db.promise().query(insertQuery, [name, cnpj, hashedPassword]);

        res.status(201).json({ message: 'EMPRESA CADASTRADA COM SUCESSO' });
    } catch (err) {
        console.error('Erro no servidor:', err);
        res.status(500).json({ message: 'ERRO NO SERVIDOR' });
    }
});

// Validação do token
router.post('/validate-token', (req, res) => {
    const { token } = req.body;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return res.status(200).json({ valid: true });
    } catch (err) {
        return res.status(401).json({ valid: false, message: 'Token inválido' });
    }
});


export default router;
