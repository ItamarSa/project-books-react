import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getDefaultFilter,
    setFilterBy
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regex.test(book.title))
                console.log('*******', books);
            }
            if (filterBy.listPrice) {
                books = books.filter(book => book.listPrice['amount'] >= filterBy.listPrice)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(id = '', title = '', listPrice) {
    return { id, title, listPrice }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) filterBy.txt = filterBy.txt
    if (filterBy.listPrice !== undefined) filterBy.listPrice = filterBy.listPrice
    return filterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length - 1) idx = -1
            return books[idx + 1].id
        })
}

function getDefaultFilter() {
    return { txt: '', listPrice: '' }
}


function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createBook('OXeMG8wNskc', 'metus hendrerit', {
            "amount": 109,
            "currencyCode": "EUR",
            "isOnSale": false
        }))
        books.push(_createBook('JYOJa2NpSCq', 'morbi', {
            "amount": 44,
            "currencyCode": "EUR",
            "isOnSale": true
        }))
        books.push(_createBook('1y0Oqts35DQ', 'at viverra venenatis', {
            "amount": 108,
            "currencyCode": "ILS",
            "isOnSale": false
        }))
        books.push(_createBook('kSnfIJyikTP', 'dictum', {
            "amount": 30,
            "currencyCode": "EUR",
            "isOnSale": true
        }))
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(id, title, listPrice) {
    const book = getEmptyBook(id, title, listPrice)
    // book.id = utilService.makeId()
    return book
}