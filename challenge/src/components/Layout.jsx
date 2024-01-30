import { Outlet, NavLink } from 'react-router-dom'

export default function Layout() {
    return (
        <>
            <header>
                <nav>
                    <ul className="layout__container">
                        <NavLink to="/">
                            <li className="layout__menu-item">Все котики</li>
                        </NavLink>
                        <NavLink to="/favorite">
                            <li className="layout__menu-item">Любимые котики</li>
                        </NavLink>
                    </ul>
                </nav>
            </header>
            <Outlet />
        </>
    )
}