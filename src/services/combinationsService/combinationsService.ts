const GRAPH_CMS_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NTE2ODM5NzcsImF1ZCI6WyJodHRwczovL2FwaS1zYS1lYXN0LTEuZ3JhcGhjbXMuY29tL3YyL2NsMnFweml5cTBvcHYwMXoyNnEzazk0YjYvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiOTJkOTYyOTYtYmIxOS00NzM2LThjMDktMTFjNjlhYThjMjAxIiwianRpIjoiY2wycnR6dHE4MjBlMDAxejgwOWk0MHYzYSJ9.Y9pnBS_PPkL9dbSmvIwcdy2mUCE-CcBQpQBz4k7rq9ZBVZaKTP-Urco8Xj3LU1-M6sAfbVHIjfw9PLdwaOH5NZa8pv7tlVb6K8p5QgzgdRTO7SjaDpLNXYy4uVvtBZ_zJ24LUt-JOXbKUBdulDDHO5vHI10pTYJ9GzSNEdsxrdkcUAOhP2s_yK7E3m3DDNqkyooEIpE5QqZo4M1IvJ6h9CnwxE8dman_SQHRjNtRCMqB_m8b8Sc-653rM8Gr9MkDHT1bGLXInzTXvkRaCWIcpZuuOLQ8lNUbp0UGQWgCP3bFOxY8dj7xsNoiuHSvmZP6-e9qP1Dels9ym3gHJTcVxX7J7EKTglrtjAWqyb727i_ZKJSBDcpkRDqDxQz7oI4yxFQy7QHrHbUj2y7a_zu5neV4i01UzDaqLsHUqhp0qihQbYO77hfyShCoPRs2N2wkAXoBXUekbrAnyyxmWK8DezBvftbpbkSHqHOI_IB3ZxQT-IUJb1ptxv5xXwn6vbCjo4a7ML2EY6-mB8j0CBaNJQ3oAtwclWHepUfxjHzYemfiBI6CLw7wZ1Rn_k8QbtW3hVy7rfblT1dFo9zU_3BoHic770XE8SkftU8a5HTj1x2Pio2bkMjVYfuzr8OzaZqQ8cCJc-Ho7GUfDVO0-vP1fTodikcwjRO3Of59lH02lJY';

export function combinationsService() {
  return {
    async getCombinationOf(item1, item2) {
      const result = await this.getCombinationsOf(item1);

      return result.cantCombines;
    },
    async getCombinationsOf(itemName) {
      const query = `
        query($itemName: String!) {
          cantCombines(where: {items_some: {name_contains: $itemName}}) {
            id
            name
            items {
              name
            }
            description
          }
        }      
      `;

      const combinationsData = await fetch('https://api-sa-east-1.graphcms.com/v2/cl2qpziyq0opv01z26q3k94b6/master', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GRAPH_CMS_TOKEN}`,
        },
        body: JSON.stringify({
          query,
          variables: {
            itemName,
          }
        }),
      })
      .then(async (res) => {
        const data = await res.json();
        return data;
      });
      return combinationsData.data;      
    },
    async getAllItems() {
      const optionsData = await fetch('https://api-sa-east-1.graphcms.com/v2/cl2qpziyq0opv01z26q3k94b6/master', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GRAPH_CMS_TOKEN}`,
        },
        body: JSON.stringify({
          query: `
            query {
              items {
                id 
                name
              }
            }
          `,
        }),
      })
      .then(async (res) => {
        const data = await res.json();
        return data;
      })

      return [
        ...optionsData.data.items.map((item) => {
          return item.name;
        }),
        '',
      ];
    },
  };
}
