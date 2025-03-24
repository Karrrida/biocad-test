import {PrismaClient} from "@prisma/client"
import logger from './utils/logger';

const prisma = new PrismaClient();

export const connectDB = async () => {
    try {
        await prisma.$connect();
        logger.info('DB connected successfully');
    }catch(err) {
        logger.error("DB connection error:", err);
        throw err;
    }
}

export default prisma;