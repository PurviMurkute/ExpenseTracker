import { model, Schema } from 'mongoose';

const userTransactions = new Schema({
    title: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true
    },
    category: {
        type: [String],
        required: true,
        default: "Other"
    },
    user: {
        type: Schema.Types.ObjectId,  
        ref: "User",
        required: true
    },
/*     isRecurring: {
        type: Boolean,
        default: false
    },
    recurringType: {
        type: String,
        enum: ["Daily", "Monthly", "Yearly"],
        default: "Monthly"
    } */
},
{
    timestamps: true
});

const Transaction = model("Transaction", userTransactions);

export default Transaction;