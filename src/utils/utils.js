export const getItemList = (data = [], itemList = []) => {
  data.forEach(value => {
    if (value && value.items && value.items.length) {
      const { items } = value;
      itemList = items.reduce((acc, currentVal) => {
        if (acc.length === 0) {
          acc.push(currentVal);
        } else if (!acc.find(obj => obj.itemId === currentVal.itemId)) {
          acc.push(currentVal);
        }
        return acc;
      }, itemList);
    } else {
      getItemList(value && value.orders, itemList);
    }
  });
  return itemList;
};

const getItems = (items=[],checkedItems) => {
    return items.filter(item => {
        return (
          checkedItems.get(item.itemId) === true ||
          checkedItems.get(item.itemId) === undefined
        );
      });
}
const getOrders = (orders=[],checkedItems)=>{
    return orders.filter(order => {
        const { items = [] } = order;
        const newItems = getItems(items,checkedItems);
        order.items = newItems;
        return order.items;
      });
}
export const getFilteredData = (customerList, checkedItems) => {
  return customerList.filter(customer => {
    if (
      checkedItems.get(customer._id) === true ||
      checkedItems.get(customer._id) === undefined
    ) {
      const { orders = [] } = customer;
       const newOrder = getOrders(orders,checkedItems)
       customer.orders = newOrder;
       return customer.orders;
    }
    return '';
  });
};
