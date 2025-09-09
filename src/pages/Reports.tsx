import React, { useState } from 'react';
import { 
  Download, 
  Calendar, 
  Filter, 
  BarChart3, 
  PieChart, 
  TrendingUp,
  FileText,
  DollarSign
} from 'lucide-react';

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState({
    start: '2025-01-01',
    end: '2025-01-31'
  });
  const [selectedReport, setSelectedReport] = useState('summary');
  const [department, setDepartment] = useState('all');

  // Mock data for reports
  const reportData = {
    summary: {
      totalRequisitions: 156,
      totalAmount: 12500000,
      approvedAmount: 8750000,
      pendingAmount: 2450000,
      rejectedAmount: 1300000,
      averageProcessingTime: 3.2
    },
    byDepartment: [
      { department: 'IT', count: 45, amount: 4500000, approved: 32, pending: 8, rejected: 5 },
      { department: 'Finance', count: 28, amount: 2800000, approved: 22, pending: 4, rejected: 2 },
      { department: 'HR', count: 35, amount: 1750000, approved: 28, pending: 5, rejected: 2 },
      { department: 'Operations', count: 25, amount: 2250000, approved: 18, pending: 4, rejected: 3 },
      { department: 'Marketing', count: 23, amount: 1200000, approved: 15, pending: 6, rejected: 2 }
    ],
    byStatus: [
      { status: 'Approved', count: 115, percentage: 73.7 },
      { status: 'Pending', count: 27, percentage: 17.3 },
      { status: 'Rejected', count: 14, percentage: 9.0 }
    ],
    monthlyTrend: [
      { month: 'Jan', requisitions: 156, amount: 12500000 },
      { month: 'Dec', requisitions: 142, amount: 11200000 },
      { month: 'Nov', requisitions: 138, amount: 10800000 },
      { month: 'Oct', requisitions: 125, amount: 9500000 }
    ]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const exportReport = (format: 'pdf' | 'excel') => {
    // This would typically generate and download the report
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Generate comprehensive reports on requisition activities</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button
            onClick={() => exportReport('excel')}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Excel
          </button>
          <button
            onClick={() => exportReport('pdf')}
            className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="summary">Summary Report</option>
              <option value="department">Department Analysis</option>
              <option value="status">Status Breakdown</option>
              <option value="trend">Monthly Trends</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Departments</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
              <option value="Operations">Operations</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Requisitions</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.summary.totalRequisitions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Amount</p>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(reportData.summary.totalAmount)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved Amount</p>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(reportData.summary.approvedAmount)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Processing Time</p>
              <p className="text-2xl font-bold text-gray-900">{reportData.summary.averageProcessingTime} days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Department Analysis */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Department Analysis</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Requisitions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Approved
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pending
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rejected
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Success Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportData.byDepartment.map((dept) => (
                <tr key={dept.department} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {dept.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dept.count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(dept.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                    {dept.approved}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 font-medium">
                    {dept.pending}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                    {dept.rejected}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {((dept.approved / dept.count) * 100).toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h3>
          <div className="space-y-4">
            {reportData.byStatus.map((status) => (
              <div key={status.status} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${
                    status.status === 'Approved' ? 'bg-green-500' :
                    status.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-900">{status.status}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{status.count}</span>
                  <span className="text-sm font-medium text-gray-900">({status.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
          <div className="space-y-4">
            {reportData.monthlyTrend.map((month) => (
              <div key={month.month} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{month.month} 2025</span>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{month.requisitions} requisitions</div>
                  <div className="text-sm text-gray-600">{formatCurrency(month.amount)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Reports */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Pending Approvals</p>
                <p className="text-sm text-gray-600">All requisitions awaiting approval</p>
              </div>
            </div>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Monthly Summary</p>
                <p className="text-sm text-gray-600">Current month performance</p>
              </div>
            </div>
          </button>

          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-purple-600" />
              <div>
                <p className="font-medium text-gray-900">Budget Analysis</p>
                <p className="text-sm text-gray-600">Department budget utilization</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;