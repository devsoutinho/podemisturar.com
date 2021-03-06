const CMS_URL = 'https://graphql.datocms.com/';
const CMS_TOKEN = 'e1e8047dfb5731b327160a82d55394';
const fetchOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${CMS_TOKEN}`,
  },
};
async function handleFetch(res) {
  const data = await res.json();
  return data;
}

export function combinationsService() {
  return {
    async getCombinationOf(item1, item2) {
      const firstItem = (await this.getAllItems())
      .find((i) => i.slug === item1);
      
      console.log('firstItem', item1);
      const combination = (await this.getCombinationsOf(firstItem.id))
      const result = combination.filter((c) => {
        const { combinationOfItems } = c;
        return combinationOfItems.find(i => i.slug === item2);
      });
    
      return result ? result[0] : {};
    },
    async getCombinationsOf(itemId) {
      console.log(itemId);
      const combinationsData = await fetch(CMS_URL, {
        ...fetchOptions,
        body: JSON.stringify({
          query: `
            query ($itemId: [ItemId]) {
              allCombinations(first: 100, filter: {combinationOfItems: {allIn: $itemId}}) {
                canCombine
                combinationOfItems {
                  title
                  id
                  slug
                  alternateTitle {
                    id
                    title
                    slug
                  }
                }
                reason
                explanation {
                  value
                }
              }
            }
          `,
          variables: {
            itemId
          }
        }),
      }).then(handleFetch);

      return combinationsData.data.allCombinations;
    },
    async getAllItems() {
      const optionsData = await fetch(CMS_URL, {
        ...fetchOptions,
        body: JSON.stringify({
          query: `
            query {
              allItems(first: 100) {
                id
                title
                slug
                alternateTitle {
                  id
                  title
                  slug
                }
              }
            }
          `,
        }),
      }).then(handleFetch);

      return optionsData.data.allItems;
    },
    reduceCombinationsToSelection(combinations = [], selection = '') {
      if(combinations.length === 0) return combinations;
      
      console.log('selection', selection);

      const result = combinations
      .reduce((acc, item) => {
        return [
          ...acc,
          ...item.combinationOfItems,
        ]
      }, [])
      .map((item) => {
        const hasAlternateTitleEqualSelection = Boolean(item.alternateTitle.find(i => i.title === selection));
        console.log(hasAlternateTitleEqualSelection);

        if(hasAlternateTitleEqualSelection) return undefined;

        return item.title;
      })
      .filter(Boolean)
      .filter((item) => {
        const isDifferentFromSelection = item !== selection;
        if(isDifferentFromSelection) return true;
        return false;
      });
      return Array.from(new Set(result));
    }
  };
}
