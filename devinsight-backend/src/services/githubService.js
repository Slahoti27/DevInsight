import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const BASE_URL = "https://api.github.com";

const headers = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};

export const getCommits = async (owner, repo) => {
  const res = await axios.get(
    `${BASE_URL}/repos/${owner}/${repo}/commits`,
    { headers }
  );
  return res.data;
};

export const getPullRequests = async (owner, repo) => {
  const res = await axios.get(
    `${BASE_URL}/repos/${owner}/${repo}/pulls?state=all`,
    { headers }
  );
  return res.data;
};