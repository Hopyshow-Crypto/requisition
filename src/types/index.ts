export interface User {
  id: number;
  user_level: number;
  full_name: string;
  email: string;
  has_roles: string;
  status: string;
  department?: string;
}

export interface Staff {
  id: number;
  user_id: number;
  user_level: number;
  full_name: string;
  first_name: string;
  other_name: string;
  last_name: string;
  home_address: string;
  phone_no: string;
  cug_phone: string;
  other_email: string;
  email: string;
  sex: string;
  dob: string;
  state: string;
  qualification: string;
  date_of_employment: string;
  department: string;
  present_grade: string;
  last_promotion_date: string;
  hmo: string;
  pension_provider: string;
  rsa_no: string;
  bank_name: string;
  bank_acct_name: string;
  bank_acct_no: string;
  gross_salary: string;
  payee_tax: string;
  salary_deduction: string;
  pension_deduction: string;
  net_salary: string;
  next_of_kin: string;
  kin_phone_no: string;
  kin_home_address: string;
  level: string;
  update_status: string;
  last_updated: string;
  inputter_status: string;
}

export interface Requisition {
  id: number;
  reference_number: string;
  title: string;
  description: string;
  amount: number;
  currency: string;
  department: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'completed';
  created_by: number;
  created_at: string;
  updated_at: string;
  due_date?: string;
  attachments?: RequisitionAttachment[];
  approvals?: ApprovalStep[];
  current_approval_level: number;
  final_approval_level: number;
}

export interface RequisitionAttachment {
  id: number;
  requisition_id: number;
  filename: string;
  original_name: string;
  file_size: number;
  mime_type: string;
  uploaded_at: string;
  uploaded_by: number;
}

export interface ApprovalStep {
  id: number;
  requisition_id: number;
  approval_level: number;
  approver_id: number;
  approver_name: string;
  approver_title: string;
  status: 'pending' | 'approved' | 'rejected';
  comments?: string;
  approved_at?: string;
  created_at: string;
}

export interface ApprovalLevel {
  id: number;
  level: number;
  title: string;
  description: string;
  user_level_required: number;
  department_specific: boolean;
  is_final: boolean;
  order_sequence: number;
}

export interface Notification {
  id: number;
  user_id: number;
  type: 'requisition_pending' | 'requisition_approved' | 'requisition_rejected' | 'system';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  created_at: string;
}

export interface DashboardStats {
  total_requisitions: number;
  pending_approvals: number;
  approved_today: number;
  total_amount_pending: number;
  my_requisitions: number;
  rejected_requisitions: number;
}