import './App.css';
import { AuthProvider } from './auth/AuthContext.jsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import ToDoPage from './pages/ToDoPage.jsx';
import PublicRoute from "./routes/PublicRoute.jsx";

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Routes>
                    <Route element={<PublicRoute />}>
                        <Route 
                            path="/login" 
                            element={<AuthPage />} 
                        />
                        <Route 
                            path="/" 
                            element={<Navigate to="/login" />}
                        />
                    </Route>
                    <Route element={<ProtectedRoute />}>
                        <Route 
                            path="/todo" 
                            element={<ToDoPage />}
                        />
                    </Route>
                </Routes>
            </AuthProvider>
        </div>
    );
}

export default App;