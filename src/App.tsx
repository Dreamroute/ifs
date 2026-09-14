import {Navigate, Route, Routes} from 'react-router-dom'
import AdminLayout from './layout/AdminLayout'

export default function App() {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route path="/dashboard" element={null} />
                <Route path="/users" element={null} />
                <Route path="/orders" element={null} />
                <Route path="/content" element={null} />
                <Route path="/roles" element={null} />
                <Route path="/settings" element={null} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
        </Routes>
    )
}
