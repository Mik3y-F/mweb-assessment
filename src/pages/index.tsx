import CampaignPicker from "@/components/campaigns/CampaignPicker";
import {
  type Campaign,
  fetchCampaigns,
  useCampaigns,
} from "@/components/campaigns/hooks";
import { PriceRangeFilter } from "@/components/products/PriceRangeFilter";
import { ProductCardList } from "@/components/products/ProductCardList";
import { useProducts } from "@/components/products/hooks";
import { type PriceRange } from "@/components/products/types";
import { PRICE_FILTER_RANGES } from "@/components/products/utils";
import { providerInfo } from "@/components/providers/providerInfo";
import { type InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { campaignRes } = props;
  const { data: campaignData } = useCampaigns({
    initialData: campaignRes,
  });

  // Preselect the first campaign (if available) retrieved from SSR
  const [selectedCampaign, setSelectedCampaign] = useState<
    Campaign | undefined
  >(campaignRes.campaigns[0]);

  const [priceRanges, setPriceRanges] =
    useState<PriceRange[]>(PRICE_FILTER_RANGES);

  const { products } = useProducts({
    promoCodes: selectedCampaign?.promocodes || [],
    filters: {
      selectedPriceRanges: priceRanges.filter((range) => range.selected),
      selectedProviders: [],
    },
  });

  const handleSelectedCampaignChange = (value: string) => {
    const campaign = campaignData?.campaigns.find(
      (campaign) => campaign.code === value
    );
    setSelectedCampaign(campaign);
  };

  const handleSelectedPriceRangesChange = (value: PriceRange) => {
    const newPriceRanges = priceRanges.map((range) => {
      if (range.id === value.id) {
        return { ...range, selected: !range.selected };
      }
      return range;
    });
    setPriceRanges(newPriceRanges);
  };

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

        <div className="text-center">
          <CampaignPicker
            selectedCampaign={selectedCampaign?.code}
            handleSelectedCampaignChange={handleSelectedCampaignChange}
            campaigns={campaignData?.campaigns || []}
          />
        </div>
        <PriceRangeFilter
          priceRanges={priceRanges}
          handleSelectedPriceRangesChange={handleSelectedPriceRangesChange}
        />
        <ProductCardList products={products} />
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
