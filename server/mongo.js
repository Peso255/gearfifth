import { MongoClient } from 'mongodb';
let _db = null;
async function connect() {
    if (!_db) {
        const client = await MongoClient.connect(process.env.DB_URI);
        _db = client.db("ChallengeDB")
    }
    return _db;
}

async function getCourses() {
    const db = await connect();
    const courseColl = db.collection('courses');
    let out = [];
    let courses = courseColl.find();
    for await (const course of courses) {
        out.push(course);
    }
    return out;
}

async function getUsersofCourse(id) {
    const db = await connect();
    const usersColl = db.collection('users');
    const filter = {enrolledCourses: id};
    let out = [];
    let users = usersColl.find(filter);
    for await (const user of users) {
        out.push(user);
    }
    return out;
}

connect();
export {getCourses, getUsersofCourse};