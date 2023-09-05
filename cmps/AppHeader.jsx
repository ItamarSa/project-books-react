import { UserMsg } from "./UserMsg.jsx"

const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>Itamar's Book App</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/book" >Books</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}