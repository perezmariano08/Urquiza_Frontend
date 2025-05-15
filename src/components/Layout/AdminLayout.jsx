import React, { useState } from 'react'
import { AdminLayoutContent, AdminLayoutContentHeader, AdminLayoutContentMain, AdminLayoutStyled } from './LayoutStyles'
import Aside from '../Aside/Aside'
import { HiBars3 } from "react-icons/hi2";

const AdminLayout = ({children}) => {
    const [isAsideOpen, setIsAsideOpen] = useState(true)

    const toggleAside = () => {
        setIsAsideOpen(prev => !prev)
    }

    return (
        <AdminLayoutStyled>
            <Aside isOpen={isAsideOpen} />
            <AdminLayoutContent>
                <AdminLayoutContentHeader>
                    <div className='bars'>
                        <HiBars3 onClick={() => setIsAsideOpen(prev => !prev)}/>
                    </div>
                                        
                </AdminLayoutContentHeader>
                <AdminLayoutContentMain>
                    {children}
                </AdminLayoutContentMain>
            </AdminLayoutContent>
        </AdminLayoutStyled>
        
    )
}

export default AdminLayout