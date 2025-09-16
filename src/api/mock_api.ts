export interface Person {
  id: number;
  name: string;
  secondName: string;
  profession: string;
}

const mockPeople: Person[] = [
  { id: 1, name: 'John', secondName: 'Doe', profession: 'Software Engineer' },
  { id: 2, name: 'Jane', secondName: 'Smith', profession: 'Product Manager' },
  { id: 3, name: 'Michael', secondName: 'Johnson', profession: 'UX Designer' },
  { id: 4, name: 'Emily', secondName: 'Brown', profession: 'Data Scientist' },
  { id: 5, name: 'David', secondName: 'Wilson', profession: 'DevOps Engineer' },
  { id: 6, name: 'Sarah', secondName: 'Davis', profession: 'Marketing Manager' },
  { id: 7, name: 'Robert', secondName: 'Miller', profession: 'Sales Executive' },
  { id: 8, name: 'Lisa', secondName: 'Garcia', profession: 'HR Specialist' },
  { id: 9, name: 'James', secondName: 'Martinez', profession: 'Financial Analyst' },
  { id: 10, name: 'Maria', secondName: 'Lopez', profession: 'Graphic Designer' },
  { id: 11, name: 'Christopher', secondName: 'Anderson', profession: 'Project Manager' },
  { id: 12, name: 'Jennifer', secondName: 'Taylor', profession: 'Content Writer' },
  { id: 13, name: 'Daniel', secondName: 'Thomas', profession: 'Systems Analyst' },
  { id: 14, name: 'Amanda', secondName: 'White', profession: 'Business Analyst' },
  { id: 15, name: 'Matthew', secondName: 'Harris', profession: 'Web Developer' },
  { id: 16, name: 'Jennifer', secondName: 'Taylor', profession: 'Content Writer' },
  { id: 17, name: 'Daniel', secondName: 'Thomas', profession: 'Systems Analyst' },
  { id: 18, name: 'Amanda', secondName: 'White', profession: 'Business Analyst' },
  { id: 19, name: 'Matthew', secondName: 'Harris', profession: 'Web Developer' },
  { id: 20, name: 'Jennifer', secondName: 'Taylor', profession: 'Content Writer' },
  { id: 21, name: 'Daniel', secondName: 'Thomas', profession: 'Systems Analyst' },
  { id: 22, name: 'Amanda', secondName: 'White', profession: 'Business Analyst' },
  { id: 23, name: 'Matthew', secondName: 'Harris', profession: 'Web Developer' },
  { id: 24, name: 'Jennifer', secondName: 'Taylor', profession: 'Content Writer' },
  { id: 25, name: 'Daniel', secondName: 'Thomas', profession: 'Systems Analyst' },
  { id: 26, name: 'Amanda', secondName: 'White', profession: 'Business Analyst' },
  { id: 27, name: 'Matthew', secondName: 'Harris', profession: 'Web Developer' },
];

export const fetchPeople = async (): Promise<Person[]> => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPeople);
    }, 800);
  });
};
