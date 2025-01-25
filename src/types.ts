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
      password?: string;
      name: string;
      email: string;
      itemsCollection: {
        items: MarkdownItemT[];
      };
    }[];
  };
}

export interface MarkdownCollectionResponse {
  markdownCollection: {
    items: MarkdownItemT[];
  };
}

export type MarkdownMenuItem = {
  id: string;
  name: string;
  createdAt: string;
};

export type FormTypes = {
  email: string;
  password: string;
  passwordConfirmation?: string;
  name: string;
};

export type UserT = {
  id: string;
  name: string;
  email: string;
};

export type DialogT = "" | "login" | "logout" | "deleteAction" | "saveAction";
