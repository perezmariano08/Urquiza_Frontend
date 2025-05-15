import { DataTable } from "primereact/datatable";
import styled from "styled-components";

export const DataTableStyled = styled(DataTable)`
    border-radius: var(--radius);
    width: 100%;


    thead {
        tr {
            th {
                padding: var(--padding-sm);
                background-color: var(--teal-50);
                color: var(--teal-900);

                &.p-sortable-column {
                    .p-column-header-content {
                        display: flex;
                        align-items: center;
                        gap: 8px;

                        svg.p-sortable-column-icon {
                            width: 10px;
                        }
                    }
                    &.p-highlight {
                        svg.p-sortable-column-icon {
                            color: var(--teal-600);
                        }
                    }
                }
                
            }
        }
    }
    
    tbody {
        tr {
            td {
                padding: var(--padding-sm);
                color: var(--teal-900);
            }

            &:hover {
                background-color: var(--white-0);
                cursor: pointer;
            }
        }
    }
`