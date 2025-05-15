import React from 'react'
import { useGrados } from '../../../api/grados/useGrados';
import DataTable from '../../../components/DataTable/DataTable';

const Grados = () => {
    const { data: grados } = useGrados();
    const columns = [
        { field: 'grado', header: 'Grado' },
        { field: 'abreviacion', header: 'Abreviación' },
    ];
    return (
        <DataTable
            data={grados} 
            columns={columns} 
        />
    )
}

export default Grados