export interface DedupeCampaigns {
  id: number;
  campaign_name: string;
  campaign_code: string;
  branch: string;
  leads:number;
  created_at:string;
}

const mockPeople: DedupeCampaigns[] = [
  { id: 1, campaign_name: 'John', campaign_code: 'Doe', branch: 'Software Engineer',leads:20000,created_at:"2025-12-09" },
  { id: 2, campaign_name: 'Mathew', campaign_code: 'Stevens', branch: 'Devops Engineer',leads:20000,created_at:"2025-12-09" },
  { id: 3, campaign_name: 'John', campaign_code: 'Doe', branch: 'Software Engineer',leads:20000,created_at:"2025-12-09" },
  { id: 4, campaign_name: 'John', campaign_code: 'Doe', branch: 'Software Engineer',leads:20000,created_at:"2025-12-09" },  
  { id: 5, campaign_name: 'John', campaign_code: 'Doe', branch: 'Software Engineer',leads:20000,created_at:"2025-12-09" },  
  { id: 6, campaign_name: 'John', campaign_code: 'Doe', branch: 'Software Engineer',leads:45000,created_at:"2025-12-09" },
  { id: 7, campaign_name: 'John', campaign_code: 'Doe', branch: 'Software Engineer',leads:35000,created_at:"2025-12-09" },
  { id: 8, campaign_name: 'John', campaign_code: 'Doe', branch: 'Software Engineer',leads:65000,created_at:"2025-12-09" },
  { id: 9, campaign_name: 'John', campaign_code: 'Doe', branch: 'Software Engineer',leads:70500,created_at:"2025-12-09" },
  { id: 10, campaign_name: 'John', campaign_code: 'Doe', branch: 'Software Engineer',leads:20000,created_at:"2025-12-09" },
  { id: 11, campaign_name: 'John', campaign_code: 'Doe', branch: 'Software Engineer',leads:20000,created_at:"2025-12-09" },
  { id: 12, campaign_name: 'John', campaign_code: 'Doe', branch: 'Software Engineer',leads:20000,created_at:"2025-12-09" },
  { id: 13, campaign_name: 'John', campaign_code: 'Doe', branch: 'Software Engineer',leads:20000,created_at:"2025-12-09" },
  { id: 14, campaign_name: 'John', campaign_code: 'Doe', branch: 'Software Engineer',leads:20000,created_at:"2025-12-09" },
  { id: 15, campaign_name: 'John', campaign_code: 'Doe', branch: 'Software Engineer',leads:20000,created_at:"2025-12-09" },
  { id: 16, campaign_name: 'John', campaign_code: 'Doe', branch: 'Software Engineer',leads:20000,created_at:"2025-12-09" },
  { id: 17, campaign_name: 'John', campaign_code: 'Doe', branch: 'Software Engineer',leads:20000,created_at:"2025-12-09" },
  { id: 18, campaign_name: 'John', campaign_code: 'Doe', branch: 'Software Engineer',leads:20000,created_at:"2025-12-09" },
  { id: 19, campaign_name: 'John', campaign_code: 'Doe', branch: 'Software Engineer',leads:20000,created_at:"2025-12-09" },
  { id: 20, campaign_name: 'John', campaign_code: 'Doe', branch: 'Software Engineer',leads:20000,created_at:"2025-12-09" },
  { id: 21, campaign_name: 'John', campaign_code: 'Doe', branch: 'Software Engineer',leads:20000,created_at:"2025-12-09" },

];

export const fetchDedupeCampaign = async (): Promise<DedupeCampaigns[]> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPeople);
    }, 800);
  })
}
