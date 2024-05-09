import { registerAs } from "@nestjs/config";

export default registerAs('app' , () => ({
     port: Number(process.env.APP_PORT),
     verificationUrl: process.env.APP_MAIL_VERIFICATION_LINK,
     redirectUrl: process.env.APP_REDIRECT_LINK
}));