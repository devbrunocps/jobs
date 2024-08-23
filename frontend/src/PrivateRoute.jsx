import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import Loading from "./components/Loading/Loading";

export const UserPrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Loading />;
    }

    return user ? children : <Navigate to="/user/login" replace={true} />;
};

export const CompanyPrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Loading />;
    }

    return user ? children : <Navigate to="/company/login" replace={true} />;
};
