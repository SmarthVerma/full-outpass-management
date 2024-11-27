import { mergeResolvers } from "@graphql-tools/merge";
import  userResolvers  from "./user.resolver.js";
import  outpassResolvers  from "./outpass.resolver.js";

const mergedResolvers = mergeResolvers([userResolvers, outpassResolvers]);

export default mergedResolvers;