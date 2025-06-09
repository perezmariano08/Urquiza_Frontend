import React, { useState } from 'react'
import { DataTableStyled } from './DataTableStyles'
import { Column } from 'primereact/column'

const DataTable = ({
    columns,
    paginator,
    rows,
    rowsPerPageOptions,
    value,
    loading,
    renderers,
    dataKey,
    selectable = false,
    onRowClick,
    selected,
    onSelectionChange,
    filters,
    globalFilterFields,
    filterDisplay
}) => {
    return (
        <DataTableStyled
            paginator={paginator}
            rows={rows}
            rowsPerPageOptions={rowsPerPageOptions}
            value={value}
            dataKey={dataKey}
            loading={loading}
            emptyMessage="No se encontraron datos."
            selectionMode={selectable ? null : undefined}
            selection={selectable ? selected : undefined}
            onSelectionChange={selectable ? (e) => onSelectionChange?.(e.value) : undefined}
            onRowClick={onRowClick}
            filters={filters}
            globalFilterFields={globalFilterFields} 
            filterDisplay={filterDisplay}
        >
            {selectable && (
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
            )}
            {columns.map((col) => (
                <Column 
                    key={col.field}
                    field={col.field}
                    header={col.header}
                    filter={col.filter}
                    style={col.style}
                    {...(renderers[col.field] && { body: renderers[col.field] })}
                />
            ))}
        </DataTableStyled>  
    )
}

export default DataTable