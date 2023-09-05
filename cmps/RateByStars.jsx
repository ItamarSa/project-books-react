const { useState } = React

export function RateByStars({ handleChange, reviewToAdd }) {
    const [rating1, setRating] = useState(0)
    const [hover, setHover] = useState(0)
    const { stars } = reviewToAdd

    // function renderStars(rating) {
    //     const starIcons = []
    //     for (let i = 0; i < rating; i++) {
    //         starIcons.push(
    //             <i
    //                 className='fa-solid fa-star fa-lg'
    //                 style={{ color: '#ffee00' }}
    //                 key={i}
    //             ></i>
    //         )
    //     }
    //     return starIcons
    // }
    return (
        <div className='star-rating'>
            {[...Array(5)].map((_, index) => {
                index += 1
                return (
                    <button
                        type='button'
                        value={stars}
                        key={index}
                        className={index <= (hover || rating1) ? 'on' : 'off'}
                        onClick={() => {
                            setRating(index)
                            handleChange({ target: { name: 'stars', value: index } })
                        }}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating1)}
                    >
                        <span className='star'>
                            <i className='fa-solid fa-star fa-lg'></i>
                        </span>
                    </button>
                )
            })}
        </div>
    )

}
