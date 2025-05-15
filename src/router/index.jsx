import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/Layout/AdminLayout';
import Dashboard from '../pages/Dashboard';
import Alumnos from '../pages/Admin/Alumnos/Alumnos';
import Grados from '../pages/Admin/Grados/Grados';
import Cursos from '../pages/Admin/Cursos/Cursos';
import Alumno from '../pages/Admin/Alumnos/Alumno/Alumno';
import Grado from '../pages/Admin/Grados/Grado/Grado';
import Curso from '../pages/Admin/Cursos/Curso/Curso';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
                <Route path="/admin/alumnos" element={<AdminLayout><Alumnos /></AdminLayout>} />
                <Route path="/admin/alumnos/:id_alumno" element={<AdminLayout><Alumno /></AdminLayout>} />
                <Route path="/admin/grados" element={<AdminLayout><Grados /></AdminLayout>} />
                <Route path="/admin/grados/:id_grado" element={<AdminLayout><Grado /></AdminLayout>} />
                <Route path="/admin/cursos" element={<AdminLayout><Cursos /></AdminLayout>} />
                <Route path="/admin/cursos/:id_curso" element={<AdminLayout><Curso /></AdminLayout>} />
            </Routes>
        </BrowserRouter>
    );
}
