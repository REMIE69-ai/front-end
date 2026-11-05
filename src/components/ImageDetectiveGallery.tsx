
import React, { useEffect, useState } from "react";

const topics = [
  "family picnic in a park", "golden dog in a garden",
  "school classroom", "bicycle on a country road",
  "tropical fruit", "red bus on a city street",
  "mountain lake", "fishing boat", "football match",
  "outdoor market", "giraffe", "elephant",
  "butterfly on a flower", "tropical bird", "kitten",
  "school backpack", "wooden toy train", "science classroom",
  "storybooks", "kite in the sky", "rainy street",
  "beach and shells", "waterfall", "village garden",
  "matooke and beans", "glass of milk", "football boots",
  "school library", "playground", "small house",
  "cartoon robot", "space rocket", "fantasy castle",
  "dinosaur", "storybook dragon", "solar panels",
  "water tap", "pedestrian crossing", "computer desk",
  "mobile phone", "sunflower field", "running shoes",
  "tomatoes at a market", "ducks on a pond",
  "paper airplane", "school bus", "traditional drum",
  "camping tent", "lion in savannah", "sun and clouds"
];

type ImageResult = {
  url: string;
  page: string;
  title: string;
  creator: string;
  license: string;
  verifiedAI: boolean;
};

async function findCommonsImage(
  topic: string,
  ai: boolean
): Promise<ImageResult | null> {
  const query = ai
    ? `"AI-generated" ${topic}`
    : `${topic} photograph`;

  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: `filetype:bitmap ${query}`,
    gsrnamespace: "6",
    gsrlimit: "10",
    prop: "imageinfo|categories",
    iiprop: "url|extmetadata",
    iiurlwidth: "640",
    cllimit: "30",
    format: "json",
    origin: "*"
  });

  try {
    const response = await fetch(
      `https://commons.wikimedia.org/w/api.php?${params}`
    );

    if (!response.ok) return null;

    const data = await response.json();
    const pages = Object.values(data.query?.pages || []) as any[];

    for (const page of pages) {
      const info = page.imageinfo?.[0];
      if (!info?.thumburl || !info?.descriptionurl) continue;

      const categories = (page.categories || [])
        .map((category: any) => category.title.toLowerCase());

      const title = (page.title || "").toLowerCase();

      const verifiedAI =
        categories.some((category: string) =>
          /ai.generated|artificial.intelligence.generated|generated.by.ai/.test(category)
        ) ||
        /ai.generated|generated.by.ai/.test(title);

      // Never present an unverified image as AI-generated.
      if (ai && !verifiedAI) continue;

      const metadata = info.extmetadata || {};

      return {
        url: info.thumburl,
        page: info.descriptionurl,
        title: page.title,
        creator: metadata.Artist?.value
          ?.replace(/<[^>]*>/g, "") || "Creator not listed",
        license: metadata.LicenseShortName?.value || "Check source licence",
        verifiedAI
      };
    }

    return null;
  } catch (error) {
    console.error("Commons image lookup failed:", error);
    return null;
  }
}

function ImageSlot({
  image,
  loading,
  label
}: {
  image: ImageResult | null;
  loading: boolean;
  label: string;
}) {
  if (loading) {
    return <div className="ca-image-placeholder">Finding image...</div>;
  }

  if (!image) {
    return (
      <div className="ca-image-placeholder">
        <strong>Image unavailable</strong>
        <p>No suitable verified image was found.</p>
      </div>
    );
  }

  return (
    <div>
      <img
        src={image.url}
        alt={label}
        loading="lazy"
        className="ca-gallery-image"
      />
      <p className="ca-image-credit">
        {image.creator} · {image.license}
      </p>
      <a href={image.page} target="_blank" rel="noreferrer">
        View original and licence ↗
      </a>
    </div>
  );
}

export default function ImageDetectiveGallery() {
  const [images, setImages] = useState<
    Record<number, { photo: ImageResult | null; ai: ImageResult | null }>
  >({});
  const [loading, setLoading] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadImages() {
      for (let i = 0; i < topics.length; i++) {
        if (cancelled) break;

        setLoading(previous => [...previous, i]);

        const [photo, ai] = await Promise.all([
          findCommonsImage(topics[i], false),
          findCommonsImage(topics[i], true)
        ]);

        if (cancelled) break;

        setImages(previous => ({
          ...previous,
          [i]: { photo, ai }
        }));

        setLoading(previous => previous.filter(item => item !== i));
        setLoadedCount(previous => previous + 1);
      }
    }

    loadImages();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredTopics = topics
    .map((topic, index) => ({ topic, index }))
    .filter(item =>
      item.topic.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <section className="ca-gallery">
      <h2>Image Detective Gallery</h2>

      <p>
        Explore 50 topics and compare photographs with AI-generated
        artwork. Check the source and evidence before deciding.
      </p>

      <p>
        <strong>{loadedCount}/50 topics searched</strong>
      </p>

      <input
        value={search}
        onChange={event => setSearch(event.target.value)}
        placeholder="Search gallery topics..."
      />

      <div className="ca-pair-grid">
        {filteredTopics.map(({ topic, index }) => {
          const result = images[index];
          const isLoading = loading.includes(index);

          return (
            <article className="ca-pair" key={index}>
              <h3>Pair {index + 1}: {topic}</h3>

              <div className="ca-pair-images">
                <div>
                  <span className="ca-chip">Photograph</span>
                  <ImageSlot
                    image={result?.photo || null}
                    loading={isLoading && !result}
                    label={`Photograph: ${topic}`}
                  />
                </div>

                <div>
                  <span className="ca-chip">Verified AI artwork</span>
                  <ImageSlot
                    image={result?.ai || null}
                    loading={isLoading && !result}
                    label={`AI-generated artwork: ${topic}`}
                  />
                </div>
              </div>

              <div className="ca-pair-explanation">
                <strong>Detective challenge</strong>
                <p>
                  What details can you observe? Who created this image?
                  Can you find its original source? Does another
                  trustworthy source confirm the story?
                </p>
                <strong>Remember:</strong>
                <p>
                  A visual clue alone cannot prove that an image is
                  real or AI-generated. Always check its history
                  and source.
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
