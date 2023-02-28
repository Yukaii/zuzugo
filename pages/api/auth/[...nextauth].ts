import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";

import { prisma } from "@/lib/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [],
});
