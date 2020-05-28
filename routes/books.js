const { Router } = require('express');
const router = Router();
const _ = require('lodash');
const books = require('../books.json');
const authors = require('../authors.json');

//2- Get all books with the author
const getAuthorById = id => {
    authors.map(author => {
        if(author.id === id) {
            return author;
        }
    });
}

router.get('/', (req, res) => {
    console.log('get books');
    try {
        const booksWithAuthors = [];
        books.map(book => {
            booksWithAuthors.push({
                'id' : book.id,
                'name' : book.name,
                'author' : getAuthorById(book.authorid)
            });
        });

        res.json({booksWithAuthors});

    } catch (error) {
        console.log(error);
        res.status(400).json({'msg' : 'An error has accured.'});
    }
});

//4- Add a book
router.post('/', (req, res) => {
    try {
        const { id, name, authorid } = req.body;

        if(id.trim() === '') {
            res.status(400).json({ 'msg' : "'id' is required" });
            return;
        }

        if(name.trim() === '') {
            res.status(400).json({ 'msg' : "'name' is required" });
            return;
        }

        if(authorid.trim() === '') {
            res.status(400).json({ 'msg' : "'authorid' is required" });
            return;
        }

        const book = req.body;
        books.push(book);

        res.json({ 'msg' : 'The book addded successfully'});
    } catch (error) {
        console.log(error);
        res.status(400).json({'msg' : 'An error has accured.'});
    }
});

//6- Modify a book
router.put('/:id', (req, res) => {
    try {
        const id = req.param.id;
        const { name, authorid } = req.body;

        if(name.trim() === '') {
            res.status(400).json({ 'msg' : "'name' is required" });
            return;
        }

        if(authorid.trim() === '') {
            res.status(400).json({ 'msg' : "'authorid' is required" });
            return;
        }        
        
        _.each(books, (book) => {
            if (book.id == id) {                    
                book.name = name;
                book.authorid = authorid;
                res.json({ 'msg' : 'The book was updated successfully'});
                return;                    
            }
        });

        res.status(404).json({ 'msg' : `There is not a book with the id ${id}`});

    } catch (error) {
        console.log(error);
        res.status(400).json({'msg' : 'An error has accured.'});
    }
});

//8- Delete a book
router.delete('/:id', (req, res) => {
    try {
        const id = req.param.id;

        let exist = false;
        _.remove(books, (book) => {
            if(book.id === id) {                 
                exist = true;            
                return id;
            }
        });

        exist 
            ? res.json({ 'msg' : 'The book was removed successfully' })
            : res.status(404).json({ 'msg' : `There is not an book with the id ${id}`});

    } catch (error) {
        console.log(error);
        res.status(400).json({'msg' : 'An error has accured.'});
    }
});

module.exports = router;