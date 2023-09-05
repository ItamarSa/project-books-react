import { BookFilter } from "../cmps/BookFilter.jsx"
import { bookService } from "../services/books.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { Link } = ReactRouterDOM

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
            showSuccessMsg(`Book Removed! ${bookId}`)
        })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Problem Removing ' + bookId)
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
            <Link to="/book/edit" >Add Book</Link>
            <BookList books={books} onRemoveBook={onRemoveBook} />
        </section>
    )
}