import { LongText } from "../cmps/LongText.jsx";
import { bookService } from "../services/books.service.js";


const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM


export function BookDetails({ onBack }) {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadRobot()
    }, [params.bookId])

    function loadRobot() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err)
                navigate('/book')
            })
    }

    function onBack() {
        navigate('/book')
        // navigate(-1)
    }

    function pageCount(book) {
        if (book.pageCount > 500) return 'Serious Reading'
        if (book.pageCount > 200) return 'Descent Reading'
        if (book.pageCount < 100) return 'Light Reading'
    }

    function bookAge(book) {
        const currYear = new Date().getFullYear()
        let publishedYear = book.publishedDate
        let diff = currYear - publishedYear
        if (diff < 1) publishedYear += ' - New'
        if (diff > 10) publishedYear += ' - Vintage'
        return publishedYear
    }

    function getPriceColor(book) {
        if (book.listPrice.amount > 150) return 'red'
        if (book.listPrice.amount < 20) return 'green'
    }

    function onSale(book) {
        if (book.listPrice.isOnSale) return 'On Sale!'
        return
    }

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <h1>{book.title}</h1>
            <h2>{book.subtitle}</h2>
            <h4>Book Authors: {book.authors.join(',')}</h4>
            <h4>Published Date: {bookAge(book)}</h4>
            {/* <h4>Book Age: {bookAge(book)}</h4> */}
            <h4>Page Count: {book.pageCount}</h4>
            <h4>Read Level: {pageCount(book)}</h4>
            <h4>Book Category: {[book.categories]}</h4>
            <h4 className={getPriceColor(book)}>Book Price: {book.listPrice['amount']}</h4>
            <h4>Discount: {onSale(book)}</h4>
            <h4>Book language: {book.language}</h4>

            <div>Description: <LongText txt = {book.description} /></div>

            <button onClick={onBack}>Back</button>
        </section>
    )
}
