import { useLocation, Navigate } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();

    // Redirect unauthenticated users to login
    if (
        !isAuthenticated &&
        !(location.pathname.includes('/login') || location.pathname.includes('/register'))
    ) {
        return <Navigate to='/auth/login' />;
    }

    // Redirect authenticated users away from login/register pages
    if (
        isAuthenticated &&
        (location.pathname.includes('/login') || location.pathname.includes('/register'))
    ) {
        if (user?.role === 'admin') {
            return <Navigate to='/admin/dashboard' />;
        } else {
            return <Navigate to='/shop/home' />;
        }
    }

    // Block shop users from accessing admin pages
    if (isAuthenticated && user?.role !== 'admin' && location.pathname.includes('admin')) {
        return <Navigate to='/unauth-page' />;
    }

    // Block admins from accessing shop pages
    if (isAuthenticated && user?.role === 'admin' && location.pathname.includes('shop')) {
        return <Navigate to='/admin/dashboard' />;
    }

    // Allow access if all checks pass
    return <>{children}</>;
}

export default CheckAuth;
