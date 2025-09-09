import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import CreateRequisition from './pages/CreateRequisition';
import RequisitionList from './pages/RequisitionList';
import ApprovalQueue from './pages/ApprovalQueue';
import RequisitionDetails from './pages/RequisitionDetails';
import UserManagement from './pages/UserManagement';
import Reports from './pages/Reports';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="flex h-screen bg-gray-50">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header onMenuClick={() => setSidebarOpen(true)} />
              
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/create-requisition" element={<CreateRequisition />} />
                  <Route path="/requisitions" element={<RequisitionList />} />
                  <Route path="/requisition/:id" element={<RequisitionDetails />} />
                  <Route path="/approvals" element={<ApprovalQueue />} />
                  <Route path="/users" element={<UserManagement />} />
                  <Route path="/reports" element={<Reports />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;