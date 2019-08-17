import React from "react";
import _ from "lodash";
import CheckBox from "./checkBox";
import { getFilteredData, getCheckedItemList } from "../utils/utils";

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBar: false,
      checkedItems: new Map()
    };
  }
  componentDidUpdate(prevProps) {
    const { customerList, itemList } = this.props;
    if (prevProps.customerList !== customerList) {
      const checkedItems = getCheckedItemList(customerList, itemList);
      this.setState({
        checkedItems: checkedItems
      });
    }
  }
  handleClick = () => {
    this.setState(
      {
        showBar: !this.state.showBar
      },
      () => {
        if (this.state.showBar) {
          document.getElementById("mySidebar").style.width = "250px";
          document.getElementById("main").style.marginLeft = "300px";
        } else {
          document.getElementById("main").style.marginLeft = "0";
        }
      }
    );
  };

  handleChange = e => {
    const item = e.target.id;
    const isChecked = e.target.checked;
    this.setState(
      prevState => ({
        checkedItems: prevState.checkedItems.set(item, isChecked)
      }),
      () => {
        const { customerList } = this.props;
        const { checkedItems } = this.state;

        let shallowList = _.cloneDeep(customerList);
        const filterData = getFilteredData(shallowList, checkedItems);
        console.log("data", filterData);
        this.props.handleAction(filterData);
      }
    );
  };
  render() {
    const { customerList, itemList } = this.props;
    const { showBar, checkedItems } = this.state;
    return (
      <>
        {showBar && (
          <div id="mySidebar" className="sidebar">
            {customerList.length > 0 && (
              <div className="checkList">
                <h3>Customers</h3>
                <ul>
                  {customerList.map((customer, index) => {
                    return (
                      <CheckBox
                        key={index}
                        id={customer._id}
                        name={customer.name}
                        checked={checkedItems.get(customer._id)}
                        onChange={e => this.handleChange(e)}
                      />
                    );
                  })}
                </ul>
              </div>
            )}
            {itemList.length > 0 && (
              <div className="checkList">
                <h3>Items</h3>
                <ul>
                  {itemList.map((item, index) => {
                    return (
                      <CheckBox
                        key={index}
                        id={item.itemId}
                        name={item.itemName}
                        checked={checkedItems.get(item.itemId)}
                        onChange={e => this.handleChange(e)}
                      />
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        )}

        <div id="main">
          <button className="openbtn" onClick={() => this.handleClick()}>
            {showBar ? "Hide Filter" : "Show Filter"}
          </button>
        </div>
      </>
    );
  }
}
export default SideBar;
