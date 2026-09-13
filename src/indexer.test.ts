import { describe, it } from "vitest";
import { createTestIndexer, type TokenizedStock_MultiplierUpdated } from "envio";

describe("TokenizedStock contract MultiplierUpdated event tests", () => {
  it("TokenizedStock_MultiplierUpdated is created correctly", async (t) => {
    const indexer = createTestIndexer();

    // Creating mock for TokenizedStock contract MultiplierUpdated event
    const event = {
      contract: "TokenizedStock" as const,
      event: "MultiplierUpdated" as const,
      params: {
        newMultiplier: 0n,
      },
    };

    await indexer.process({
      chains: {
        11155111: {
          simulate: [event],
        },
      },
    });

    // Getting the actual entity from the test indexer
    let actualTokenizedStockMultiplierUpdated = await indexer.TokenizedStock_MultiplierUpdated.getOrThrow("11155111_0_0");

    // Creating the expected entity
    const expectedTokenizedStockMultiplierUpdated = {
      id: "11155111_0_0",
      newMultiplier: event.params.newMultiplier,
      chainId: 11155111,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    t.expect(actualTokenizedStockMultiplierUpdated, "Actual TokenizedStockMultiplierUpdated should be the same as the expected TokenizedStockMultiplierUpdated").toEqual(expectedTokenizedStockMultiplierUpdated);
  });
});

describe("Indexer smoke test", () => {
  it("processes the first block with events on chain 11155111", async (t) => {
    const indexer = createTestIndexer();

    const result = await indexer.process({ chains: { 11155111: {} } });

    t.expect(result.changes.length, "Should have at least one change").toBeGreaterThan(0);
    const firstChange = result.changes[0]!;
    t.expect(firstChange.chainId).toBe(11155111);
    t.expect(firstChange.eventsProcessed).toBeGreaterThan(0);
  }, 60_000);
});
