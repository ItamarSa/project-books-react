import { bookService } from "../services/books.service.js";


const { useState, useEffect } = React

export function BookDetails({bookId, onBack}) {

    const [book, setBook] = useState(null)

    useEffect(()=>{
        bookService.get(bookId).then(setBook)
    }, [])

    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <h1>Book Title: {book.title}</h1>
            <h1>Book Price: {book.listPrice['amount']}</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                 Enim rem accusantium, itaque ut voluptates quo? Vitae animi maiores nisi,
                  assumenda molestias odit provident quaerat accusamus, reprehenderit impedit, possimus est ad?</p>
            <button onClick={onBack}>Back</button>
        </section>
    )
}
