using System.Collections.Generic;
using Amazon.DynamoDBv2.Model;

namespace SeedFinding.Models
{
    public class JobRequest
    {
        public int StartSeed { get; set; }
        public int EndSeed { get; set; }
        public string Weather { get; set; }
        public string Location { get; set; }

        public JobRequest()
        {
            StartSeed = 0;
            EndSeed = 100_000;
            Weather = "";
            Location = "";
        }

        public JobRequest(Dictionary<string, AttributeValue> payload)
        {
            StartSeed = int.Parse(payload["start_seed"].N);
            EndSeed = int.Parse(payload["end_seed"].N);
            Weather = payload["weather"].S;
            Location = payload["location"].S;
        }
    }

    public class Job
    {
        public string UserId { get; set; }
        public JobRequest Payload { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Status { get; set; }
        public string JobId { get; set; }
        public string JobHash { get; set; }

        public Job()
        {
            Payload = new JobRequest();
        }

        public Job(Dictionary<string, AttributeValue> job)
        {

            UserId = job["user_id"].S;
            Payload = new JobRequest(job["payload"].M);
            JobHash = job["job_hash"].S;
            JobId = job["job_id"].S;
            Status = job["status"].S;
        }
        public override string ToString()
        {
            return $"Job: {JobId} - {Status}";
        }
    }
}