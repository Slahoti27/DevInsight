import { defineStore } from "pinia";
import { fetchOverview, fetchAnalyticsData } from "../services/analyticsService";

interface Overview {
  total_commits: number;
  total_prs: number;
  total_contributors: number;
}

interface State {
  commitsData: any;
  contributorsData: any;
  loading: boolean;
}

export const useAnalyticsStore = defineStore("analytics", {
  state: (): State => ({
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
  },
});