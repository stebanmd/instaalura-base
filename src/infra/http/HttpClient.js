export async function HttpClient(url, { headers, body, ...options }) {
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
    ...options,
  }).then((serverResponse) => {
    if (serverResponse.ok) {
      return serverResponse.json();
    }
    throw new Error('Falha ao recuperar os dados do servidor');
  });
}
