const { useState } = React
const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { BookDetails } from './pages/BookDetails.jsx'

export function App() {
    // const [page, setPage] = useState('book')

    return (
        <Router>
            <section className="app main-layout">
                <AppHeader />
                <main className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                    </Routes>
                </main>
            </section>
        </Router>
    )
}






{/* <header className="app-header full main-layout">
            <h1>React Book App</h1>
            <nav className="app-nav">
                <a onClick={() => setPage('home')} href="#">Home</a>
                <a onClick={() => setPage('about')} href="#">About</a>
                <a onClick={() => setPage('book')} href="#">Books</a>
            </nav>
        </header> */}
{/* {page === 'home' && < Home />}
                    {page === 'about' && <About />}
                    {page === 'book' && <BookIndex />} */}