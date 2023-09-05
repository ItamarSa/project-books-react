export function ReviewPreview({ review, onDeleteReview }) {

  const { id, fullName, rating, readAt } = review
  return (
    <article className='review-preview'>
      <li>Full name: {fullName}</li>
      <li>Rating: {rating}</li>
      <li>Read At: {readAt}</li>
      <button onClick={() => onDeleteReview(id)}>Delete</button>
    </article>
  )
}
