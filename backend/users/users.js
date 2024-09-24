import express from "express"
import db from "../db/db.js";

const router = express.Router();

router.put('/:email', (req, res) => {
    const { email, name, about } = req.body;

    const q = "UPDATE users SET name = ?, about = ? WHERE email = ?"

    db.query(q, [name, about, email], (err, result) => {
        if (err) return res.json({ message: err })
        return res.status(200).json(result)
    })
})


router.get('/jobs/my/:email', (req, res) => {
    const { email } = req.params;

    const q = `SELECT * FROM jobs WHERE JSON_CONTAINS(ids_candidates, JSON_QUOTE(?), '$')`;

    db.query(q, [email], (err, result) => {
        if (err) return res.json(err)
        return res.status(200).json(result)
    })
})

export default router