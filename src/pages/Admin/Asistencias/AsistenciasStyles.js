import styled from "styled-components";

export const AsistenciasMain = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: auto;

    .p-datatable-wrapper {
        max-width: 1000px;
    }

    td, th {
        white-space: nowrap; /* para que no rompa línea */
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
        border: 1px solid var(--white-100);
    }

`