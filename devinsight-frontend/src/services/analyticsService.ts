import api from "./api";

export const fetchOverview = async (owner: string, repo: string) => {
  const res = await api.get("/analytics/overview", {
    params: { owner, repo },
  });
  return res.data;
};

export const fetchAnalyticsData = async (owner: string, repo: string) => {
  const res = await api.get("/analytics/data", {
    params: { owner, repo },
  });
  return res.data;
};

export const fetchRepos = async (owner: string) => {
  const res = await api.get("/analytics/repos", {
    params: { owner },
  });
  return res.data;
};