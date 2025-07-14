import { Schema, model } from 'mongoose';
const ticketSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 'To-Do',
    },
    priority: {
        type: String,
    },
    deadline: {
        type: Date,
    },
    helpfulNotes: {
        type: [String],
    },
    relatedSkills: {
        type: [String],
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    }
}, {
    timestamps: true,
});
const Ticket = model('Ticket', ticketSchema);
export { Ticket };
