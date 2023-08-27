const express = require("express");
const Author = require("../models/Author");
const AuthorRouter = express.Router();

AuthorRouter.get("/", async (req, res)=>{
    let authors = await Author.find({})
    return res.status(200).send({
        success:true,
        authors
    });
});

AuthorRouter.post("/author", async (req, res)=>{
    try{
        const {name,lastname,age} = req.body
        if(!name || !lastname || !age){
            return res.status(400).send({
                success:false,
                message:"Complete todos los campos"
            });
        }

        let author = new Author({
            name,
            lastname,
            age
        });

        await author.save()
        return res.status(200).send({
            success:true,
            message:"Autor creado correctamente",
            author
        });

    }catch(error){
        return res.status(500).send({
            success:false,
            message:error.message
        });

    }
});

AuthorRouter.put("/update/:id", async(req, res)=>{
    const {id} = req.params
    const {age} = req.body

    await Author.findByIdAndUpdate(id,{age})
    res.status(200).send({
        success:true,
        message:"Autor modificado"
    })
});

AuthorRouter.delete("/delete/:id", async(req, res)=> {
    try {
        const {id} = req.params
        await Author.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Autor eliminado"
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error.message
        })
    }
});



module.exports = AuthorRouter;