import { Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Layout = () => {
    const { konami } = useAuth()


    return (
        <main className={konami ? "Konami" : "App"}>
            <Outlet />
        </main>
    )
}

export default Layout
