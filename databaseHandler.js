
const async = require('hbs/lib/async');
const {ObjectId} = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

const Database_URL = 'mongodb+srv://haanhphuong:123456abc@cluster0.qef5g.mongodb.net/test'
const DATABASE_NAME = 'asm2cloud'

async function insertToDB(obj,collectionName){
    const client = await MongoClient.connect(Database_URL)
    const dbo = client.db(DATABASE_NAME);
    const result = await dbo.collection(collectionName).insertOne(obj)
    console.log("aaa", result.insertedId.toHexString());
}


async function getAll(collectionName){
    const client = await MongoClient.connect(Database_URL)
    const dbo = client.db(DATABASE_NAME);
    const result = await dbo.collection(collectionName).find({}).toArray()
    return result
}


async function deleteObject(id, collectionName){
    const client = await MongoClient.connect(Database_URL)
    const dbo = client.db(DATABASE_NAME);
    dbo.collection(collectionName).deleteOne({_id:ObjectId(id)})
}


async function getDocumentById(id, collectionName){
    const client = await MongoClient.connect(Database_URL)
    const dbo = client.db(DATABASE_NAME);
    const result = await dbo.collection(collectionName).findOne({_id:ObjectId(id)})
    return result;
}


async function updateDocument(id, updateValues, collectionName){
    const client = await MongoClient.connect(Database_URL)
    const dbo = client.db(DATABASE_NAME);
    await dbo.collection(collectionName).updateOne({_id:ObjectId(id)}, updateValues)
}

module.exports = {insertToDB, getAll, deleteObject, 
                getDocumentById, updateDocument}

