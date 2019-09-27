using MongoDB.Bson;
using MongoDB.Driver.Builders;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SoftDogStandingBookNetCore
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length != 3)
            {
                Console.WriteLine("Arguments error: must be 3 args");
                return;
            }
            string option = args[0];
            if (option != "word" && option != "excel" && option != "words")
            {
                Console.WriteLine("Option error: must be one of 'word' or 'excel'");
                return;
            }
            string input = args[1]; //json
            string output = AppDomain.CurrentDomain.BaseDirectory + "output";    //outpudata
            if (option == "word")
            {
                var data = JsonConvert.DeserializeObject<Datas>(input);
                Functions.ExportWord(output, data);
            }
            else if (option == "words")
            {
                //合并导出
                //先通过参数从数据库里面查询

                var selector = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(input);
                //需要把selector中的id值换成ObjectId
                var sValue = selector["$or"].AsBsonArray;
                foreach (var s in sValue)
                {
                    var value = s["_id"].ToString();
                    var objid = new ObjectId(value);
                    //var str = string.Format("ObjectId(\"{0}\")", value);
                    //var bson = MongoDB.Bson.Serialization.BsonSerializer.Deserialize<BsonDocument>(str);
                    s["_id"] = objid;
                }
                Mongodb mongodb = new Mongodb();
                var res = mongodb.mongoCollection.FindAs<Datas>(Query.Create(selector));
                var data = res.ToList();
                Functions.ExportWord(output, args[2], data);
                Console.WriteLine(args[2]);
            }
            return;
        }
    }
}
