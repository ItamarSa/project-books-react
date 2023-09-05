import { bookService } from "../services/books.service.js"

const { useState } = React


export function AddReview({onSetReview}) {

    // const [review, setReview] = useState(null)

    const [isHide, setReviewForm] = useState(true)
    const [reviewToAdd, setReview] = useState(bookService.getEmptyReview())




    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;
            case 'checkbox':
                value = target.checked
                break
            default:
                break;
        }
        setReview(prevReview => ({ ...prevReview, [field]: value }))
    }

    function onSubmitReview(ev) {
        ev.preventDefault()
        console.log('002as45d4a5d45as')
        onSetReview(reviewToAdd)
    }

    const { fullName, rating, readAt } = reviewToAdd

    console.log('reviewToAdd:', reviewToAdd)

    const dynClass = isHide ? 'hide' : ''


    return (
        <section className="book-review">
            <button onClick={() => setReviewForm(!isHide)}>Add Review</button>
            <form onSubmit={onSubmitReview} className={"Review-container " + dynClass}>
                <label htmlFor="fullName">Full Name: </label>
                <input onChange={handleChange} value={fullName} type="text" name="fullName" id="fullName" />

                <label htmlFor="rating">Rating: </label>
                <input onChange={handleChange} value={rating} type="range" name="rating" min="0" max="5" id="rating" />

                <label htmlFor="readAt">Date: </label>
                <input onChange={handleChange} value={readAt} type="date" name="readAt" id="readAt" />

                <button>Save</button>
            </form>
        </section>

    )

}