const express = require ("express")
const Book = require("../models/Book")
const BookRouter = express.Router()


BookRouter.get("/find/:id", async (req, res)=>{
    try {
        const {id} = req.params
        let book = await Book.findById(id).populate({path:"author",select:"name"});

        if(!book){
            return res.status(404).send({
                success:false,
                message:"No se ha encontrado el libro"
            })
        }

        return res.status(200).send({
            success:true,
            message:"Libro",
            book
        });

    } catch (error) {
        return res.status(500).send({
            success:false,
            message:error.message
        });
    }
});

BookRouter.post("/book", async (req, res)=>{
    try{
        const {title,description,authorId} = req.body
        if(!title || !description || !authorId){
            return res.status(400).send({
                success:false,
                message:"Complete todos los campos"
            });
        }

        let book = new Book({
            title,
            description,
            author:authorId
        });

        await book.save()
        return res.status(200).send({
            success:true,
            message:"Libro creado correctamente",
            book
        });

    }catch(error){
        return res.status(500).send({
            success:false,
            message:error.message
        });

    }
});

BookRouter.put("/updateBook/:id", async(req, res)=>{
    const {id} = req.params
    const {description} = req.body

    await Book.findByIdAndUpdate(id,{description})
    res.status(200).send({
        success:true,
        message:"Libro modificado modificado"
    })
});

BookRouter.delete("/deleteBook/:id", async(req, res)=> {
    try {
        const {id} = req.params
        await Book.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Libro eliminado"
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:error.message
        })
    }
});

module.exports = BookRouter;