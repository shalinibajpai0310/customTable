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

const getItems = (items=[],checkedItems,customer) => {
    return items.filter(item => {
      if(checkedItems.get(item.itemId) === true ||
      checkedItems.get(item.itemId) === undefined){
        return item;
      }else{
        customer.rowHighLight=true;
        return '';
      }
      });
}
const getOrders = (orders=[],checkedItems,customer)=>{
    return orders.filter(order => {
        const { items = [] } = order;
        const newItems = getItems(items,checkedItems,customer);
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
       const newOrder = getOrders(orders,checkedItems,customer)
       customer.orders = newOrder;
       return customer.orders;
    }
    return '';
  });
};

export const getCheckedItemList = (customerList=[],itemList=[]) =>{
  let checkedItems =  new Map()
  customerList.map(customer=>checkedItems.set(customer._id,true));
  itemList.map(item=>checkedItems.set(item.itemId,true));
  return checkedItems;
}