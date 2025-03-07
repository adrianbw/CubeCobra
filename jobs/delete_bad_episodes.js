
const Content = require('../dynamo/models/content');

(async () => {
  let lastKey = null;

  do {
    const result = await Content.getByTypeAndStatus(Content.TYPES.EPISODE, Content.STATUS.PUBLISHED, lastKey);
    lastKey = result.lastKey;

    const items = result.items.filter((item) => !item.url);

    if (items.length > 0) {
      console.log(`Found ${items.length} bad episodes.`);

      await Content.batchDelete(items.map((item) => ({ id: item.id })));
    }
  } while (lastKey);
    
  process.exit();
})();
