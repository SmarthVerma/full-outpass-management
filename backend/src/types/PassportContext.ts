import { User } from "@prisma/client"
import { PassportContext } from "graphql-passport"
import express, { Response } from 'express';


 interface Credentials {
  email: string
  password :string
}
 
 export type Context =  PassportContext<User, Credentials> & {res?: Response;}