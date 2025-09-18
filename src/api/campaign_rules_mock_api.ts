export interface CampaignRules {
  id: number;
  rule_code: string;
  camp_code: string;
  min_salary: number;
  max_salary:number;
  min_age:number;
  max_age:number;
  gender:string;
  city:string;
  province:string;
  created_at:string;
}

const mockRules: CampaignRules[] = [
{ id: 1, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Pretoria',province:'Gauteng',created_at:'2025-11-24' },
{ id: 2, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
{ id: 3, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 4, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 5, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 6, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 7, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 8, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 9, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 10, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 11, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 12, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 13, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 14, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 15, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 16, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 17, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 18, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 20, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 21, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 22, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 23, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 24, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 25, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 26, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 27, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 28, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 29, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 30, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 31, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 32, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 33, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 34, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 35, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 36, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 46, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 47, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 48, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 49, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 50, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 51, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 52, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 53, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 54, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 55, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 56, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 57, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 58, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 59, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 60, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 61, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 62, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 63, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 64, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },
 { id: 65, rule_code: 'John', camp_code: 'Doe', min_salary: 1200,max_salary:340000,min_age:20,max_age:34,gender:'MALE',city:'Durban',province:'KwaZulu-Natal',created_at:'2025-11-24' },

];

export const fetchMockRules = async (): Promise<CampaignRules[]> => {
  
    // Simulate API delay

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRules);
    }, 800);
  });
};
