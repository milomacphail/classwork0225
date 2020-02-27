const express = require('express');
const router = express.Router();
const Grad = require('../../models/Grad');

router.get('/test', (req, res) => {
    res.send({msg: "Works"});
})

router.get('/', async(req, res) =>{
    try {
        const grads = await Grad.find();
        res.json(grads);
        } catch(err) {
            res.status(500).json({msg: err.message});
        }
});

router.post('/', async(req, res) =>{
    console.log(req.body);
    const grad = new Grad({
        name: req.body.name,
        role: req.body.role,
        company: req.body.company,
        yearOfGraduation: req.body.yearOfGraduation
    });
    try {
        console.log(grad);
        const newGrad = await grad.save();
        res.status(201).json(newGrad);
    } catch (err) {
        res.status(400).json({message : err.message});
    }
});


router.put('/:id', async(req, res) =>{
    console.log(req.params.id);
    Grad.findByIdAndUpdate(req.params.id)
    .then(grad = {
        name: req.body.name,
        role: req.body.role,
        company: req.body.company,
        yearOfGraduation: req.body.yearOfGraduation
    })
    try {
        console.log(grad);
        res.status(201).json(grad);
    } catch (err) {
        res.status(400).json({message : err.message});
    }
})

router.delete('/:id', async(req, res) => {
    console.log(req.params.id);
    Grad.findById(req.params.id)
    .then(grad => grad.remove().then(res.json({ success: "true" })))
    .then(err => res.status(404).json("Not found."));
    console.log("deleted");
})

module.exports = router;