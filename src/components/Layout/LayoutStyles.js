import styled from "styled-components";

export const AdminLayoutStyled = styled.main`
    display: flex;
    width: 100%;
`

export const AdminLayoutContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
`

export const AdminLayoutContentHeader = styled.div`
    display: flex;
    width: 100%;
    height: 40px;
    background-color: var(--teal-100);
    padding: 0 16px;
    align-items: center;

    .bars {
        width: 26px;
        height: 26px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        cursor: pointer;
        transition: all ease-in-out .2s;

        &:hover {
            background-color: var(--teal-900);
            svg {
                font-size: 18px;
                color: var(--teal-50);
            }
        }
    
        svg {
            font-size: 20px;
            color: var(--teal-600);
            transition: all ease-in-out .2s;
        }
    }
    
`

export const AdminLayoutContentMain = styled.div`
    display: flex;
    width: 100%;
    background-color: var(--white-50);
    padding: 20px;
    min-height: calc(100% - 40px);
    overflow: hidden;
`