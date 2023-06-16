import { providerInfo } from "@/components/providers/providerInfo";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

type Campaign = {
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

type CampaignResponse = {
  campaigns: Campaign[];
  links: string[];
};

type Campaigns = Campaign[];

const Home: NextPage = () => {
  const campaignsURL =
    "https://apigw.mweb.co.za/prod/baas/proxy/marketing/campaigns/fibre?channels=120&visibility=public";

  const fetchCampaigns = (): Promise<CampaignResponse> =>
    axios.get<CampaignResponse>(campaignsURL).then((response) => response.data);

  const { data } = useQuery({
    queryKey: ["campaigns"],
    queryFn: fetchCampaigns,
  });

  return (
    <>
      <Head>
        <title>Mweb - Fibre</title>
        <meta name="description" content="Mweb Fibre Products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-center">
        <h1 className="my-2 text-3xl font-bold">Fibre products</h1>
        <div className="text mb-4 mt-2">
          Select a fibre infrastructure provider below, browse the products
          available and complete a coverage search
        </div>
        <div className="mx-auto flex w-full justify-center gap-6">
          {providerInfo.map((provider) => (
            <div key={provider.code}>
              <Image
                src={provider.url}
                alt={provider.name}
                height={70}
                width={70}
                priority
              />
            </div>
          ))}
        </div>

        <div>
          {data?.campaigns?.map((campaign) => (
            <div key={campaign.code}>
              <div>{campaign.name}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
