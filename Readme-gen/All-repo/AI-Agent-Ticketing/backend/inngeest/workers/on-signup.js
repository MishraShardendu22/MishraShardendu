import { NonRetriableError } from "inngest";
import { User } from "../../model/user.model.js";
import { SendEmail } from "../../utils/mail.util.js";
import { inngest } from "../index.inngest.js";

export const onSignUp = inngest.createFunction(
  {
    id: "on-user-signup",
    retries: 2,
  },
  {
    event: "user/signup",
  },
  async ({ event, step }) => {
    try {
        console.log("Inngest Working CP - 1");
        const { email } = event.data;
        if (!email) throw new NonRetriableError("Email is required for signup.");
        
        console.log("Inngest Working CP - 2");
        const user = await User.findOne({ email });
        if (!user) throw new NonRetriableError("User does not exist");

        console.log("Inngest Working CP - 3");
        await step.run("Send welcome email", async () => {
            const subject = "Welcome to the AI-powered platform!";
            const body = `Hello ${user.email},\n\nThank you for signing up! We're excited to have you on board.\n\nBest regards,\nThe Team`;
            await SendEmail({ subject, body, to_email: user.email });
        });

        console.log("Inngest Working CP - 4");
        return { success: true, message: "Welcome email sent successfully." };
    } catch (error) {
      console.error("Error in onSignUp function:", error);
      return { success: false, message: "Failed to send welcome email." };
    }
  }
);