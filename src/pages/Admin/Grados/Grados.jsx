import React from 'react'
import { useGrados } from '../../../api/grados/useGrados';
import DataTable from '../../../components/DataTable/DataTable';
import { GradosMain } from './GradosStyles';

const Grados = () => {
    const { data: grados } = useGrados();
    const columns = [
        { field: 'grado', header: 'Grado' },
        { field: 'abreviacion', header: 'Abreviación' },
    ];
    return (
        <GradosMain>
            <DataTable
                data={grados} 
                columns={columns} 
            />
        </GradosMain>
        
    )
}

export default Grados