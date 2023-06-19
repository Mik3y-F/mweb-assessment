import CampaignPicker from "@/components/campaigns/CampaignPicker";
import { fetchCampaigns } from "@/components/campaigns/hooks";
import { ProductCardList } from "@/components/products/ProductCardList";
import { ProductFilterMenuBar } from "@/components/products/ProductFilterMenuBar";
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
      <div className="h-full min-h-screen bg-slate-100 px-4 text-center md:px-16">
        <h1 className="py-2 pt-16 text-3xl font-bold md:pt-28">
          Fibre products
        </h1>
        <div className="text pb-8 pt-2">
          Pick a fibre provider, explore their products and complete a coverage
          search.
        </div>
        <ProviderPicker
          providers={providers}
          handleSelectedProvidersChange={handleSelectedProvidersChange}
        />
        <div className="flex flex-wrap gap-2 pt-4 md:gap-8">
          <div className="w-1/6 min-w-fit">
            <CampaignPicker
              selectedCampaign={selectedCampaign?.code}
              handleSelectedCampaignChange={handleSelectedCampaignChange}
              campaigns={campaignQuery.data?.campaigns || []}
            />
          </div>
          <div>
            <ProductFilterMenuBar
              priceRanges={priceRanges}
              handleSelectedPriceRangesChange={handleSelectedPriceRangesChange}
              providers={providers}
              handleSelectedProvidersChange={handleSelectedProvidersChange}
            />
          </div>
        </div>

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
