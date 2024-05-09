import { InternalServerErrorException,HttpException } from "@nestjs/common";

const catchErrorMessageHandler = (err:any) => {
    const { response } = err;
    if(!response) {
        throw new InternalServerErrorException(err.message);
    }

    throw new HttpException(response.message,response.statusCode);
}

export default catchErrorMessageHandler;