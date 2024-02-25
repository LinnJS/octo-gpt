const fetchGitHubProjectItems = async (token: string) => {
  const graphqlQuery = {
    query: `
      {
        node(id: "PVT_kwHOAWpDi84AdSIq") {
          ... on ProjectV2 {
            items(first: 100) {
              nodes {
                id
                type
                project {
                  id
                }
                content {
                  ... on DraftIssue {
                    title
                    body
                    updatedAt
                  }
                }
              }
            }
          }
        }
      }
    `,
  };

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Replace YOUR_GITHUB_ACCESS_TOKEN with your actual GitHub OAuth token
    },
    body: JSON.stringify(graphqlQuery),
  });

  return response.json();
};

export async function getDraftProjectItems(token: string) {
  const data = await fetchGitHubProjectItems(token);

  console.log("data: ", data);

  return JSON.stringify(data);
}
