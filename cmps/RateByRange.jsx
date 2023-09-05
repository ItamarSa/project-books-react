export function RateByRange({ handleChange, reviewToAdd }) {
    console.log('by range')
    const { rating } = reviewToAdd
    return (
        <div>
            <label htmlFor="rating">Rating:
                <input value={rating} onChange={handleChange} type="range" name="rating"
                    min="1" max="5" id="rating" />
            </label>
        </div>
    )
}