import {
  fetchCampaigns,
  useCampaigns,
} from "@/components/campaigns/campaignHooks";
import { providerInfo } from "@/components/providers/providerInfo";
import { type InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { campaignRes } = props;
  const { data: campaignData } = useCampaigns({
    initialData: campaignRes,
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
          {campaignData?.campaigns?.map((campaign) => (
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

export const getServerSideProps = async () => {
  // It's better UX to fetch campaigns on the server side so that the page is rendered with the filters
  const campaignRes = await fetchCampaigns();

  return { props: { campaignRes } };
};
