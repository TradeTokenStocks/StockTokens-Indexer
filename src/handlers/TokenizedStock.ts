/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import { indexer } from "envio";
import type {
  TokenizedStock_MultiplierUpdated,
} from "envio";

indexer.onEvent({ contract: "TokenizedStock", event: "MultiplierUpdated" }, async ({ event, context }) => {
  const entity: TokenizedStock_MultiplierUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    newMultiplier: event.params.newMultiplier,
    contractAddress: event.srcAddress,
    blockNumber: event.block.number,
  };

  context.TokenizedStock_MultiplierUpdated.set(entity);
});
