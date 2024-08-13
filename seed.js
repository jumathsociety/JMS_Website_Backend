import prisma from "./lib/prisma.js";

async function main() {
    const user=await prisma.user.create({
        data: {
            email : "somnathcha.ug@jadavpuruniversity.in",
            password : "hello123456",
            name : "Somnath",
            department : "IT",
            college : "djhj",
            phone : "1234567890",
            year : "First"
        },
    })
    console.log(user);
}

main();