export type MarkdownItemT = {
  sys: {
    id: string;
  };
  createdAt: string;
  name: string;
  content: string;
};

export interface UserCollectionResponse {
  userCollection: {
    items: {
      sys: {
        id: string;
      };
      name: string;
      email: string;
      itemsCollection: {
        items: MarkdownItemT[];
      };
    }[];
  };
}

export type MarkdownMenuItem = {
  id: string;
  name: string;
  createdAt: string;
};
