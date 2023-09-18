require("dotenv").config();
const mongoose = require('mongoose')
const connectToDB = ()=>
{
    mongoose.connect(process.env.DbUrl);
}
connectToDB();
const addUser = require("./adduser.js");
const addTask = require("./addtask.js");
const addSubTask = require("./addsubtask.js");

const setup = () =>{
    const seedtest = async()=>{
        // await mongoose.connection.dropDatabase();
        const userDetail1 = {name:"Tester50", email:"Test0123@gmail.com", password:"00000"};
        const userDetail2 = {name:"Tester60", email:"Test7896@gmail.com", password:"00000"};
        let user1 = await  addUser(userDetail1);
        let user2 = await addUser(userDetail2);   
        let task1 = await addTask(user1._id, "Play");
        let task2 = await addTask(user2._id, "Cook");
        let subtask1 = await addSubTask(user1._id, task1._id, "Basketball");
        let subtask2 = await addSubTask(user2._id, task2._id, "Rice");
        console.log("Done" + user1);
    }
    seedtest();
    
}
setup();