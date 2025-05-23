export interface iListing {
  id: number;
  title: string;
  description: string;
  location: string;
  full_address: string;
  price: string;
  image: string | null;
  created_at: string;
  owner_email?: string;
  owner_id?: number;
  owner_profile?: {
    bio?: string;
    avatar?: string;
    phone?: string;
  };
}
