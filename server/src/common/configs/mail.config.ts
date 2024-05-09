import { registerAs } from "@nestjs/config";

export default registerAs('mail' , () => ({
     port: Number(process.env.MAILER_PORT),
     host: process.env.MAILER_HOST,
     secure:false,
     user: process.env.MAILER_USER,
     password: process.env.MAILER_PASSWORD
}));