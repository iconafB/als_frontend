
export interface DMARecords {
  id: number;
  audit_id: string;
  number_of_records: string;
  notification_email: string;
  is_processed:boolean;
  created_at:string;
}

const mockDMA: DMARecords[] = [
  { id: 1, audit_id: 'John', number_of_records: 'Doe', notification_email: 'Software Engineer',is_processed:true,created_at:'2025-11-24' },
  { id: 2, audit_id:'Gerald You Dog',number_of_records: 'Smith', notification_email: 'Product Manager',is_processed:true,created_at:'2025-11-24' },
  { id: 3, audit_id: 'Michael Blackson',number_of_records: 'Johnson', notification_email: 'UX Designer',is_processed:true,created_at:'2025-11-24' },
  { id: 4, audit_id: 'Emily', number_of_records: 'Brown', notification_email: 'Data Scientist',is_processed:true,created_at:'2025-11-24' },
  { id: 5, audit_id: 'David', number_of_records: 'Wilson', notification_email: 'DevOps Engineer' ,is_processed:true,created_at:'2025-11-24'},
  { id: 6, audit_id: 'Sarah', number_of_records: 'Davis', notification_email: 'Marketing Manager',is_processed:true,created_at:'2025-11-24' },
  { id: 7, audit_id: 'Robert', number_of_records: 'Miller', notification_email: 'Sales Executive',is_processed:true,created_at:'2025-11-24' },
  { id: 8, audit_id: 'Lisa', number_of_records: 'Garcia', notification_email: 'HR Specialist',is_processed:true,created_at:'2025-11-24' },
  { id: 9, audit_id: 'James', number_of_records: 'Martinez', notification_email: 'Financial Analyst',is_processed:true,created_at:'2025-11-24'},
  { id: 10, audit_id: 'Maria', number_of_records: 'Lopez', notification_email: 'Graphic Designer',is_processed:true,created_at:'2025-11-24' },
  { id: 11, audit_id: 'Christopher', number_of_records: 'Anderson', notification_email: 'Project Manager',is_processed:true,created_at:'2025-11-24' },
  { id: 12, audit_id: 'Jennifer', number_of_records: 'Taylor', notification_email: 'Content Writer',is_processed:true,created_at:'2025-11-24' },
  { id: 13, audit_id: 'Daniel', number_of_records: 'Thomas', notification_email: 'Systems Analyst' ,is_processed:true,created_at:'2025-11-24'},
  { id: 14, audit_id: 'Amanda', number_of_records: 'White', notification_email: 'Business Analyst',is_processed:false,created_at:'2025-11-24' },
  { id: 15, audit_id: 'Matthew', number_of_records: 'Harris', notification_email: 'Web Developer' ,is_processed:false,created_at:'2025-11-24'},
  { id: 16, audit_id: 'Jennifer', number_of_records: 'Taylor', notification_email: 'Content Writer' ,is_processed:false,created_at:'2025-11-24'},
  { id: 17, audit_id: 'Daniel', number_of_records: 'Thomas', notification_email: 'Systems Analyst',is_processed:false,created_at:'2025-11-24' },
  { id: 18, audit_id: 'Amanda', number_of_records: 'White', notification_email: 'Business Analyst',is_processed:false,created_at:'2025-11-24' },
  { id: 19, audit_id: 'Matthew', number_of_records: 'Harris', notification_email: 'Web Developer' ,is_processed:false,created_at:'2025-11-24'},
  { id: 20, audit_id: 'Jennifer', number_of_records: 'Taylor', notification_email: 'Content Writer',is_processed:false,created_at:'2025-11-24' },
  { id: 21, audit_id: 'Daniel', number_of_records: 'Thomas', notification_email: 'Systems Analyst',is_processed:false,created_at:'2025-11-24' },
  { id: 22, audit_id: 'Amanda', number_of_records: 'White', notification_email: 'Business Analyst',is_processed:false,created_at:'2025-11-24' },
  { id: 23, audit_id: 'Matthew', number_of_records: 'Harris', notification_email: 'Web Developer' ,is_processed:false,created_at:'2025-11-24'},
  { id: 24, audit_id: 'Jennifer', number_of_records: 'Taylor', notification_email: 'Content Writer' ,is_processed:false,created_at:'2025-11-24'},
  { id: 25, audit_id: 'Daniel', number_of_records: 'Thomas', notification_email: 'Systems Analyst',is_processed:false,created_at:'2025-11-24' },
  { id: 26, audit_id: 'Amanda', number_of_records: 'White', notification_email: 'Business Analyst' ,is_processed:false,created_at:'2025-11-24'},
  { id: 27, audit_id: 'Matthew', number_of_records: 'Harris', notification_email: 'Web Developer',is_processed:false,created_at:'2025-11-24' },
];


export const fetchMockDMA = async (): Promise<DMARecords[]> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDMA);
    }, 800);
  });
};

