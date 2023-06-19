const logoBaseURL = "https://www.mweb.co.za/media/images/providers";

export type Provider = {
  code: string;
  name: string;
  url: string;
  selected: boolean;
};

export const providerInfo: Provider[] = [
  {
    code: "frogfoot",
    name: "Frogfoot",
    url: `${logoBaseURL}/provider-frogfoot.png`,
    selected: false,
  },
  {
    code: "centurycity",
    name: "Century City Connect",
    url: `${logoBaseURL}/provider-century.png`,
    selected: false,
  },
  {
    code: "evotel",
    name: "Evotel",
    url: `${logoBaseURL}/provider-evotel.png`,
    selected: false,
  },
  {
    code: "octotel",
    name: "Octotel",
    url: `${logoBaseURL}/provider-octotel.png`,
    selected: false,
  },
  {
    code: "vumatel",
    name: "Vumatel",
    url: `${logoBaseURL}/provider-vuma.png`,
    selected: false,
  },
  {
    code: "openserve",
    name: "Openserve",
    url: `${logoBaseURL}/provider-openserve.png`,
    selected: false,
  },
  {
    code: "mfn",
    name: "MFN",
    url: `${logoBaseURL}/provider-metrofibre.png`,
    selected: false,
  },
  {
    code: "vodacom",
    name: "Vodacom",
    url: `${logoBaseURL}/provider-vodacom.png`,
    selected: false,
  },
  {
    code: "linkafrica",
    name: "Link Africa",
    url: `${logoBaseURL}/provider-linkafrica.png`,
    selected: false,
  },
  {
    code: "linklayer",
    name: "Link Layer",
    url: `${logoBaseURL}/provider-link-layer.png`,
    selected: false,
  },
  {
    code: "lightstruck",
    name: "Lightstruck",
    url: `${logoBaseURL}/provider-lightstruck.png`,
    selected: false,
  },
  {
    code: "mitchells",
    name: "Mitchells Fibre",
    url: `${logoBaseURL}/provider-mitchells.png`,
    selected: false,
  },
  {
    code: "vumareach",
    name: "Vuma Reach",
    url: `${logoBaseURL}/provider-vuma.png`,
    selected: false,
  },
];
