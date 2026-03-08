export const githubService = {
  inviteUserToRepo: async (username: string) => {
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER;
    const repo = process.env.GITHUB_REPO;

    if (!token || !owner || !repo) {
      throw new Error('GitHub configuration is missing. Check GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO.');
    }

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/collaborators/${username}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `token ${token}`,
        'X-GitHub-Api-Version': '2022-11-28'
      },
      // permission can be 'pull', 'push', 'admin', 'maintain', 'triage'. 'pull' is read access.
      body: JSON.stringify({ permission: 'pull' })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('GitHub API Error:', errorData);
      throw new Error(errorData.message || 'Failed to send GitHub invite');
    }

    return response.json();
  }
};
