import { registerAs } from "@nestjs/config";

export default registerAs('jwt', () => ({
     secret: process.env.JWT_SECRET,
     global: process.env.JWT_IS_GLOBAL === 'true' ? true : false,
     expiresIn: process.env.JWT_EXPIRES
}));