import styled from "styled-components";

export const LoginContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    padding: 10px;
`

export const LoginWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
`

export const LoginImagenWrapper = styled.div`
    background-image: url(${props => props.$imageUrl});
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
    border-radius: 10px;
    overflow: hidden;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        opacity: .9;
        width: 100%;
        height: 100%;
        background-color: var(--teal-900); // capa negra con 50% de opacidad
        z-index: 1;
    }
    img {
        z-index: 2;
        width: 50%;
    }

    @media (max-width: 968px) {
        display: none;
    }
`

export const LoginRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    width: 100%;

    form {
        display: flex;
        flex-direction: column;
        gap: 25px;
        width: 60%;

        button {
            width: 100%;
        }
    }

    @media (max-width: 968px) {
        padding: 20px;
        form {
            width: 100%;
        }
        
    }
`

export const TituloForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 80%;
    justify-content: center;
    align-items: center;

    @media (max-width: 968px) {
        width: 100%;
    }

    h1 {
        color: var(--teal-900);
        font-weight: 600;
        text-align: center;
        line-height: 110%;

        span {
            font-weight: 700;
            color: var(--teal-600);
            strong {
                color: var(--teal-600);
            }
        }
    }

    p {
        text-align: center;
    }
`