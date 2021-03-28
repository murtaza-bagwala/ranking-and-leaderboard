const Tree = require('./balanced-binary-search-tree/tree');
const ObjectHelper = require('./utils/object-helper');
const logger = require('./config/winston-config');

class RankingService {
  constructor() {
    this._tree = new Tree();
  }

  addScore(score, playerId) {
    this._tree.insert(score, playerId);
  }

  getRank(score, playerId) {
    const { root } = this._tree;

    if (!root) {
      logger.info("tree doesn't have any root");
      return -1;
    }

    const node = this._tree.search(score);
    if (!node) {
      logger.info("Node doesn't found for this Score", score);
      return -1;
    }
    const index = node.value.indexOf(playerId);

    if (index == -1) {
      logger.info('Player not found for this score', playerId, score);
      return -1;
    }

    let rank = size(node.right) + 1;

    let anotherNode = node;

    while (!ObjectHelper.areObjectEqual(anotherNode, root)) {
      if (ObjectHelper.areObjectEqual(anotherNode, anotherNode.parent.left)) {
        rank = rank + size(anotherNode.parent.right) + 1;
      }
      anotherNode = anotherNode.parent;
    }

    return rank;
  }

  getSortedPlayerList() {
    const list = [];
    this._tree.reverseInOrder((node) => {
      const { value } = node;
      list.push(value);
    });
    return list.flat();
  }
}

function size(node) {
  return node ? node.size : 0;
}

module.exports = RankingService;
