
export interface DMARecords {
  id: number;
  audit_id: string;
  number_of_records: string;
  notification_email: string;
  is_processed:string;
  created_at:string;
}

const mockDMA: DMARecords[] = [
  { id: 1, audit_id: 'John', number_of_records: 'Doe', notification_email: 'Software Engineer',is_processed:'Download Ready',created_at:'2025-11-24' },
  { id: 2, audit_id:'Gerald The Great',number_of_records: 'Smith', notification_email: 'Product Manager',is_processed:'Download Ready',created_at:'2025-11-24' },
  { id: 3, audit_id: 'Michael Blackson',number_of_records: 'Johnson', notification_email: 'UX Designer',is_processed:'Download Ready',created_at:'2025-11-24' },
  { id: 4, audit_id: 'Emily', number_of_records: 'Brown', notification_email: 'Data Scientist',is_processed:'Download Ready',created_at:'2025-11-24' },
  { id: 5, audit_id: 'David', number_of_records: 'Wilson', notification_email: 'DevOps Engineer' ,is_processed:'Download Ready',created_at:'2025-11-24'},
  { id: 6, audit_id: 'Sarah', number_of_records: 'Davis', notification_email: 'Marketing Manager',is_processed:'Download Ready',created_at:'2025-11-24' },
  { id: 7, audit_id: 'Robert', number_of_records: 'Miller', notification_email: 'Sales Executive',is_processed:'Download Ready',created_at:'2025-11-24' },
  { id: 8, audit_id: 'Lisa', number_of_records: 'Garcia', notification_email: 'HR Specialist',is_processed:'Download Ready',created_at:'2025-11-24' },
  { id: 9, audit_id: 'James', number_of_records: 'Martinez', notification_email: 'Financial Analyst',is_processed:'Download Ready',created_at:'2025-11-24'},
  { id: 10, audit_id: 'Maria', number_of_records: 'Lopez', notification_email: 'Graphic Designer',is_processed:'Download Ready',created_at:'2025-11-24' },
  { id: 11, audit_id: 'Christopher', number_of_records: 'Anderson', notification_email: 'Project Manager',is_processed:'Download Ready',created_at:'2025-11-24' },
  { id: 12, audit_id: 'Jennifer', number_of_records: 'Taylor', notification_email: 'Content Writer',is_processed:'Download Ready',created_at:'2025-11-24' },
  { id: 13, audit_id: 'Daniel', number_of_records: 'Thomas', notification_email: 'Systems Analyst' ,is_processed:'Download Ready',created_at:'2025-11-24'},
  { id: 14, audit_id: 'Amanda', number_of_records: 'White', notification_email: 'Business Analyst',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 15, audit_id: 'Matthew', number_of_records: 'Harris', notification_email: 'Web Developer' ,is_processed:'Download Not Ready',created_at:'2025-11-24'},
  { id: 16, audit_id: 'Jennifer', number_of_records: 'Taylor', notification_email: 'Content Writer' ,is_processed:'Download Not Ready',created_at:'2025-11-24'},
  { id: 17, audit_id: 'Daniel', number_of_records: 'Thomas', notification_email: 'Systems Analyst',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 18, audit_id: 'Amanda', number_of_records: 'White', notification_email: 'Business Analyst',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 19, audit_id: 'Matthew', number_of_records: 'Harris', notification_email: 'Web Developer' ,is_processed:'Download Not Ready',created_at:'2025-11-24'},
  { id: 20, audit_id: 'Jennifer', number_of_records: 'Taylor', notification_email: 'Content Writer',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 21, audit_id: 'Daniel', number_of_records: 'Thomas', notification_email: 'Systems Analyst',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 22, audit_id: 'Amanda', number_of_records: 'White', notification_email: 'Business Analyst',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 23, audit_id: 'Matthew', number_of_records: 'Harris', notification_email: 'Web Developer' ,is_processed:'Download Not Ready',created_at:'2025-11-24'},
  { id: 24, audit_id: 'Jennifer', number_of_records: 'Taylor', notification_email: 'Content Writer' ,is_processed:'Download Not Ready',created_at:'2025-11-24'},
  { id: 25, audit_id: 'Daniel', number_of_records: 'Thomas', notification_email: 'Systems Analyst',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 26, audit_id: 'Amanda', number_of_records: 'White', notification_email: 'Business Analyst' ,is_processed:'Download Not Ready',created_at:'2025-11-24'},
  { id: 27, audit_id: 'Matthew', number_of_records: 'Harris', notification_email: 'Web Developer',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 28, audit_id: 'James', number_of_records: 'Martinez', notification_email: 'Financial Analyst',is_processed:'Download Ready',created_at:'2025-11-24'},
  { id: 29, audit_id: 'Maria', number_of_records: 'Lopez', notification_email: 'Graphic Designer',is_processed:'Download Ready',created_at:'2025-11-24' },
  { id: 30, audit_id: 'Christopher', number_of_records: 'Anderson', notification_email: 'Project Manager',is_processed:'Download Ready',created_at:'2025-11-24' },
  { id: 32, audit_id: 'Jennifer', number_of_records: 'Taylor', notification_email: 'Content Writer',is_processed:'Download Ready',created_at:'2025-11-24' },
  { id: 33, audit_id: 'Daniel', number_of_records: 'Thomas', notification_email: 'Systems Analyst' ,is_processed:'Download Ready',created_at:'2025-11-24'},
  { id: 34, audit_id: 'Amanda', number_of_records: 'White', notification_email: 'Business Analyst',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 35, audit_id: 'Matthew', number_of_records: 'Harris', notification_email: 'Web Developer' ,is_processed:'Download Not Ready',created_at:'2025-11-24'},
  { id: 36, audit_id: 'Jennifer', number_of_records: 'Taylor', notification_email: 'Content Writer' ,is_processed:'Download Not Ready',created_at:'2025-11-24'},
  { id: 37, audit_id: 'Daniel', number_of_records: 'Thomas', notification_email: 'Systems Analyst',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 38, audit_id: 'Amanda', number_of_records: 'White', notification_email: 'Business Analyst',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 39, audit_id: 'Matthew', number_of_records: 'Harris', notification_email: 'Web Developer' ,is_processed:'Download Not Ready',created_at:'2025-11-24'},
  { id: 20, audit_id: 'Jennifer', number_of_records: 'Taylor', notification_email: 'Content Writer',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 41, audit_id: 'Daniel', number_of_records: 'Thomas', notification_email: 'Systems Analyst',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 42, audit_id: 'Amanda', number_of_records: 'White', notification_email: 'Business Analyst',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 43, audit_id: 'Matthew', number_of_records: 'Harris', notification_email: 'Web Developer' ,is_processed:'Download Not Ready',created_at:'2025-11-24'},
  { id: 44, audit_id: 'Jennifer', number_of_records: 'Taylor', notification_email: 'Content Writer' ,is_processed:'Download Not Ready',created_at:'2025-11-24'},
  { id: 45, audit_id: 'Daniel', number_of_records: 'Thomas', notification_email: 'Systems Analyst',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 46, audit_id: 'Amanda', number_of_records: 'White', notification_email: 'Business Analyst' ,is_processed:'Download Not Ready',created_at:'2025-11-24'},
  { id: 47, audit_id: 'Matthew', number_of_records: 'Harris', notification_email: 'Web Developer',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 50, audit_id: 'Maria', number_of_records: 'Lopez', notification_email: 'Graphic Designer',is_processed:'Download Ready',created_at:'2025-11-24' },
  { id: 51, audit_id: 'Christopher', number_of_records: 'Anderson', notification_email: 'Project Manager',is_processed:'Download Ready',created_at:'2025-11-24' },
  { id: 52, audit_id: 'Jennifer', number_of_records: 'Taylor', notification_email: 'Content Writer',is_processed:'Download Ready',created_at:'2025-11-24' },
  { id: 53, audit_id: 'Daniel', number_of_records: 'Thomas', notification_email: 'Systems Analyst' ,is_processed:'Download Ready',created_at:'2025-11-24'},
  { id: 54, audit_id: 'Amanda', number_of_records: 'White', notification_email: 'Business Analyst',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 55, audit_id: 'Matthew', number_of_records: 'Harris', notification_email: 'Web Developer' ,is_processed:'Download Not Ready',created_at:'2025-11-24'},
  { id: 56, audit_id: 'Jennifer', number_of_records: 'Taylor', notification_email: 'Content Writer' ,is_processed:'Download Not Ready',created_at:'2025-11-24'},
  { id: 57, audit_id: 'Daniel', number_of_records: 'Thomas', notification_email: 'Systems Analyst',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 58, audit_id: 'Amanda', number_of_records: 'White', notification_email: 'Business Analyst',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 59, audit_id: 'Matthew', number_of_records: 'Harris', notification_email: 'Web Developer' ,is_processed:'Download Not Ready',created_at:'2025-11-24'},
  { id: 60, audit_id: 'Jennifer', number_of_records: 'Taylor', notification_email: 'Content Writer',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 61, audit_id: 'Daniel', number_of_records: 'Thomas', notification_email: 'Systems Analyst',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 62, audit_id: 'Amanda', number_of_records: 'White', notification_email: 'Business Analyst',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 63, audit_id: 'Matthew', number_of_records: 'Harris', notification_email: 'Web Developer' ,is_processed:'Download Not Ready',created_at:'2025-11-24'},
  { id: 64, audit_id: 'Jennifer', number_of_records: 'Taylor', notification_email: 'Content Writer' ,is_processed:'Download Not Ready',created_at:'2025-11-24'},
  { id: 65, audit_id: 'Daniel', number_of_records: 'Thomas', notification_email: 'Systems Analyst',is_processed:'Download Not Ready',created_at:'2025-11-24' },
  { id: 66, audit_id: 'Amanda', number_of_records: 'White', notification_email: 'Business Analyst' ,is_processed:'Download Not Ready',created_at:'2025-11-24'},
  { id: 67, audit_id: 'Matthew', number_of_records: 'Harris', notification_email: 'Web Developer',is_processed:'Download Not Ready',created_at:'2025-11-24' },
];

export const fetchMockDMA = async (): Promise<DMARecords[]> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDMA);
    }, 800);
  });
};



