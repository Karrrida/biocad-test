import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();

export const connectDB = async () => {
    try {
        await prisma.$connect();
        console.info("Connected!")
    }catch(err) {
        console.error("DB connection error:", err);
        throw err;
    }
}

export default prisma;