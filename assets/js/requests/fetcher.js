class Fetcher {
  constructor() {
    //this.baseURL = 'http://localhost:3000/api/teddies/';
    this.baseURL = 'http://192.168.1.21:3000/api/teddies/';
  }
  async fetchItem(/*str*/id) {
    const jsonData = await fetch(this.baseURL + id);
    const itemData = await jsonData.json();
    return itemData;
  }
  async fetchSomeItems(/*arr*/ids) {
    const uniqueIds = [...new Set(ids)];
    const promises = [];
    uniqueIds.forEach(id => {
      promises.push(this.fetchItem(id))
    });
    const fetchedItems = await Promise.all(promises);
    return fetchedItems;
  }
  async fetchAllItems() {
    const allItems = await this.fetchItem('');
    return allItems;
  }
}

const fetcher = new Fetcher();

export default fetcher;