import { mergeTypeDefs } from "@graphql-tools/merge";
// typeDefs 

import {userTypeDef} from "./user.typeDef.js";
import {outpassTypeDef} from "./outpass.typeDef.js";

const mergedTypeDefs = mergeTypeDefs([outpassTypeDef, userTypeDef])

export default mergedTypeDefs