import { IUserDto } from "../dtos/user.dto";
import * as dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

class MailServiceClass {
  async sendActivationLink(email: IUserDto["email"], link: string) {
    const res = await fetch(process.env.EMAIL_SEND_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        origin: process.env.APP_URL!,
      },

      body: JSON.stringify({
        service_id: process.env.EMAIL_SERVICE!,
        template_id: process.env.EMAIL_TEMPLATE!,
        user_id: process.env.EMAIL_KEY!,
        template_params: {
          service_name: "Juni Fruit",
          activation_link: link,
          to_email: email,
        },
      }),
    });

    console.log(
      `Status for ${email} transport is ${res.status} ${res.statusText}`
    );
  }
}

export const MailService = new MailServiceClass();

export interface IMailService extends MailServiceClass {}
