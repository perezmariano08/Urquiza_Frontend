import React, { useState } from 'react'
import { AdminLayoutContent, AdminLayoutContentHeader, AdminLayoutContentHeaderUser, AdminLayoutContentMain, AdminLayoutStyled } from './LayoutStyles'
import Aside from '../Aside/Aside'
import { HiBars3 } from "react-icons/hi2";

const AdminLayout = ({children, user}) => {
    const [isAsideOpen, setIsAsideOpen] = useState(true)

    const toggleAside = () => {
        setIsAsideOpen(prev => !prev)
    }

    return (
        <AdminLayoutStyled>
            <Aside isOpen={isAsideOpen} user={user} />
            <AdminLayoutContent>
                <AdminLayoutContentHeader>
                    <div className='bars'>
                        <HiBars3 onClick={() => setIsAsideOpen(prev => !prev)}/>
                    </div>
                    <AdminLayoutContentHeaderUser>
                        <p>Bienvenido/a {user?.nombre}</p>
                    </AdminLayoutContentHeaderUser>
                </AdminLayoutContentHeader>
                <AdminLayoutContentMain>
                    {children}
                </AdminLayoutContentMain>
            </AdminLayoutContent>
        </AdminLayoutStyled>
        
    )
}

export default AdminLayout