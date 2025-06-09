import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';  // Importa el hook useNavigate
import { useAuthLogin } from '../../api/auth/useAuth';
import Button from '../../components/UI/Button/Button'
import InputText from '../../components/UI/InputText/InputText'
import Password from '../../components/UI/Password/Password'
import useForm from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux'; // Importar useDispatch
import { loginSuccess } from '../../redux/user/userSlice';
import { URL_UPLOADS } from '../../utils/constants';
import { LoginContainer, LoginImagenWrapper, LoginRight, LoginWrapper, TituloForm } from './LoginStyles';
import InputTextWrapper from '../../components/UI/InputText/InputTextWrapper';

const Login = ({user}) => {
    
    // Al inicio del componente:
    if (user?.user) {
        return <Navigate to="/admin/alumnos" replace />;
    }
    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 
    useEffect(() => {
    if (user?.user) {
        navigate('/admin/alumnos');
    }}, [user, navigate]);   

    const [formState, handleFormChange, resetForm, setFormState] = useForm({ 
        dni: "",
        password: "",
        errores: {}
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // Función para manejar el envío del formulario
    const { mutateAsync: loginUser, isLoading, isError, error: authError } = useAuthLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const isValid = validarCampos();
        // if (!isValid) return; // <-- Importante
        try {
            setLoading(true)
            // Aquí ejecutamos la función de login
            const response = await loginUser({ dni: parseInt(formState.dni), password: formState.password });            
            if (response.success) {
                console.log(response.user);
                // Almacenar el usuario en Redux y redirigir
                dispatch(loginSuccess(response.user));
                if (response.user) {
                    if (response.user.id_docente && response.user.id_curso) {
                        navigate(`/admin/cursos/${response.user.id_curso}`)
                    } else {
                        navigate('/admin/dashboard')
                    }
                } else {
                    navigate('/')
                }
                setLoading(false)
            } else {
                setLoading(false)
                setError(response.message);  // Mostrar el mensaje que viene del backend
            }
        } catch (error) {
            setLoading(false)
            setError('Hubo un error con la conexión');
        }
    };

    return (
        <LoginContainer>
            <LoginWrapper>
                <LoginImagenWrapper $imageUrl={`${URL_UPLOADS}/login_wrapper.webp`}>
                    <img src={`${URL_UPLOADS}/logo.webp`} />
                </LoginImagenWrapper>
                <LoginRight>
                    <TituloForm>
                        <h1>Iniciar sesión en <span>Urquiza<strong>Software</strong></span></h1>
                        <p>Bienvenido/a al sistema interno escolar de la Escuela Municipal Dr. Emilio Baquero Lazcano. Ingresá con tu DNI y contraseña para acceder a la plataforma.</p>
                    </TituloForm>

                    <form onSubmit={handleSubmit}>
                        <InputTextWrapper label={"DNI:"}>
                            <InputText
                                name="dni"
                                inputMode="numeric"
                                value={formState.dni}
                                onChange={handleFormChange}
                                placeholder="Ingrese su DNI"
                                error={formState.errores.email}
                                keyfilter={'int'}
                            />
                        </InputTextWrapper>
                        <InputTextWrapper label={"Contraseña:"}>
                            <Password 
                                name="password"
                                value={formState.password} 
                                type='password'
                                onChange={handleFormChange}
                                feedback={false}
                                toggleMask 
                                placeholder="Ingrese su contraseña"
                                error={formState.errores.password}
                            />
                        </InputTextWrapper>
                        <Button type="submit" onClick={handleSubmit}>Iniciar Sesion</Button>
                    </form>
                </LoginRight>
            </LoginWrapper>
            
        </LoginContainer>
        
    )
}

export default Login