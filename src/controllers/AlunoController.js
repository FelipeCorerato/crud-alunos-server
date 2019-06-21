const Aluno = require('../models/Aluno');

module.exports = {
    async list(req, res) {
        try {
            const alunos = await Aluno.find().sort('ra');

            return res.json(alunos);
        } catch (err) {
            return res.send(err);
        }
    },
    
    async getOne(req, res) {
        try {
            const aluno = await Aluno.find({ ra: req.params.ra });

            return res.json(aluno);
        } catch (err) {
            return res.send(err);
        }        
    },

    async store(req, res) {
        try {
            const { ra, nome, email } = req.body;

            const busca = await Aluno.find({ ra: req.body.ra });
            if (busca.length != 0)
                return res.send('RA já cadastrado!');

            const aluno = await Aluno.create({
                ra, 
                nome,
                email
            });

            req.io.emit('incluir-aluno', aluno);

            return res.json(aluno);
        } catch (err) { 
            return res.send(err);
        }
    },

    async updateByRa(req, res) {
        try {
            const busca = await Aluno.find({ ra: req.params.ra });
            if (busca.length == 0)
                return res.send('Aluno não cadastrado!');

            const aluno = busca[0];            
            const updatedAluno = await Aluno.findByIdAndUpdate(aluno._id, req.body, {new: true});

            req.io.emit('alterar-aluno', aluno);
    
            return res.json(updatedAluno);
        } catch(err) {
            return res.send(err)
        }        
    },

    async updateById(req, res) {
        try {
            const updatedAluno = await Aluno.updateOne(
                { _id: req.params.id },
                {$set: {
                    ra: req.body.ra,
                    nome: req.body.nome,
                    email: req.body.email
                }}
            );
    
            return res.json(updatedAluno);
        } catch(err) {
            return res.send(err)
        }        
    },

    async removeByRa(req, res) {
        try {
            const removedAluno = await Aluno.deleteOne({ ra: req.params.ra });

            req.io.emit('remover-aluno', removedAluno);

            return res.json(removedAluno);   
        } catch (err) {
            return res.send(err);
        }
    },

    async removeById(req, res) {
        const removedAluno = await Aluno.deleteOne({ _id: req.params.id });

        return res.json(removedAluno);
    } 
};
