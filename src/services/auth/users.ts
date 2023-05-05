import { JSONApiBase } from "@/api/utils/types";

export type User = {
  attributes: {
    authId: string;
    createdAt: number;
    email: string;
    name: string;
    updatedAt: number;
    userType: string;
  };
  relationships: {
    "auth/builders": {
      data: {
        type: string;
        id: string;
      };
    };
    "auth/roles": {
      data: {
        type: string;
        id: string;
      };
    };
  };
} & JSONApiBase;
