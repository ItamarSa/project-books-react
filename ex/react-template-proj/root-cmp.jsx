const { useState } = React

import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { BooksIndex } from './pages/BookIndex.jsx'

export function App() {
    const [page, setPage] = useState('book')

    return <section className="app main-layout">
        <header className="app-header full main-layout">
            <h1>React Book App</h1>
            <nav className="app-nav">
                <a onClick={() => setPage('home')} href="#">Home</a>
                <a onClick={() => setPage('about')} href="#">About</a>
                <a onClick={() => setPage('book')} href="#">Books</a>
            </nav>
        </header>
        <main className="container">
            {page === 'home' && < Home />}
            {page === 'about' && <About />}
            {page === 'book' && <BooksIndex />}
        </main>
    </section>
}