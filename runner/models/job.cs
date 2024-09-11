using System.Collections.Generic;
using Amazon.DynamoDBv2.Model;

namespace SeedFinding.Models
{
    public class Job
    {
        public string UserId { get; set; }
        public JobRequirements Payload { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Status { get; set; }
        public string JobId { get; set; }
        public string JobHash { get; set; }

        public Job()
        {
            Payload = new JobRequirements();
        }

        public Job(Dictionary<string, AttributeValue> job)
        {
            UserId = job["user_id"].S;
            Payload = new JobRequirements(job["payload"].M);
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
