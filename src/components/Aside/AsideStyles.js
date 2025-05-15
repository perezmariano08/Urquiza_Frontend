import styled from "styled-components";
import { motion } from 'framer-motion'

export const AsideStyled = styled(motion.aside)`
    background-color: var(--teal-900);
    color: var(--white-50);
    height: 100vh;
    width: 350px;
    position: sticky;
    top: 0;
`

export const AsideHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--teal-800);
    padding: 16px;
    color: var(--teal-300);

    h1 {
        font-weight: 400;
        font-size: 22px;
        span {
            font-weight: 800;
        }
    }
`

export const AsideMenuTitulo = styled.div`
    padding: var(--padding);

    h3 {
        text-transform: uppercase;
        color: var(--teal-50);
        font-weight: 600;
        font-size: 14px;
    }
`

export const AsideMenu = styled.ul`
    display: flex;
    flex-direction: column;

    li a {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: var(--padding-sm);
        color: var(--teal-50);
        font-size: 16px;

        svg {
            color: var(--teal-50);
        }

        &.active {
            font-weight: 700;
            color: var(--teal-300);
            svg {
                color: var(--teal-300);
            }
        }

        &:hover {
            background-color: var(--teal-800);
        }
    }
`