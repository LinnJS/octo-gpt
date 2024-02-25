export async function fetchProjects<T>(graphqlQuery: string, token: string, variables?: T) {
  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables,
      }),
    });

    // if (!response.ok) {
    //   console.log('response: ', response);
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    return response;
  } catch (error) {
    console.error('Error fetching GraphQL data:', error);
    throw error;
  }
}
