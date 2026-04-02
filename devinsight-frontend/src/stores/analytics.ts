import { defineStore } from "pinia";
import { fetchOverview, fetchRepos } from "../services/analyticsService";

interface Repo {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  openIssues: number;
  lastCommit: string;
  visibility: "public" | "private";
}

interface State {
  repos: Repo[];
  commitsData: any;
  contributorsData: any;
  loading: boolean;
}

export const useAnalyticsStore = defineStore("analytics", {
  state: (): State => ({
    repos: [],
    commitsData: {},
    contributorsData: {},
    loading: false,
  }),

  actions: {
    async fetchOverview() {
      this.loading = true;
      try {
        const data = await fetchOverview("facebook", "react");
        this.commitsData = data.commits_over_time;
        this.contributorsData = data.contributors;
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        this.loading = false;
      }
    },

    async fetchRepos(owner: string) {
      this.loading = true;
      try {
        this.repos = await fetchRepos(owner);
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});