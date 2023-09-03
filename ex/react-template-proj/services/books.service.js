import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
var gFilterBy = {txt: '', minSpeed: 0}
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getFilterBy,
    setFilterBy
}

function query() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (gFilterBy.txt) {
                const regex = new RegExp(gFilterBy.txt, 'i')
                books = books.filter(book => regex.test(book.vendor))
            }
            if (gFilterBy.minSpeed) {
                books = books.filter(book => book.maxSpeed >= gFilterBy.minSpeed)
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

function getEmptyBook(id ='',title = '', listPrice) {
    return { id, title, listPrice }
}

function getFilterBy() {
    return {...gFilterBy}
}

function setFilterBy(filterBy = {}) {
     if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
    return gFilterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            var idx = books.findIndex(book => book.id === bookId)
            if (idx === books.length - 1) idx = -1
            return books[idx + 1].id
        })
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