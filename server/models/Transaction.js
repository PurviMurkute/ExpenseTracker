import { model, Schema } from 'mongoose';

const userTransactions = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 6
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
        type: Schema.Types.ObjectId,  //we will know which user added transactions
        ref: "User",
        required: true
    }
},
{
    timestamps: true
});

const Transaction = model("Transaction", userTransactions);

export default Transaction;