import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, WRITER_ROUTE, READER_ROUTE} from "./utils/consts";
import Admin from "./pages/admin/Admin";
import Auth from './pages/auth/Auth';
import Writer from './pages/writer/Writer';
import Reader from './pages/reader/Reader';


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: WRITER_ROUTE,
        Component: Writer
    },
    {
        path: READER_ROUTE,
        Component: Reader
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    }
]