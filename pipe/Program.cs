using System;
using System.Threading;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;

namespace pipe
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length == 0)
            {
                Console.WriteLine("No arguments");
                return;
            }
            var PipelineId = args[0];
            string connectionString = "mongodb+srv://dbUser:pipline2019@mycluster-nrimo.mongodb.net/pipilines?retryWrites=true&w=majority";
            MongoClient client = new MongoClient(connectionString);
            IMongoDatabase database = client.GetDatabase("pipilines");
            IMongoCollection<BsonDocument> pipelinesCollection = database.GetCollection<BsonDocument>("pipelines");
            var filter = new BsonDocument("_id", new ObjectId(PipelineId));
            var pipeline = pipelinesCollection.Find(filter).FirstOrDefault();
            var pipes = BsonSerializer.Deserialize<pipelines>(pipeline);
            foreach(var task in pipes.Tasks)
            {
                Console.WriteLine($"Task {task.Name} will be started" );
                Thread.Sleep(task.AverageTime);
            }
            Console.WriteLine("End pipe");
        }
    }
}
