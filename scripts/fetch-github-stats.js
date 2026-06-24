import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "brayanalmengor04";

if (!GITHUB_TOKEN) {
  console.error("Error: GITHUB_TOKEN environment variable is missing.");
  process.exit(1);
}

const query = `
  query($username: String!) {
    user(login: $username) {
      repositories(first: 100, ownerAffiliations: OWNER) {
        totalCount
        nodes {
          stargazerCount
          forkCount
          languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
      contributionsCollection {
        totalCommitContributions
        contributionCalendar {
          totalContributions
        }
      }
      recentCommits: repositories(first: 10, ownerAffiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER], orderBy: {field: PUSHED_AT, direction: DESC}) {
        nodes {
          name
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 5) {
                  nodes {
                    oid
                    message
                    committedDate
                    repository {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

async function fetchGitHubData() {
  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username: GITHUB_USERNAME } }),
    });

    const result = await response.json();
    
    if (result.errors) {
      console.error("GraphQL Errors:", result.errors);
      process.exit(1);
    }
    
    return result.data.user;
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    process.exit(1);
  }
}

async function main() {
  console.log("Fetching GitHub stats...");
  const data = await fetchGitHubData();
  
  // Define where to save the file: src/data/github-stats.json
  const dataDir = path.join(__dirname, '..', 'src', 'data');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  const filePath = path.join(dataDir, 'github-stats.json');
  
  // Write data to JSON file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Successfully saved GitHub stats to ${filePath}`);
}

main();
