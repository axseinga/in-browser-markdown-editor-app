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
    }[];
  };
}

export interface MarkdownVersionByIdQueryResponse {
  markdownCollection: {
    items: {
      sys: {
        id: string;
        version: number;
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

export enum DialogIdEnum {
  LOGIN_ACTION = "login",
  LOGOUT_ACTION = "logout",
  DELETE_ACTION = "deleteAction",
  SAVE_ACTION = "saveAction",
  CLOSED = "",
}

export type DialogT = "" | "login" | "logout" | "deleteAction" | "saveAction";
