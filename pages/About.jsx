const { Outlet, Link } = ReactRouterDOM
export function About() {

    return (
        <section className="about">
            <h1>About books and us...</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio dolore sapiente,
                 iste animi corporis nisi atque tempora assumenda dolores. Nobis nam dolorem 
                 rerum illo facilis nemo sit voluptatibus laboriosam necessitatibus!</p>

            <nav>
                <Link to="/about/team"><h2>Team</h2></Link>
                <Link to="/about/goal"><h2>Goal</h2></Link>
            </nav>

            <section>
                <Outlet />
            </section>
        </section>
    )
}