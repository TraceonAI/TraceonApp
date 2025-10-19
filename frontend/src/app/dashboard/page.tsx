'use client';

import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/DashboardLayout';

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold neon-text mb-2">Dashboard</h1>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Welcome to your AI SRE platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card-primary p-6">
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                System Status
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>All systems operational</p>
            </div>

            <div className="card-primary p-6">
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Active Incidents
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>0 incidents</p>
            </div>

            <div className="card-primary p-6">
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Uptime
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>99.97%</p>
            </div>

            <div className="card-primary p-6">
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Response Time
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>1.2ms</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
