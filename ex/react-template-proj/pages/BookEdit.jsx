import { bookService } from "../services/books.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.bookId) loadBook()
    }, [])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBookToEdit)
            .catch(err => console.log('err:', err))
    }


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

        if(field === 'listPrice') {
            const listPrice = { ...bookToEdit.listPrice}
            listPrice.amount = value
            setBookToEdit(prevBookToEdit => ({ ...prevBookToEdit, [field]: listPrice }))
            return
        }
        setBookToEdit(prevBookToEdit => ({ ...prevBookToEdit, [field]: value }))
    }

    
    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => {
                navigate('/book')
                showSuccessMsg(`Added/Edited successfully! ${bookToEdit.id}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Problem Adding/Editing ' + bookToEdit.id)
        })
    }

    const { title} = bookToEdit
    console.log('bookToEdit', bookToEdit);

    const { amount } = bookToEdit.listPrice

    return (
        <section className="book-edit">
            <form onSubmit={onSaveBook} >
                <label htmlFor="title">Title: </label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="listPrice">Price: </label>
                <input onChange={handleChange} value={amount} type="number" name="listPrice" id="listPrice" />

                <button>Save</button>
            </form>
        </section>
    )
}
