import { fetchProjects } from '@/lib/fetchProjects';
import { getGithubAccount } from '@/app/dashboard/actions';

export interface IssueProps {
  id: string;
  title: string;
  body: string;
  updatedAt: string;
  creator: {
    login: string;
  };
}

interface DraftIssueQueryResponse {
  data: {
    node: {
      id: string;
      title: string;
      body: string;
      updatedAt: string;
      creator: {
        login: string;
      };
    };
  };
}

const getDraftIssueById = async (token: string, id: string) => {
  const graphqlQuery = {
    query: `
      query GetDraftIssueById($id: ID!) {
        node(id: $id) {
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
    `,
    variables: {
      id,
    },
  };

  const response = await fetchProjects(graphqlQuery.query, token, graphqlQuery.variables);

  return response.json();
};

export async function getDraftTaskById(draftIssueId: string) {
  const userAccounts = await getGithubAccount();

  if (!userAccounts?.access_token) {
    throw new Error('GitHub access token not found');
  }

  const data = (await getDraftIssueById(userAccounts.access_token, draftIssueId)) as DraftIssueQueryResponse;

  if (!data?.data?.node) {
    throw new Error('No draft issue found with the given ID');
  }

  return data.data.node as IssueProps;
}
