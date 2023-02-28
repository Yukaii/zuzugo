import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
// eslint-disable-next-line import/no-unresolved
import { AdapterAccount } from "next-auth/adapters";
import SlackProvider from "next-auth/providers/slack";

import { config } from "@/lib/config";
import { prisma } from "@/lib/prisma";

const getSlackProvider = () => {
  if (!config.slackClientId || !config.slackClientSecret) {
    return null;
  }

  return SlackProvider({
    clientId: config.slackClientId,
    clientSecret: config.slackClientSecret,
    profile: (profile) => {
      if (!profile.email_verified) {
        throw new Error("Email not verified");
      }

      return {
        id: profile["https://slack.com/user_id"],
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      };
    },
    allowDangerousEmailAccountLinking: true,
  });
};

export default NextAuth({
  adapter: {
    ...PrismaAdapter(prisma),
    linkAccount: async (data: AdapterAccount) => {
      switch (data.provider) {
        case "slack": {
          const { ok, state, ...rest } = data;

          if (!ok) {
            throw new Error("Slack link account failed");
          }

          await prisma.account.create({
            data: rest,
          });

          break;
        }
        default:
          break;
      }
    },
  },
  providers: [getSlackProvider()].filter(Boolean),
  events: {
    linkAccount: async ({ account, user, profile }) => {
      console.log("linkAccount", account, user, profile);
    },
  },
  session: {
    strategy: "database",
  },
});
