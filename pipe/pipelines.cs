using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace pipe
{
    [BsonIgnoreExtraElements]
    public class pipelines
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public string Name { set; get; }
        public string Athor { set; get; }
        public IEnumerable<Tasks> Tasks {set;get;}
    }
    [BsonIgnoreExtraElements]
    public class Tasks
    {
        [BsonId]
        public ObjectId _id { set; get; }
        public string Name { set; get; }
        public string Athor { set; get; }
        public int AverageTime { set; get; }
    }
}
