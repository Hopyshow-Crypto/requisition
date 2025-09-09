import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  FileText, 
  Calendar, 
  DollarSign, 
  Building, 
  Tag, 
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  MessageSquare
} from 'lucide-react';
import { Requisition, ApprovalStep } from '../types';

const RequisitionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data - this would come from your PHP API
  const requisition: Requisition = {
    id: 1,
    reference_number: 'REQ-2025-001',
    title: 'Office Equipment Purchase',
    description: 'Purchase of new computers and office furniture for the IT department to support the growing team and improve productivity.',
    amount: 150000,
    currency: 'NGN',
    department: 'IT',
    category: 'Equipment',
    priority: 'medium',
    status: 'pending',
    created_by: 1,
    created_at: '2025-01-08T10:30:00Z',
    updated_at: '2025-01-08T10:30:00Z',
    due_date: '2025-01-15T00:00:00Z',
    current_approval_level: 2,
    final_approval_level: 3
  };

  const approvalSteps: ApprovalStep[] = [
    {
      id: 1,
      requisition_id: 1,
      approval_level: 1,
      approver_id: 2,
      approver_name: 'Jane Smith',
      approver_title: 'Department Head - IT',
      status: 'approved',
      comments: 'Equipment is necessary for the new team members. Approved.',
      approved_at: '2025-01-08T14:20:00Z',
      created_at: '2025-01-08T10:30:00Z'
    },
    {
      id: 2,
      requisition_id: 1,
      approval_level: 2,
      approver_id: 3,
      approver_name: 'Michael Johnson',
      approver_title: 'Finance Manager',
      status: 'pending',
      created_at: '2025-01-08T14:20:00Z'
    },
    {
      id: 3,
      requisition_id: 1,
      approval_level: 3,
      approver_id: 4,
      approver_name: 'Sarah Williams',
      approver_title: 'Chief Executive',
      status: 'pending',
      created_at: '2025-01-08T14:20:00Z'
    }
  ];

  const attachments = [
    {
      id: 1,
      filename: 'equipment_quotation.pdf',
      original_name: 'Equipment Quotation.pdf',
      file_size: 245760,
      mime_type: 'application/pdf'
    },
    {
      id: 2,
      filename: 'budget_breakdown.xlsx',
      original_name: 'Budget Breakdown.xlsx',
      file_size: 89432,
      mime_type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }
  ];

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      case 'low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getApprovalIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/requisitions"
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{requisition.reference_number}</h1>
            <p className="text-gray-600">{requisition.title}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </button>
        </div>
      </div>

      {/* Status and Priority */}
      <div className="flex items-center space-x-4">
        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(requisition.status)}`}>
          {requisition.status.charAt(0).toUpperCase() + requisition.status.slice(1)}
        </span>
        <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getPriorityColor(requisition.priority)}`}>
          {requisition.priority.charAt(0).toUpperCase() + requisition.priority.slice(1)} Priority
        </span>
        <span className="text-sm text-gray-500">
          Approval Level {requisition.current_approval_level} of {requisition.final_approval_level}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Requisition Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Requisition Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center space-x-3">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(requisition.amount, requisition.currency)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Building className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="font-medium text-gray-900">{requisition.department}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Tag className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-medium text-gray-900">{requisition.category}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Due Date</p>
                  <p className="font-medium text-gray-900">
                    {requisition.due_date ? new Date(requisition.due_date).toLocaleDateString() : 'Not specified'}
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{requisition.description}</p>
            </div>
          </div>

          {/* Attachments */}
          {attachments.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h2>
              <div className="space-y-3">
                {attachments.map((attachment) => (
                  <div key={attachment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{attachment.original_name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(attachment.file_size)}</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Approval History */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Approval Workflow</h2>
            <div className="space-y-4">
              {approvalSteps.map((step, index) => (
                <div key={step.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getApprovalIcon(step.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Level {step.approval_level}: {step.approver_name}
                        </p>
                        <p className="text-xs text-gray-500">{step.approver_title}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(step.status)}`}>
                          {step.status}
                        </span>
                        {step.approved_at && (
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(step.approved_at).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                    {step.comments && (
                      <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5" />
                          <p className="text-sm text-gray-700">{step.comments}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Created</p>
                <p className="font-medium text-gray-900">
                  {new Date(requisition.created_at).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="font-medium text-gray-900">
                  {new Date(requisition.updated_at).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Progress</p>
                <div className="mt-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Level {requisition.current_approval_level} of {requisition.final_approval_level}</span>
                    <span>{Math.round((requisition.current_approval_level / requisition.final_approval_level) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(requisition.current_approval_level / requisition.final_approval_level) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Send Reminder
              </button>
              <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Add Comment
              </button>
              <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                View History
              </button>
            </div>
          </div>

          {/* Related */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Similar requisitions</p>
                <p className="text-blue-600 hover:text-blue-800 cursor-pointer">REQ-2025-002</p>
              </div>
              <div>
                <p className="text-gray-600">Department budget</p>
                <p className="text-blue-600 hover:text-blue-800 cursor-pointer">View IT Budget</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequisitionDetails;