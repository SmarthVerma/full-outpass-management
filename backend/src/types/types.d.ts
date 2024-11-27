// src/types.d.ts
import { User as PrismaUser } from "@prisma/client";

declare global {
    namespace Express {
        interface User extends PrismaUser {}
    }
}

declare module "graphql-passport/src/test/types" {
  // Extend or modify existing types in the module
  interface newContext {
    user: User; // Add the user field with your custom User type
  }
}
