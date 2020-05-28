const { Router } = require('express');
const router = Router();
const _ = require('lodash');
const books = require('../books.json');
const authors = require('../authors.json');

//1- Get all authors
router.get('/', (req, res) => {
    try {
        res.json(authors);
    } catch (error) {
        console.log(error);
    }
});

//2- Get all books with the author

//3- Add an author
router.post('/', (req, res) => {
    try {
        const { id, name, lastname } = req.body;

        if(id.trim() === '') {
            res.status(400).json({ 'msg' : "'id' is required" });
            return;
        }

        if(name.trim() === '') {
            res.status(400).json({ 'msg' : "'name' is required" });
            return;
        }

        if(lastname.trim() === '') {
            res.status(400).json({ 'msg' : "'lastname' is required" });
            return;
        }

        const author = req.body;
        authors.push(author);

        res.json({ 'msg' : 'The author addded successfully'});
    } catch (error) {
        console.log(error);
        res.status(400).json({'msg' : 'An error has accured.'});
    }
});

//5- Modify an author
router.put('/:id', (req, res) => {
    try {
        const id = req.param.id;
        const { name, lastname } = req.body;

        if(name.trim() === '') {
            res.status(400).json({ 'msg' : "'name' is required" });
            return;
        }

        if(lastname.trim() === '') {
            res.status(400).json({ 'msg' : "'lastname' is required" });
            return;
        }        
        
        _.each(authors, (author) => {
            if (author.id == id) {                    
                author.name = name;
                author.lastname = lastname;
                res.json({ 'msg' : 'The author was updated successfully'});
                return;                    
            }
        });

        res.status(404).json({ 'msg' : `There is not an author with the id ${id}`});

    } catch (error) {
        console.log(error);
        res.status(400).json({'msg' : 'An error has accured.'});
    }
});

//7- Delete a author
router.delete('/:id', (req, res) => {
    try {
        const id = req.param.id;

        let exist = false;
        _.remove(authors, (author) => {
            if(author.id === id) {
                _.remove(books, (book) => {
                    return book.authorid === id;
                })    
                exist = true;            
                return id;
            }
        });

        exist 
            ? res.json({ 'msg' : 'The author and their books were removed successfully' })
            : res.status(404).json({ 'msg' : `There is not an author with the id ${id}`});

    } catch (error) {
        console.log(error);
        res.status(400).json({'msg' : 'An error has accured.'});
    }
});

module.exports = router;
