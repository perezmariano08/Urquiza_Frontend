import { DataTable } from "primereact/datatable";
import styled from "styled-components";

export const DataTableStyled = styled(DataTable)`
    width: 100%;
    font-size: 16px;
    font-weight: 300;
    color: var(--black-700);
    border-radius: 10px;
    overflow: hidden;
    
    thead {
        tr {
            th {
                padding: 8px 16px;
                border: none;
                .p-inputtext {
                    padding: 6px 12px;
                    font-weight: 300;
                    &:not(.p-invalid):hover {
                        border-color: var(--yellow);
                    }

                    &:enabled:focus {
                        outline: 0 none;
                        outline-offset: 0;
                        box-shadow: 0 0 0 0.2rem var(--yellow-10);
                        border-color: var(--yellow);
                    }

                    &::placeholder {
                        color: var(--white-800);
                        font-weight: 200;
                    }

                    &.p-disabled {
                        background-color: var(--white-100);
                    }
                }
                /* Boton Filtro */
                .p-column-filter-clear-button,
                .p-column-filter-menu-button {
                    display: none;
                }
            }
        }
    }

    tbody {
        tr {
            cursor: pointer;

            &:hover {
                opacity: .9;
            }
            td {
                padding: 8px 16px;

                
            }
            
            &.p-highlight {
                background-color: var(--white-100);
                color: var(--black-900);
            }

            a {
                color: var(--black-900);
                &:hover {
                    text-decoration: underline;
                }
            }

            
            
        }
    }

    .p-paginator-bottom {
        padding: 10px 0;
        .p-paginator-page {
            &.p-highlight {
                background-color: var(--yellow-50);
                color: var(--yellow-700);
            } 

            
        }
        .p-dropdown {
            display: flex;
            align-items: center;
            padding: 10px;
            gap: 10px;
            height: fit-content !important;

            .p-dropdown-trigger {
                width: auto;
            }
           &:not(.p-disabled):hover {
                border-color: var(--yellow);
            }

            &:not(.p-disabled).p-focus {
                outline: 0 none;
                outline-offset: 0;
                box-shadow: 0 0 0 0.2rem var(--yellow-10);
                border-color: var(--yellow);
            }
        }
    }
    

    .p-checkbox {
        .p-checkbox-input {
            
        }

        &.p-highlight {
            .p-checkbox-box {
                border-color: var(--yellow);
                background: var(--yellow);
                svg {
                    color: var(--black-800);
                }
            }
        }
        &:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
            border-color: var(--yellow);
        }
    }

`

export const DataTableEstado = styled.div`
    padding: 4px 10px;
    border-radius: 10px;
    background-color: var(--white-50);
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    font-size: 14px;
    font-weight: 300;

    &.red {
        background-color: var(--red-100);
        color: var(--red-600);
    }

    &.green {
        background-color: var(--green-100);
        color: var(--green-600);
    }

    &.blue {
        background-color: var(--blue-100);
        color: var(--blue-600);
    }

    &.orange {
        background-color: var(--orange-100);
        color: var(--orange-600);
    }
`

export const DataTableAccionesWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;

    span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        transition: all ease-in-out .2s;
        &.red {
            border: 1px solid var(--red);
            background-color: var(--red);
            color: var(--white-0);
        }

        &.orange {
            background-color: var(--orange-100);
            color: var(--orange-600);

            &:hover {
                background-color: var(--orange-600);
                color: var(--orange-50);
            }
        }
    }
`