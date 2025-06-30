import styled from "styled-components";

export const DashboardMain = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
` 
export const DashboardItemWrapper = styled.div`
    background-color: var(--teal-50);
    border: 1px solid var(--teal-500);
    border-radius: 20px;
    padding: var(--padding);
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: start;
    gap: 10px;
    min-width: 200px;

    svg {
        font-size: 30px;
    }

    &.alert {
        background-color: var(--red-50);
        border-color: var(--red-500);
        color: var(--red-900);
    }
`

export const DashboardItemText = styled.div`
    display: flex;
    flex-direction: column;
    
    h3 {
        font-size: 20px;
    }

    a {
        color: inherit;
        font-weight: 600;
        margin-top: 10px;
        &:hover {
            text-decoration: underline;
        }
    }
`