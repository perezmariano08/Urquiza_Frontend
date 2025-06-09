import { Column } from 'primereact/column';
import { DataTableStyled } from './DataTableStyles';
import { useNavigate } from 'react-router-dom';

const DataTable = ({ data = [], columns = [], paginator, rowClickBasePath, rowClickIdField, rows, scrollable }) => {
    const navigate = useNavigate();

    const handleRowClick = (e) => {
        const idField = rowClickIdField || 'id';
        const id = e.data?.[idField];

        if (rowClickBasePath && id) {
            navigate(`${rowClickBasePath}/${id}`);
        }
    };

    return (
        <DataTableStyled
            value={data}
            onRowClick={handleRowClick}
            tableStyle={{ minWidth: '50rem' }}
            emptyMessage="No hay datos"
            paginator={paginator}
            rowsPerPageOptions={[25, 50, 100, 200]}
            rows={rows || 25}
            removableSort
            scrollable={scrollable}
        >
            {columns.map((col) => (
                <Column 
                    key={col.field} 
                    field={col.field} 
                    header={col.header} 
                    sortable={col.sortable}
                    body={col.body} // ✅ Acepta funciones personalizadas
                    style={col.style}
                />
            ))}
        </DataTableStyled>
    );
};


export default DataTable