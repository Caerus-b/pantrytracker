import ThemeToggle from "./ThemeToggle"
export default function NavBar() {

    return (
        <nav className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Pantry Tracker</a>
            </div>
            <div className="flex-none">
                <ThemeToggle/>
            </div>
        </nav>
    )
}