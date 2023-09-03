export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h2>Book Title: {book.title}</h2>
            <h4>Book List Price: {book.listPrice}</h4>
            <img src={`../BooksImages/${book.id}.png`} alt="" />
        </article>
    )
}
