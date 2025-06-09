import { Dialog } from "primereact/dialog";
import styled from "styled-components";

export const DialogStyled = styled(Dialog)`
    min-width: 320px;

    .p-dialog-header {
        padding: 16px;
        .p-dialog-title {
            font-size: 18px;
        }
    }

    .p-dialog-content {
        padding: 16px;
        gap: 20px;
        display: flex;
        flex-direction: column;
    }
`