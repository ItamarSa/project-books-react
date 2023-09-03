import { bookService } from "../services/books.service.js";
import { BookList } from "../cmps/BookList.jsx";

const { useState, useEffect } = React

export function BooksIndex() {

    const [books, setBooks] = useState(null)



    useEffect(() => {
        console.log('mount')
        // bookService.query(filterBy).then(books => setBooks(books))
         bookService.query().then(setBooks)
    }, [])

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
        })
    }


    console.log('render')
    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            {

                    <BookList books={books} onRemoveBook={onRemoveBook} />
            }

            {/* {selectedBookId && <BookDetails onBack={() => onSelectBookId(null)} bookId={selectedBookId} />} */}
        </section>
    )

}