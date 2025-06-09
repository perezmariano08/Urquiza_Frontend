import { ConfirmDialog } from "primereact/confirmdialog";
import styled from "styled-components";

export const ConfirmDialogStyled = styled(ConfirmDialog)`
    min-width: 320px;
    .p-dialog-header {
        padding: 16px;
        
        .p-dialog-title {
            font-size: 16px;
            color: var(--black-800);
        }

        .p-dialog-header-close-icon {
            color: var(--black-800);
        }
    }

    .p-dialog-content {
        padding: 0 16px 16px 16px;

        svg {
            font-size: 28px;
        }

        .p-confirm-dialog-message {
            font-size: 14px;
            font-weight: 200;
            color: var(--black-800);
            margin-left: 16px;
        }
    }

    .p-dialog-footer {
        padding: 0 16px 16px 16px;

        button.p-button {
            padding: 8px 16px !important;
            color: var(--black-800);
            border: 1px solid var(--yellow);
            padding: 0.75rem 1.25rem;
            font-size: 1rem;
            transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
            border-radius: 6px;
            margin-right: 5px;
            
            &.p-confirm-dialog-accept {
                background-color: var(--yellow);
                color: var(--black-900);
            }

            &.p-confirm-dialog-reject {
                border: none;
            }

            &:not(:disabled):active {
                background: var(--yellow-10);
                color: var(--black-800);
                border-color: var(--yellow);
            }

            &:focus {
                box-shadow: none;
            }
        }
    }
`