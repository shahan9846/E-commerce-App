import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

const UserProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)

    if (loading) {
        return <h1>Loading...</h1>
    }

    if (!user) {
        return <Navigate to="/signup" />
    }
    return children
}

export default UserProtectedRoute