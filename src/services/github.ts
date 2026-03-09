export async function inviteToGithubRepo(username: string) {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!token || !owner || !repo) {
    throw new Error('GitHub configuration is missing');
  }

  // GitHub REST API uses PUT for adding a collaborator
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/collaborators/${username}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      permission: 'read',
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Failed to invite user to GitHub repo: ${response.status} ${errorData}`);
  }

  // 204 No Content is returned if user is already a collaborator
  if (response.status === 204) {
    return { status: 204, message: 'User is already a collaborator' };
  }

  return response.json();
}
