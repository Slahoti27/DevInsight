export interface Commit {
  id: string;
  author: string;
  date: string;
}

export interface PullRequest {
  id: number;
  author: string;
  created_at: string;
  merged_at: string | null;
}

export interface Contributor {
  name: string;
  total_commits: number;
  total_prs: number;
}

export interface AnalyticsOverview {
  total_commits: number;
  total_prs: number;
  total_contributors: number;
}