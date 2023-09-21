import { Model, Schema, Types, model } from "mongoose";

export interface IIssue {
    title: string,
    description: string,
    priority: number,
    user: Types.ObjectId,
    createdAt: Date
}

const IssueSchema = new Schema<IIssue>({
    title: {
        type: String,
        required: [true, "El titulo es obligatorio"]
    },
    description: {
        type: String,
        required: [true, "La descripción es obligatorio"]
    },
    priority: {
        type: Number,
        required: [true, "La prioridad es obligatoria"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Issue: Model<IIssue> = model<IIssue>("Issue", IssueSchema)

export default Issue