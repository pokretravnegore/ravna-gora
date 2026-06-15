export type Issue = {
  id: string;
  issue_number: number;
  issue_date: string;
  slug: string;
  cover_image_url: string | null;
  pdf_object_key: string;
  title: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};
