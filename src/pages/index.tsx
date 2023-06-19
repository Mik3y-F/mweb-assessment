import CampaignPicker from "@/components/campaigns/CampaignPicker";
import { fetchCampaigns } from "@/components/campaigns/hooks";
import { PriceRangeFilter } from "@/components/products/PriceRangeFilter";
import { ProductCardList } from "@/components/products/ProductCardList";
import { useProductSelection } from "@/components/products/hooks";
import { ProviderPicker } from "@/components/providers/ProviderPicker";
import { type InferGetServerSidePropsType } from "next";
import Head from "next/head";

// TODO: Add a ui loading and error state for the queries (campaign and products)

const Home = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { campaignRes: preloadedCampaignResponse } = props;
  const {
    products,

    selectedCampaign,
    campaignQuery,

    priceRanges,
    providers,

    handleSelectedCampaignChange,
    handleSelectedPriceRangesChange,
    handleSelectedProvidersChange,
  } = useProductSelection(preloadedCampaignResponse);

  return (
    <>
      <Head>
        <title>Mweb - Fibre</title>
        <meta name="description" content="Mweb Fibre Products" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-screen bg-slate-50 text-center">
        <h1 className="my-2 text-3xl font-bold">Fibre products</h1>
        <div className="text mb-4 mt-2">
          Select a fibre infrastructure provider below, browse the products
          available and complete a coverage search
        </div>
        <ProviderPicker
          providers={providers}
          handleSelectedProvidersChange={handleSelectedProvidersChange}
        />
        <div className="text-center">
          <CampaignPicker
            selectedCampaign={selectedCampaign?.code}
            handleSelectedCampaignChange={handleSelectedCampaignChange}
            campaigns={campaignQuery.data?.campaigns || []}
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
