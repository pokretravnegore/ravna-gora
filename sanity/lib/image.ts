import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => builder.image(source);

export type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
};
