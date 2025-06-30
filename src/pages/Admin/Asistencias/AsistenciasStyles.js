import styled from "styled-components";

export const AsistenciasMain = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: auto;
    gap: 20px;
    padding: 20px;

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

    tbody tr td{
        padding: 0;
    }

    .modal-overlay {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
    }
    .modal-content {
        background: white;
        padding: 24px;
        border-radius: 8px;
        min-width: 300px;
        display: flex;
        flex-direction: column;
        gap: 20px;

        li {
            display: flex;
            align-items: center;
            background-color: var(--teal-100);
            color: var(--teal-900);
            justify-content: space-between;
            padding: 10px;
            border-radius: 10px;
        }
    }

`