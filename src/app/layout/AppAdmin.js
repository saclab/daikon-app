import React from 'react'
import { observer } from "mobx-react-lite";
import { Route, Routes } from 'react-router-dom'
import MenuBarAdmin from './MenuBarAdmin/MenuBarAdmin'
import AppAdminUserManager from '../../screen-admin/AppAdminUserManager/AppAdminUserManager';

const AppAdmin = () => {
  return (
    <div className='flex flex-column'>
      <div className="block mb-2">
        <MenuBarAdmin />
      </div>
      <div className='flex ml-3 mr-3 fadein animation-duration-1000'>
        <Routes>
          <Route path={"user-manager/*"} element={<AppAdminUserManager />} />
        </Routes>
      </div>
    </div>
  )
}

export default observer(AppAdmin)