import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ user, children }) {
    const location = useLocation();

    if(!user || !user.id) {
        return<Navigate to={`/login?redirect=${location.pathname}`} replace />;
    }

    return children;
}

export default ProtectedRoute;