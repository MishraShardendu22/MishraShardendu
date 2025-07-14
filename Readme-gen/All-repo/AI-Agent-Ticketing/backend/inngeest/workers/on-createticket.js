import { inngest } from "../index.inngest.js";
import { NonRetriableError } from "inngest";
import { User } from "../../model/user.model.js";
import analyzeTicket from "../../utils/ai.util.js";
import { Ticket } from "../../model/ticket.model.js";
import { SendEmail } from "../../utils/mail.util.js";

export const onCreateTicker = inngest.createFunction({
    id: "on-ticket-create",
    retries: 2,
}, {
    event: "ticket/create",
}, async ({ event, step }) => {
    try {
        console.log("cp-1");
        const { ticketId } = event.data;
        if (!ticketId) {
            console.log("cp-2");
            throw new NonRetriableError("Ticket ID is required for ticket creation.");
        }

        const ticket = await step.run("fetch-ticket", async () => {
            console.log("cp-3");
            const ticketObject = await Ticket.findOne({ _id: ticketId });
            if (!ticketObject) {
                console.log("cp-4");
                throw new NonRetriableError("Ticket does not exist");
            }
            return ticketObject;
        });

        if (!ticket) {
            console.log("cp-5");
            throw new NonRetriableError("Ticket not found.");
        }

        await step.run("update-ticket-status", async () => {
            console.log("cp-6");
            await Ticket.findByIdAndUpdate(ticket._id, { status: "To-Do" });
        });

        console.log("cp-7");
        const aiResponse = await analyzeTicket(ticket);

        const relatedSkills = await step.run("ai-processing", async () => {
            console.log("cp-8");
            let skills = [];
            if (aiResponse) {
                await Ticket.findByIdAndUpdate(ticket._id, {
                    priority: ["low", "medium", "high"].includes(aiResponse.priority)
                        ? "medium" : aiResponse.priority,
                    helpfulNotes: aiResponse.helpfulNotes,
                    relatedSkills: aiResponse.relatedSkills,
                });
                skills = aiResponse.relatedSkills;
            }
            return skills;
        });

        const moderator = await step.run("assign-moderator", async () => {
            console.log("cp-9");
            let user = await User.findOne({
                role: "moderator",
                skills: {
                    $elemMatch: {
                        $regex: relatedSkills.join("|"),
                        $options: "i"
                    }
                }
            });
            if (!user) {
                console.log("cp-10");
                user = await User.findOne({
                    role: "admin",
                });
            }

            await Ticket.findByIdAndUpdate(ticket._id, {
                assignedTo: user._id
            });

            return user;
        });

        await step.run("send-email-notification", async () => {
            console.log("cp-11");
            if (moderator) {
                const finalTicket = await Ticket.findById(ticket._id);
                await SendEmail(
                    moderator.email,
                    `New Ticket Assigned: ${finalTicket.title}`,
                    `Hello ${moderator.name},\n\nA new ticket has been assigned to you:\n\nTitle: ${finalTicket.title}\nDescription: ${finalTicket.description}\n\nPlease review it at your earliest convenience.\n\nBest regards,\nThe Team`
                );
            }
        });

        console.log("cp-12");
        return { success: true, message: "Ticket created and processed successfully." };
    }
    catch (error) {
        console.log("cp-err");
        console.error("Error in onCreateTicket function:", error);
        return { success: false, message: "Failed to process ticket creation." };
    }
});