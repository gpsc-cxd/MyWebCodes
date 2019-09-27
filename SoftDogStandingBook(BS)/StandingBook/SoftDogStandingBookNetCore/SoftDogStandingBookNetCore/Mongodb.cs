/////////////////////////////////////////////////////////////////////////
//// All rights reserved.
//// author: Adminstrator
//// File: Mongodb.cs
//// Summary: Mongodb
//// Date: 2019/9/27 10:37:19
//////////////////////////////////////////////////////////////////////////
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace SoftDogStandingBookNetCore
{
    public class Mongodb
    {
        private readonly string _con = ReadDBConfig("mongodb");
        private readonly string _database = "data";
        private readonly string _collection = "standingbook";

        public string Connection { get { return _con; } }
        public string DataBase { get { return _database; } }
        public string Collection { get { return _collection; } }

        public MongoClient mongoClient;
        public MongoDatabase mongoDatabase;
        public MongoCollection mongoCollection;
        public Mongodb()
        {
            mongoClient = new MongoClient(_con);
            mongoDatabase = mongoClient.GetServer().GetDatabase(_database);
            mongoCollection = mongoDatabase.GetCollection(_collection) as MongoCollection;
        }
        /// <summary>
        /// 插入多条数据
        /// </summary>
        /// <param name="Datas"></param>
        /// <returns></returns>
        public void Insert<T>(IEnumerable<T> Datas)
        {
            foreach (var d in Datas)
            {
                mongoCollection.Insert(d);
            }

        }
        /// <summary>
        /// 插入单条数据
        /// </summary>
        /// <param name="Datas"></param>
        public WriteConcernResult Insert<T>(T Datas)
        {
            var res = mongoCollection.Insert(Datas);
            return res;
        }
        /// <summary>
        /// 全部查询
        /// </summary>
        /// <returns></returns>
        public List<T> QueryDatas<T>()
        {
            MongoCursor<T> mc = mongoCollection.FindAllAs<T>();
            return mc.ToList();
        }
        /// <summary>
        /// 条件查询
        /// </summary>
        /// <param name="bsonElements"></param>
        /// <returns></returns>
        public List<T> QueryDatas<T>(string field, string value)
        {
            var query = Query.Matches(field, new BsonRegularExpression(new Regex(value, RegexOptions.IgnoreCase)));

            MongoCursor<T> mc = mongoCollection.FindAs<T>(query);
            return mc.ToList();
        }
        /// <summary>
        /// 更新数据
        /// </summary>
        /// <param name="query"></param>
        /// <param name="update"></param>
        /// <returns></returns>
        public WriteConcernResult Update(QueryDocument query, UpdateDocument update)
        {
            var res = mongoCollection.Update(query, update);
            return res;
        }
        public WriteConcernResult Delete(QueryDocument bsonElements)
        {
            var res = mongoCollection.Remove(bsonElements);
            return res;
        }
        private static string ReadDBConfig(string key)
        {
            string file = "Appsettings.json";
            var builder = new ConfigurationBuilder().AddJsonFile(file);
            var config = builder.Build();
            return config.GetSection(key).Value;
        }
    }
}
