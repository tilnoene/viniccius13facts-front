type Status = 'PENDING' | 'APPROVED' | 'DENIED';

type Fact = {
  id: string;
  status: Status;
  message: string;
  author: Author;
  created_at: string;
  updated_at?: string;
};
