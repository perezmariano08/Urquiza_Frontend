import styled from "styled-components";

export const FormStyled = styled.form`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem; /* Separación entre inputs */
    row-gap: 2rem;
    border-radius: 10px;
    align-items: center;
    background-color: ${({ bg }) => `var(--${bg})` || 'transparent'};
    padding: ${({ padding }) => `${padding}px` || '0'};

    &.checkbox {
        display: flex;
        gap: 0px;
        flex-direction: column
    }
`;


export const FormButtons = styled.div`
    display: flex;
    gap: 10px; /* Separación entre inputs */
    align-items: center
`;
