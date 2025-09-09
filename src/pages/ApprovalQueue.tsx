import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, XCircle, Eye, MessageSquare } from 'lucide-react';
import { Requisition } from '../types';

const ApprovalQueue: React.FC = () => {
  const [filter, setFilter] = useState('pending');

  // Mock data for requisitions pending approval
  const pendingRequisitions: Requisition[] = [
    {
      id: 1,
      reference_number: 'REQ-2025-001',
      title: 'Office Equipment Purchase',
      description: 'Purchase of new computers and office furniture for the IT department',
      amount: 150000,
      currency: 'NGN',
      department: 'IT',
      category: 'Equipment',
      priority: 'medium',
      status: 'pending',
      created_by: 2,
      created_at: '2025-01-08T10:30:00Z',
      updated_at: '2025-01-08T10:30:00Z',
      current_approval_level: 1,
      final_approval_level: 3
    },
    {
      id: 4,
      reference_number: 'REQ-2025-004',
      title: 'Marketing Campaign Budget',
      description: 'Budget allocation for Q1 marketing campaigns',
      amount: 500000,
      currency: 'NGN',
      department: 'Marketing',
      category: 'Professional Services',
      priority: 'high',
      status: 'pending',
      created_by: 3,
      created_at: '2025-01-08T14:20:00Z',
      updated_at: '2025-01-08T14:20:00Z',
      current_approval_level: 2,
      final_approval_level: 4
    },
    {
      id: 5,
      reference_number: 'REQ-2025-005',
      title: 'Software License Renewal',
      description: 'Annual renewal of Microsoft Office licenses',
      amount: 75000,
      currency: 'NGN',
      department: 'IT',
      category: 'Software/Licenses',
      priority: 'urgent',
      status: 'pending',
      created_by: 4,
      created_at: '2025-01-08T16:45:00Z',
      updated_at: '2025-01-08T16:45:00Z',
      current_approval_level: 1,
      final_approval_level: 3
    }
  ];

  const [selectedRequisition, setSelectedRequisition] = useState<Requisition | null>(null);
  const [approvalComment, setApprovalComment] = useState('');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject'>('approve');

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleApprovalAction = (requisition: Requisition, action: 'approve' | 'reject') => {
    setSelectedRequisition(requisition);
    setApprovalAction(action);
    setShowApprovalModal(true);
  };

  const submitApproval = () => {
    if (!selectedRequisition) return;

    // Here you would send the approval/rejection to your PHP backend
    console.log('Approval action:', {
      requisition_id: selectedRequisition.id,
      action: approvalAction,
      comment: approvalComment
    });

    // Close modal and reset state
    setShowApprovalModal(false);
    setSelectedRequisition(null);
    setApprovalComment('');
    
    // Show success message
    alert(`Requisition ${approvalAction === 'approve' ? 'approved' : 'rejected'} successfully`);
  };

  const getApprovalLevelText = (current: number, final: number) => {
    return `Level ${current} of ${final}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pending Approvals</h1>
          <p className="text-gray-600 mt-1">Review and approve payment requisitions</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {pendingRequisitions.length} requisitions pending
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pendingRequisitions.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Clock className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Urgent</p>
              <p className="text-2xl font-bold text-gray-900">
                {pendingRequisitions.filter(r => r.priority === 'urgent').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Approved Today</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <XCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-lg font-bold text-gray-900">
                {formatCurrency(
                  pendingRequisitions.reduce((sum, req) => sum + req.amount, 0),
                  'NGN'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Requisitions List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Requisitions Awaiting Your Approval</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {pendingRequisitions.map((requisition) => (
            <div key={requisition.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Link
                      to={`/requisition/${requisition.id}`}
                      className="text-lg font-semibold text-blue-600 hover:text-blue-800"
                    >
                      {requisition.reference_number}
                    </Link>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getPriorityColor(requisition.priority)}`}>
                      {requisition.priority}
                    </span>
                    <span className="text-sm text-gray-500">
                      {getApprovalLevelText(requisition.current_approval_level, requisition.final_approval_level)}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {requisition.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {requisition.description}
                  </p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>Department: <span className="font-medium">{requisition.department}</span></span>
                    <span>Category: <span className="font-medium">{requisition.category}</span></span>
                    <span>Amount: <span className="font-medium text-gray-900">
                      {formatCurrency(requisition.amount, requisition.currency)}
                    </span></span>
                    <span>Submitted: <span className="font-medium">
                      {new Date(requisition.created_at).toLocaleDateString()}
                    </span></span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 ml-6">
                  <Link
                    to={`/requisition/${requisition.id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Link>
                  
                  <button
                    onClick={() => handleApprovalAction(requisition, 'approve')}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </button>
                  
                  <button
                    onClick={() => handleApprovalAction(requisition, 'reject')}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {pendingRequisitions.length === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium text-gray-900">All caught up!</p>
            <p className="text-sm text-gray-500">No requisitions pending your approval</p>
          </div>
        )}
      </div>

      {/* Approval Modal */}
      {showApprovalModal && selectedRequisition && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {approvalAction === 'approve' ? 'Approve' : 'Reject'} Requisition
              </h3>
            </div>
            
            <div className="px-6 py-4">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Reference:</strong> {selectedRequisition.reference_number}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Title:</strong> {selectedRequisition.title}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Amount:</strong> {formatCurrency(selectedRequisition.amount, selectedRequisition.currency)}
                </p>
              </div>
              
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Comments {approvalAction === 'reject' && <span className="text-red-500">*</span>}
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  value={approvalComment}
                  onChange={(e) => setApprovalComment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Add your ${approvalAction === 'approve' ? 'approval' : 'rejection'} comments...`}
                  required={approvalAction === 'reject'}
                />
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowApprovalModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submitApproval}
                disabled={approvalAction === 'reject' && !approvalComment.trim()}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 disabled:opacity-50 ${
                  approvalAction === 'approve'
                    ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                    : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                }`}
              >
                {approvalAction === 'approve' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalQueue;