const chai = require('chai');

const { expect } = chai;
const RankingService = require('../ranking-service');

describe('When Ranking Service gets called', () => {
  const rankingService = new RankingService();

  it("returns -1 if tree doesn't have node", () => {
    const result = rankingService.getRank(1, 1);
    expect(result).to.eq(-1);
  });

  it("returns -1 if tree doesn't have any node with particular score", () => {
    rankingService.addScore(10, 1);
    const result = rankingService.getRank(11, 1);
    expect(result).to.eq(-1);
  });

  it("returns -1 if node doesn't have playerId stored", () => {
    const result = rankingService.getRank(11, 2);
    expect(result).to.eq(-1);
  });

  it('returns rank for the player', () => {
    rankingService.addScore(11, 2);
    rankingService.addScore(12, 4);
    rankingService.addScore(13, 3);
    rankingService.addScore(14, 7);
    rankingService.addScore(9, 5);

    let result = rankingService.getRank(14, 7);
    expect(result).to.eq(1);

    result = rankingService.getRank(13, 3);
    expect(result).to.eq(2);

    result = rankingService.getRank(12, 4);
    expect(result).to.eq(3);

    result = rankingService.getRank(9, 5);
    expect(result).to.eq(6);

    result = rankingService.getRank(11, 2);
    expect(result).to.eq(4);
  });

  it('returns same rank if 2 players has same score', () => {
    rankingService.addScore(9, 6);
    const result = rankingService.getRank(9, 6);
    expect(result).to.eq(6);
  });

  describe('when getSortedPlayerList gets called', () => {
    it('returns sorted list using reverse in order way', () => {
      const result = rankingService.getSortedPlayerList();
      expect(result[0]).to.eq(7);
      expect(result[1]).to.eq(3);
      expect(result[2]).to.eq(4);
      expect(result[3]).to.eq(2);
      expect(result[4]).to.eq(1);
      expect(result[5]).to.eq(5);
      expect(result[6]).to.eq(6);
    });
  });
});
