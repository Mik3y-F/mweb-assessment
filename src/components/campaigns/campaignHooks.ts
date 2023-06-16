import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type Campaign = {
  links: string[];
  code: string;
  name: string;
  description: string;
  category: string;
  urlSlug: string;
  isStandardCampaign: boolean;
  isDefaultCampaign: boolean;
  isPrivateCampaign: boolean;
  promoCodes: string[];
};

export type CampaignResponse = {
  campaigns: Campaign[];
  links: string[];
};

const campaignsURL =
  "https://apigw.mweb.co.za/prod/baas/proxy/marketing/campaigns/fibre?channels=120&visibility=public";

export const fetchCampaigns = (): Promise<CampaignResponse> =>
  axios.get<CampaignResponse>(campaignsURL).then((response) => response.data);

export const useCampaigns = (params: { initialData?: CampaignResponse }) => {
  const { initialData } = params;
  return useQuery({
    queryKey: ["campaigns"],
    queryFn: fetchCampaigns,
    initialData,
  });
};
