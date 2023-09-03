import { bookService } from "../services/books.service.js";
import { BookList } from "../cmps/BookList.jsx";

const { useState, useEffect } = React

export function BooksIndex() {

    const [books, setBooks] = useState(null)

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
        })
    }


    console.log('render')
    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            {!selectedBookId &&
                <React.Fragment>
                    <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                    <BookList books={books} onRemoveBook={onRemoveBook} onSelectBookId={onSelectBookId} />
                </React.Fragment>
            }

            {selectedBookId && <BookDetails onBack={() => onSelectBookId(null)} bookId={selectedBookId} />}
        </section>
    )

}