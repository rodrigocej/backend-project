import { Request, Response } from "express"
import Issue, { IIssue } from "../models/issue"
import { ObjectId, RootQuerySelector } from "mongoose"


export const postIssue = async(req:Request, res:Response):Promise<void> => {
    const {title, description, priority} = req.body;

    const user : ObjectId = req.body.userData.__id
     
    const issueData = {
        title,
        description,
        priority,
        user: user,
        createdAt: new Date()
    }

    const issue = new Issue(issueData)

    await issue.save()

    res.status(201).json({
        issue
    })
}