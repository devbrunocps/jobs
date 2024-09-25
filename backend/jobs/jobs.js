import express from "express"
import db from "../db/db.js"

const router = express.Router()

//PUXAR TODAS AS VAGAS DO BANCO DE DADOS
router.get("/", (req, res) => {
    const q = 'SELECT * FROM jobs'
    db.query(q, (err, result) => {
        if (err) return res.json(err)
        res.json(result)
    })
})

// API ANUNCIAR UMA VAGA

router.post("/", (req, res) => {
    const { title, longDesc, lowDesc, company_id, salary, location, jobType, workModel, benefits, company } = req.body;

    const salaryString = `R$${salary}`
    const ids_candidates = '[]'
    const benefitsString = JSON.stringify(benefits)


    const formatDateYMDUsingSplit = (date) => {
        const isoString = date.toISOString();
        const [ano, mes, dia] = isoString.split('T')[0].split('-');
        return `${ano}/${mes}/${dia}`;
    };

    const novaData = new Date();
    const dataFormatada = formatDateYMDUsingSplit(novaData);

    const q = 'INSERT INTO jobs (title, longDesc, lowDesc, company_id, salary, location, jobType, workModel, benefits, ids_candidates, createdAt, number_candidates, company) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';

    db.query(q, [title, longDesc, lowDesc, company_id, salaryString, location, jobType, workModel, benefitsString, ids_candidates, dataFormatada, 0, company], (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json(result);
    });
});


// API PARA SE CANDIDATAR A UMA VAGA
router.post("/apply", (req, res) => {
    const { jobId, email } = req.body

    //RECUPERA O VLAOR ATUAL DE IDS_CANDIDATES
    const q1 = 'SELECT ids_candidates FROM jobs WHERE jobs_id =?';
    db.query(q1, [jobId], (err, result) => {
        if (err) return res.json(err);

        console.log(result)

        let idsCandidates = result[0].ids_candidates.length > 0 ? result[0].ids_candidates : [];
        // idsCandidates.push(email);
        if (!idsCandidates.includes(email)) {
            idsCandidates.push(email)
        } else {
            return res.json({ duplicate: true });
        }

        const q = 'UPDATE jobs SET ids_candidates = ?, number_candidates = ? WHERE jobs_id = ?';
        db.query(q, [JSON.stringify(idsCandidates), idsCandidates.length, jobId], (err, result) => {
            if (err) return res.json(err);
            res.json(result);
        })
    })
})

// API PARA PUXAR TODAS AS VAGAS DE UMA EMPRESA PELO COMPANY ID

router.get("/company/:companyId", (req, res) => {
    const { companyId } = req.params
    const q = 'SELECT * FROM jobs WHERE company_id =?'
    db.query(q, [companyId], (err, result) => {
        if (err) return res.json(err)
        res.json(result)
    })
})

//DELETAR JOB

router.delete("/:jobId", (req, res) => {
    const { jobId } = req.params
    const q = 'DELETE FROM jobs WHERE jobs_id =?'
    db.query(q, [jobId], (err, result) => {
        if (err) return res.json(err)
        res.json(result)
    })
})

export default router