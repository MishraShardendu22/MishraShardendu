import { apiResponse } from "../utils/resposne.util.js";
import { Ticket } from "../model/ticket.model.js";
import { inngest } from "../inngeest/index.inngest.js";
export const createTicket = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return apiResponse(res, 400, "Title and description are required.");
        }
        const newTicket = await Ticket.create({
            title,
            description,
            createdBy: req.user._id.toString(),
        });
        await inngest.send({
            name: "ticket/create",
            data: {
                ticketId: newTicket._id.toString(),
                title: newTicket.title,
                description: newTicket.description,
                createdBy: newTicket.createdBy.toString(),
            },
        });
        return apiResponse(res, 201, "Ticket created successfully.", newTicket);
    }
    catch (error) {
        console.error("Error creating ticket:", error);
        return apiResponse(res, 500, "Internal server error.");
    }
};
export const getTickets = async (req, res) => {
    try {
        const user = req.user;
        let tickets;
        if (user.role !== "user") {
            tickets = await Ticket.find({})
                .populate("assignedTo", ["email", "_id"])
                .sort({ createdAt: -1 });
        }
        else {
            tickets = await Ticket.find({ createdBy: user._id })
                .select("title description status createdAt")
                .sort({ createdAt: -1 });
        }
        return apiResponse(res, 200, "Tickets fetched successfully.", tickets);
    }
    catch (error) {
        console.error("Error fetching tickets", error);
        return apiResponse(res, 500, "Internal server error.");
    }
};
export const getTicket = async (req, res) => {
    try {
        const user = req.user;
        let ticket;
        if (user.role !== "user") {
            ticket = await Ticket.findById(req.params.id).populate("assignedTo", [
                "email",
                "_id",
            ]);
        }
        else {
            ticket = await Ticket.findOne({
                createdBy: user._id,
                _id: req.params.id,
            }).select("title description status createdAt");
        }
        if (!ticket) {
            return apiResponse(res, 404, "Ticket not found.");
        }
        return apiResponse(res, 200, "Ticket fetched successfully.", ticket);
    }
    catch (error) {
        console.error("Error fetching ticket", error);
        return apiResponse(res, 500, "Internal server error.");
    }
};
