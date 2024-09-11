using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;
using Amazon.SimpleSystemsManagement;
using Amazon.SimpleSystemsManagement.Model;
using SeedFinding.Models;

namespace SeedFinding.Services
{
    class DynamoDB
    {
        private readonly AmazonDynamoDBClient _client;
        private string _tableName;

        public static async Task<DynamoDB> GetClient()
        {
            var ddb = new DynamoDB();
            await ddb.Init(new AmazonSimpleSystemsManagementClient());
            return ddb;
        }

        public DynamoDB()
        {
            _client = new AmazonDynamoDBClient();
        }

        public async Task Init(AmazonSimpleSystemsManagementClient ssmClient)
        {
            _tableName = (
                await ssmClient.GetParameterAsync(
                    new GetParameterRequest { Name = "/seed-job-ddb/table-name" }
                )
            )
                .Parameter
                .Value;
            Console.WriteLine("Table name = {0}", _tableName);
        }

        public async Task<DescribeTableResponse> DescribeTableAsync()
        {
            if (string.IsNullOrEmpty(_tableName))
            {
                throw new Exception("Table name is not set");
            }
            return await _client.DescribeTableAsync(
                new DescribeTableRequest { TableName = _tableName }
            );
        }

        public async Task<PutItemResponse> PutItemAsync(PutItemRequest request)
        {
            return await _client.PutItemAsync(request);
        }

        public async Task<GetItemResponse> GetItemAsync(GetItemRequest request)
        {
            return await _client.GetItemAsync(request);
        }

        public async Task<Job> GetJob(string userId, string jobId)
        {
            var query = await _client.QueryAsync(
                new QueryRequest
                {
                    TableName = _tableName,
                    KeyConditionExpression = "user_id = :userId and job_id = :jobId",
                    ExpressionAttributeValues = new Dictionary<string, AttributeValue>
                    {
                        {
                            ":userId",
                            new AttributeValue { S = userId }
                        },
                        {
                            ":jobId",
                            new AttributeValue { S = jobId }
                        }
                    }
                }
            );
            if (query.Items.Count == 0)
            {
                return null;
            }
            return new Job(query.Items[0]);
        }

        public async Task SetJobRunning(Job job)
        {
            job.Status = "running";
            await _client.UpdateItemAsync(
                new UpdateItemRequest
                {
                    TableName = _tableName,
                    Key = new Dictionary<string, AttributeValue>
                    {
                        {
                            "user_id",
                            new AttributeValue { S = job.UserId }
                        },
                        {
                            "job_id",
                            new AttributeValue { S = job.JobId }
                        }
                    },
                    UpdateExpression = "set #status = :status",
                    ExpressionAttributeNames = new Dictionary<string, string>
                    {
                        { "#status", "status" },
                    },
                    ExpressionAttributeValues = new Dictionary<string, AttributeValue>
                    {
                        {
                            ":status",
                            new AttributeValue { S = job.Status }
                        },
                    }
                }
            );
        }

        public async Task SetJobComplete(Job job, List<int> Seeds)
        {
            var dt = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ss");
            job.Status = "complete";

            await _client.UpdateItemAsync(
                new UpdateItemRequest
                {
                    TableName = _tableName,
                    Key = new Dictionary<string, AttributeValue>
                    {
                        {
                            "user_id",
                            new AttributeValue { S = job.UserId }
                        },
                        {
                            "job_id",
                            new AttributeValue { S = job.JobId }
                        }
                    },
                    UpdateExpression =
                        "set #status = :status, #seeds = :seeds, #end_time = :end_time",
                    ExpressionAttributeNames = new Dictionary<string, string>
                    {
                        { "#status", "status" },
                        { "#seeds", "seeds" },
                        { "#end_time", "end_time" }
                    },
                    ExpressionAttributeValues = new Dictionary<string, AttributeValue>
                    {
                        {
                            ":status",
                            new AttributeValue { S = job.Status }
                        },
                        {
                            ":seeds",
                            Seeds.Count == 0
                                ? new AttributeValue { NULL = true }
                                : new AttributeValue { NS = Seeds.ConvertAll(s => s.ToString()) }
                        },
                        {
                            ":end_time",
                            new AttributeValue { S = dt }
                        }
                    }
                }
            );
        }
    }
}
