import { Model, Schema, Types, model } from "mongoose"

interface IOrderDetails {
    name: string,
    phone: string,
    location: string,
    adress: string,
}

interface IProduct {
    description: string,
    id: number,
    price: number,
    quantity: number,
    title: string
}

export interface IOrder {
    createdAt: Date,
    user: Types.ObjectId,
    price: number,
    shippingCost: number,
    products: IProduct[],
    details: IOrderDetails,
    status: string,
    total: number
}

const OrderSChema = new Schema<IOrder>({
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    shippingCost: {
        type: Number
    },
    products: {
        type: [{
            description: {
                type: String,
                required: true
            },
            id: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            title: {
                type: String,
                required: true
            }
        }],
        required: true
    },
    details: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        adress: {
            type: String,
            required: true
        }     
    },
    status: {
        type: String,
        required: true,
    },
    total: {
        type: Number,
        required: true
    }
})

const Order: Model<IOrder> = model("Order", OrderSChema)

export default Order