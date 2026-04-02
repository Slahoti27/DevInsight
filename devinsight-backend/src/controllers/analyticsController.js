import axios from "axios";

const github = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github+json",
  },
});

export const getRepos = async (req, res) => {
  try {
    const { owner } = req.query;
    const response = await github.get(`/users/${owner}/repos`);
    const repos = response.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || "No description",
      language: repo.language || "Unknown",
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      openIssues: repo.open_issues_count,
      lastCommit: new Date(repo.updated_at).toLocaleDateString(),
      visibility: repo.private ? "private" : "public",
    }));
    res.json(repos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch repos" });
  }
};

export const getOverview = async (req, res) => {
  try {
    const { owner, repo } = req.query;

    // Fetch commits, PRs and contributors in parallel
    const [commitsRes, prsRes, contributorsRes] = await Promise.all([
      github.get(`/repos/${owner}/${repo}/commits`, { params: { per_page: 100 } }),
      github.get(`/repos/${owner}/${repo}/pulls`, { params: { state: "all", per_page: 100 } }),
      github.get(`/repos/${owner}/${repo}/contributors`, { params: { per_page: 100 } }),
    ]);

    // Commits over time — group by date
    const commits_over_time = commitsRes.data.reduce((acc, commit) => {
      const date = commit.commit.author.date.split("T")[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Contributors — name: commit count
    const contributors = contributorsRes.data.reduce((acc, c) => {
      acc[c.login] = c.contributions;
      return acc;
    }, {});

    res.json({
      total_commits: commitsRes.data.length,
      total_prs: prsRes.data.length,
      total_contributors: contributorsRes.data.length,
      commits_over_time,
      contributors,
    });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch overview" });
  }
};