// =============================================
// UKM Proker Registration Portal — Type Definitions
// =============================================

export type ProkerStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
export type RegistrationStatus = 'pending' | 'accepted' | 'rejected' | 'waitlist';
export type CertificateStatus = 'not_generated' | 'generated' | 'downloaded';

export interface UKM {
  id: string;
  name: string;
  logo_url: string | null;
  created_at: string;
}

export interface Proker {
  id: string;
  ukm_id: string;
  title: string;
  slug: string;
  description: string | null;
  banner_url: string | null;
  start_date: string | null;
  end_date: string | null;
  registration_open: string | null;
  registration_close: string | null;
  status: ProkerStatus;
  documentation: DocumentationItem[];
  benefits: string | null;
  created_at: string;
  updated_at: string;
  divisions?: Division[];
  location?: string | null;
}

export interface DocumentationItem {
  url: string;
  caption: string;
}

export interface Division {
  id: string;
  proker_id: string;
  name: string;
  description: string | null;
  tasks: string[];
  quota: number;
  filled_quota: number;
  requirements: string | null;
  display_order: number;
  created_at: string;
}

export interface Applicant {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  institution: string | null;
  created_at: string;
}

export interface Registration {
  id: string;
  applicant_id: string;
  proker_id: string;
  division_id: string;
  status: RegistrationStatus;
  motivation: string | null;
  admin_notes: string | null;
  registered_at: string;
  reviewed_at: string | null;
  // Joined fields
  applicant?: Applicant;
  proker?: Proker;
  division?: Division;
}

export interface Certificate {
  id: string;
  registration_id: string;
  certificate_code: string;
  template_url: string | null;
  file_url: string | null;
  issued_at: string;
  downloaded_at: string | null;
  metadata: Record<string, unknown> | null;
}

// Form types
export interface RegistrationFormData {
  division_id: string;
  full_name: string;
  nim: string;
  phone: string;
  general_motivation?: string;
  organization_experience?: string;
  motivation?: string;
  mc_experience?: string;
}

export interface StatusSearchResult {
  id: string;
  full_name: string;
  phone_masked: string;
  proker_title: string;
  division_name: string;
  status: RegistrationStatus;
  registered_at: string;
  proker_status: ProkerStatus;
  certificate_code?: string;
  nim?: string;
  program_studi?: string;
  angkatan?: string;
  email?: string;
  phone?: string;
  motivation?: string;
  experience?: string;
}
