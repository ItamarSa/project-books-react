import { bookService } from "../services/books.service.js"
import { RateByStars } from "./RateByStars.jsx"
import { RateByRange } from "./RateByRange.jsx"
import { RateBySelect } from "./RateBySelect.jsx"


const { useState } = React


export function AddReview({ onSetReview }) {

    const [isHide, setReviewForm] = useState(true)
    const [reviewToAdd, setReview] = useState(bookService.getEmptyReview())
    const [cmpType, setCmpType] = useState('Hello')

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
            case 'select':
                value = target.selection
                break
            default:
                break;
        }
        setReview(prevReview => ({ ...prevReview, [field]: value }))
    }

    function onSubmitReview(ev) {
        ev.preventDefault()
        onSetReview(reviewToAdd)
    }

    function DynamicCmp(props) {
        switch (cmpType) {
            case 'By Stars':
                return <RateByStars {...props} />
            case 'By Range':
                return <RateByRange {...props} />
            case 'By Select Option':
                return <RateBySelect {...props} />
        }
    }

    const { fullName, readAt } = reviewToAdd
    console.log('reviewToAdd:', reviewToAdd)

    const dynClass = isHide ? 'hide' : ''

    return (
        <section className="book-review">
            <button onClick={() => setReviewForm(!isHide)}>Add Review</button>
            <form onSubmit={onSubmitReview} className={"Review-container " + dynClass}>

                <label htmlFor="fullName">Full Name: </label>
                <input onChange={handleChange} value={fullName} type="text" name="fullName" id="fullName" />

                <div>
                    <select onChange={ev => setCmpType(ev.target.value)}>
                        <option value="">Select Comment</option>
                        <option>By Stars</option>
                        <option>By Range</option>
                        <option>By Select Option</option>
                    </select>
                    <DynamicCmp handleChange={handleChange} reviewToAdd={reviewToAdd} />
                </div>

                <label htmlFor="readAt">Date: </label>
                <input onChange={handleChange} value={readAt} type="date" name="readAt" id="readAt" />

                <button>Save</button>
            </form>
        </section>

    )

}