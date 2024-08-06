// utils/metadataUtils.ts

export function generateMetadata(id: string) {
  const cleanId = id.replace('.json', '');
  return {
    platform: "Degen POV",
    name: `Degen POV Whitepaper NFT #${cleanId}`,
    background_color: "26437d",
    curation_status: "curated",
    series: "1",
    description: "Congratulations, degen!\n\nYou got an exclusive NFT of the Degen POV Whitepaper.\nOnly given to the biggest degens.\n\nHow do we know you're a degen?\nYou got this NFT didn't you?",
    external_url: `https://degenpov.me/whitepaper/${cleanId}`,
    collection_name: "Degen POV Whitepaper",
    attributes: [
      { trait_type: "Degen Level", value: "Maximum" },
      { trait_type: "Type", value: "Interactive Whitepaper" }
    ],
    animation_url: `https://degenpov.me/whitepaper/${cleanId}`,
    image: "https://degenpov.me/whitepaper/degenpovcover.png",
    interactive_nft: {
      code_uri: `https://degenpov.me/whitepaper/${cleanId}`,
      version: "1.0"
    },
    properties: {
      cover_image: "https://degenpov.me/whitepaper/degenpovcover.png",
      website: "https://degenpov.me/",
      whitepaper: "https://degenpov.me/whitepaper/degenpovwhitepaper.pdf",
      linktree: "https://linktr.ee/degenpovcto"
    }
  };
}
