import { getCommits } from "../services/githubService.js";

export const getAnalytics = async (req, res) => {
  try {
    const { owner, repo } = req.query;

    const commits = await getCommits(owner, repo);

    // 📈 Group commits by date
    const commitsByDate = {};
    const contributors = {};

    commits.forEach((commit) => {
      const date = commit.commit.author.date.split("T")[0];
      const author = commit.commit.author.name;

      // commits per day
      commitsByDate[date] = (commitsByDate[date] || 0) + 1;

      // commits per contributor
      contributors[author] = (contributors[author] || 0) + 1;
    });

    res.json({
      commits_over_time: commitsByDate,
      contributors: contributors,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
};