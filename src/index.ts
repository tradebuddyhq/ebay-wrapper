export { EbayError } from "./types.js";
export type { ClientOptions, BrowseSearchParams, ItemSummary, Environment } from "./types.js";

import type { ClientOptions } from "./types.js";
import { BrowseAPI } from "./buy/browse.js";

export class Client {
  public buy: {
    browse: BrowseAPI;
  };

  constructor(options: ClientOptions) {
    this.buy = {
      browse: new BrowseAPI(options),
    };
  }
}
