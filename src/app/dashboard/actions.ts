import { fetchProjects } from '@/lib/fetchProjects';
import { getServerAuthSession } from '@/server/auth';
import { api } from '@/trpc/server';

export async function getGithubAccount() {
  const session = await getServerAuthSession();
  const userAccounts = await api.user.getUserByEmail.query({
    email: session?.user.email ?? '',
  });

  const githubAccount = userAccounts.accounts.find((account) => account.provider === 'github');

  if (!githubAccount) {
    throw new Error('GitHub account not found');
  }

  return githubAccount;
}

interface DraftIssue {
  id: string;
  title: string;
  body: string;
  updatedAt: string;
  creator: {
    login: string;
  };
}

interface DraftNodeItem {
  content: DraftIssue | Record<string, never>;
}

type DraftsQueryResponse = {
  data: {
    node: {
      items: {
        nodes: DraftNodeItem[];
      };
    };
  };
};

const fetchGitHubProjectItems = async (token: string) => {
  const graphqlQuery = {
    query: `
      {
        node(id: "PVT_kwHOAWpDi84AdSIq") {
          ... on ProjectV2 {
            items(first: 10) {
              nodes {
                content {
                  ... on DraftIssue {
                    id
                    title
                    body
                    updatedAt
                    creator {
                      login
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  };

  const response = await fetchProjects(graphqlQuery.query, token);

  return response.json();
};

export async function getDraftTasks() {
  const userAccounts = await getGithubAccount();

  if (!userAccounts?.access_token) {
    throw new Error('GitHub access token not found');
  }

  const data = (await fetchGitHubProjectItems(userAccounts.access_token)) as DraftsQueryResponse;

  console.log('data: ', data);

  const nodes = data?.data?.node?.items?.nodes;
  const draftIssues = nodes
    ?.filter((item) => 'id' in item.content && 'title' in item.content && 'body' in item.content)
    ?.map((item) => item.content) as DraftIssue[];

  // if (!draftIssues.length) {
  //   throw new Error('No draft issues found');
  // }

  return draftIssues;
}

export async function updateDraftIssueBody(issueId: string, newBody: string) {
  const userAccounts = await getGithubAccount();

  if (!userAccounts?.access_token) {
    throw new Error('GitHub access token not found');
  }

  const graphqlMutation = `
    mutation UpdateDraftIssue($id: ID!, $body: String!) {
      updateIssue(input: {id: $id, body: $body}) {
        issue {
          id
          title
          body
          updatedAt
        }
      }
    }
  `;

  try {
    const response = await fetchProjects(graphqlMutation, userAccounts?.access_token, { id: issueId, body: newBody });
    const jsonResponse = await response.json();

    if (jsonResponse && 'errors' in jsonResponse) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.error('GraphQL error:', jsonResponse.errors);
      throw new Error('Failed to update draft issue body');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return jsonResponse.data.updateIssue.issue as DraftIssue;
  } catch (error) {
    console.error('Error updating draft issue body:', error);
    throw error;
  }
}
