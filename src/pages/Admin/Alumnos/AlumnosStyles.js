import styled from "styled-components";

export const AlumnosMain = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;

    input {
        width: 100%;
        max-width: 550px;
    }
`

export const AlumnoMain = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
`
export const AlumnoInformacionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: var(--white-0);
    border: 1px solid var(--white-100);
    border-radius: var(--radius);
    padding: var(--padding);

    h1 {
        font-size: 24px;
    }
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