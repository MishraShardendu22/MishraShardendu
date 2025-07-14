import { SendEmail } from "@/mail/SendEmail";

const to_email = "shardendumishra02@gmail.com";
const to_name = "Shardendu Mishra";
const otp = Math.floor(100000 + Math.random() * 900000);

SendEmail({ to_email, to_name, otp })
.then(() => {
  console.log("Email successfully sent!");
})
.catch((error) => {
  console.error("Error sending email:", error);
});