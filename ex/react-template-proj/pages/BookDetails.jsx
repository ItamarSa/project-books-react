import { bookService } from "../services/books.service.js";


const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId).then(setBook)
    }, [])

    function pageCount(book) {
        if (book.pageCount > 500) return 'Serious Reading'
        if (book.pageCount > 200) return 'Descent Reading'
        if (book.pageCount < 100) return 'Light Reading'
    }

    function bookAge(book) {
        if (book.publishedDate < 1) return 'New'
        if (book.publishedDate > 10) return 'Vintage'
    }

    function getPriceColor(book) {
        if (book.listPrice['amount'] > 150) return 'red'
        if (book.listPrice['amount'] < 20) return 'green'
    }

    function onSale(book) {
        if (book.listPrice['isOnSale']) return 'On Sale!'
    }

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <h3>Book Title: {book.title}</h3>
            <h1>Book Subtitle: {book.subtitle}</h1>
            <h4>Book Authors: {book.authors}</h4>
            <h4>Published Date: {book.publishedDate}</h4>
            <h4>Book Age: {bookAge(book)}</h4>
            <h4>Page Count: {book.pageCount}</h4>
            <h4>Read Level: {pageCount(book)}</h4>
            <h4>Book Category: {[book.categories]}</h4>
            <h4 className={getPriceColor(book)}>Book Price: {book.listPrice['amount']}</h4>
            <h4>Discount: {onSale(book)}</h4>
            <h4>Book language: {book.language}</h4>
            <p>Book Description :{book.description}</p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}
