'use server';
import OpenAI from 'openai';

import { fetchProjects } from '@/lib/fetchProjects';
import { getGithubAccount, getIssueTasks } from '@/app/dashboard/actions';

import { env } from '@/env';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

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

  return data.data.node as IssueProps;
}

export async function createChatWithIssues() {
  const issues = await getIssueTasks();
  const initialContext = `The following are draft tickets from a GitHub Project related to software development improvements: \n\n${issues.join('\n')}\n\n`;

  const prompt =
    initialContext +
    'Given these tickets please fill out the body in github flavored markdown with a ##Description header containing a brief description of the issue and a ##Acceptance Criteria containing a check list of requirements for the issue to be considered complete. Here are some examples of completed issues. I will reply with many of these examples and will give you a title of a draft one at a time to complete.';

  try {
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    };
    const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);

    const data = JSON.stringify(chatCompletion, null, 2);

    console.log('chatCompletion: ', data);

    return data;
  } catch (error) {
    console.error('Error in creating chat:', error);
  }
}

export async function addMessageToChat(chatId: string, message: string) {
  const chatInit = await createChatWithIssues();
  console.log('chatInit: ', chatInit);

  try {
    const prompt = `Here is a title of a draft ticket with no body. Please add a body with a ##Description header containing a brief description of the issue and a ##Acceptance Criteria containing a check list of requirements for the issue to be considered complete. Here are some examples of completed issues. I will reply with many of these examples and will give you a title of a draft one at a time to complete. The title is: ${message}`;

    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    };
    const chatCompletion = await openai.chat.completions.create(params);

    console.log('chatCompletion: ', chatCompletion);

    return chatCompletion;
  } catch (error) {
    console.error('Error in adding message to chat:', error);
  }
}
