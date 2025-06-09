import { InputTextarea } from "primereact/inputtextarea";
import styled from "styled-components";

export const InputTextareaStyled = styled(InputTextarea)`
    padding: 12px 16px;
    font-size: 14px;
    border-radius: 10px;
    font-weight: 300;
    color: var(--black);

    &:not(.p-invalid):hover {
        border-color: var(--teal-400);
    }

    &:enabled:focus {
        outline: 0 none;
        outline-offset: 0;
        box-shadow: 0 0 0 0.2rem var(--teal-100);
        border-color: var(--teal-400);
    }

    &::placeholder {
        color: var(--white-800);
        font-weight: 200;
    }

    &.p-disabled {
        background-color: var(--white-100);
    }

`
