import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const AlumnosMain = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
    padding: 20px;
    input {
        width: 100%;
        max-width: 550px;
    }
`

export const AlumnoMain = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    gap: 20px;
`
export const AlumnoHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: var(--white-0);
    border: 1px solid var(--white-100);
    padding: 20px;
`

export const AlumnoHeaderDatos = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

export const AlumnoHeaderDatosItem = styled.div`
    display: flex;
    border-radius: 20px;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    font-size: 16px;
    justify-content: center;
    align-items: center;

    &.red {
        color: var(--red-900);
        border: 1px solid var(--red-300);
        background-color: var(--red-100);
    }

    &.green {
        color: var(--green-900);
        border: 1px solid var(--green-300);
        background-color: var(--green-100);

    }
`

export const AlumnoHeaderDatosCurso = styled(NavLink)`
    display: flex;
    background-color: var(--teal-100);
    border-radius: 20px;
    padding: 6px 12px;
    font-size: 14px;
    align-items: center;
    gap: 5px;
    color: var(--tel-900);
    border: 1px solid var(--teal-300);
`

export const AlumnoInformacionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: var(--white-0);
    border: 1px solid var(--white-100);
    border-radius: var(--radius);
    padding: var(--padding);

    h2 {
        font-size: 18px;
    }

    form {
        margin-bottom: 20px;

        &.lista {
            flex-direction: column;
            display: flex;
        }
    }
`

export const AlumnoInformacionAlerta = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 0 10px 10px 0;
    background-color: var(--red-50);
    color: var(--red-900);
    padding: 12px 16px;
    border-left: 2px solid var(--red-500);
    width: fit-content;
`

export const AlumnoInformacionAlertaLista = styled.ul`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    gap: 10px;
`

export const AlumnoInformacion = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 5px;
    li {
        span {
            font-weight: 600;
        }

        a {
            color: var(--teal-500);
            &:hover {
                text-decoration: underline;
            }
        }
    }
`

export const AlumnosMenuWrapper = styled.nav`
    display: flex;
    gap: 20px;
    background-color: var(--white-0);
    padding: 0 20px;
    a {
        color: var(--teal-900);
        padding: 16px;
        border-bottom: 2px solid transparent;

        &.active {
            color: var(--teal-500);
            border-color: var(--teal-500);
        }
    }
`