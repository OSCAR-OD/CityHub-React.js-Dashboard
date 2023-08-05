import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1></h1>
            </header>
            <main className="public__main">
                <p></p>
            </main>
            <footer>
                <Link to="/login"></Link>
            </footer>
        </section>

    )
    return content
}
export default Public