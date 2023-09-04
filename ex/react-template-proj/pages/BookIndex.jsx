import { BookFilter } from "../cmps/BookFilter.jsx"
import { bookService } from "../services/books.service.js"
import { BookList } from "../cmps/BookList.jsx"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        console.log('mount')
        bookService.query(filterBy).then(setBooks)
    }, [filterBy])

    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
        })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    console.log('render')
    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
                    <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                    <BookList books={books} onRemoveBook={onRemoveBook} />
        </section>
    )
}