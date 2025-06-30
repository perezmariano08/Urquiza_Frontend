import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/Layout/AdminLayout';
import Dashboard from '../pages/Admin/Dashboard/Dashboard';
import Alumnos from '../pages/Admin/Alumnos/Alumnos';
import Grados from '../pages/Admin/Grados/Grados';
import Cursos from '../pages/Admin/Cursos/Cursos';
import Alumno from '../pages/Admin/Alumnos/Alumno/Alumno';
import Grado from '../pages/Admin/Grados/Grado/Grado';
import Curso from '../pages/Admin/Cursos/Curso/Curso';
import Login from '../pages/Login/Login';
import RolRoute from './RolRoute';
import RequireAuth from './RequireAuth';
import Docentes from '../pages/Admin/Docentes/Docentes';
import { useSelector } from 'react-redux';
import Tutores from '../pages/Admin/Tutores/Tutores';
import Usuarios from '../pages/Admin/Usuarios/Usuarios';
import Observaciones from '../pages/Admin/Observaciones/Observaciones';
import Asistencias from '../pages/Admin/Asistencias/Asistencias';
import AlumnoObservaciones from '../pages/Admin/Alumnos/Alumno/AlumnoObservaciones';
import Docente from '../pages/Admin/Docentes/Docente/Docente';
import DocenteAsistencias from '../pages/Admin/Docentes/Docente/DocenteAsistencias';

export default function AppRouter() {

    const user = useSelector((state) => state.user.user);

    return (
        <BrowserRouter>
            <RequireAuth>
                <Routes>
                    <Route path="*" element={<Navigate to="/login" replace />} />
                    <Route path="/login" element={user ? <Navigate to="/admin/dashboard" replace /> : <Login user={user} />} />
                    <Route path="/admin/dashboard" element={<AdminLayout user={user}><Dashboard /></AdminLayout>} />
                    <Route path="/admin/alumnos" element={<AdminLayout user={user}><Alumnos /></AdminLayout>} />
                    <Route path="/admin/alumnos/:id_alumno" element={<AdminLayout user={user}><Alumno user={user} /></AdminLayout>} />
                    <Route path="/admin/alumnos/:id_alumno/observaciones" element={<AdminLayout user={user}><AlumnoObservaciones user={user} /></AdminLayout>} />
                    <Route path="/admin/grados" element={<AdminLayout user={user}><Grados /></AdminLayout>} />
                    <Route path="/admin/grados/:id_grado" element={<AdminLayout user={user}><Grado /></AdminLayout>} />
                    <Route path="/admin/cursos" element={<AdminLayout user={user}><Cursos user={user} /></AdminLayout>} />
                    <Route path="/admin/cursos/:id_curso" element={<AdminLayout user={user}><Curso /></AdminLayout>} />
                    <Route path="/admin/docentes" element={<AdminLayout user={user}><Docentes user={user} /></AdminLayout>} />
                    <Route path="/admin/docentes/:id_docente" element={<AdminLayout user={user}><Docente user={user} /></AdminLayout>} />
                    <Route path="/admin/docentes/:id_docente/asistencias" element={<AdminLayout user={user}><DocenteAsistencias user={user} /></AdminLayout>} />
                    <Route path="/admin/tutores" element={<AdminLayout user={user}><Tutores user={user} /></AdminLayout>} />
                    <Route path="/admin/observaciones" element={<AdminLayout user={user}><Observaciones user={user} /></AdminLayout>} />
                    <Route path="/admin/asistencias" element={<AdminLayout user={user}><Asistencias user={user} /></AdminLayout>} />

                    {/* Rutas públicas */}

                    {/* Rutas protegidas solo para admin */}
                    <Route element={<RolRoute allowedRoles={[1]} />}>
                        <Route path="/admin" element={<Dashboard />} />
                        <Route path="/admin/usuarios" element={<AdminLayout user={user}><Usuarios user={user} /></AdminLayout>} />
                    </Route>

                    {/* Rutas para docentes y admin */}
                    <Route element={<RolRoute allowedRoles={[1, 2]} />}>
                        <Route path="/docente" element={<div>docente</div>} />
                    </Route>

                </Routes>
            </RequireAuth>
            
        </BrowserRouter>
    );
}
