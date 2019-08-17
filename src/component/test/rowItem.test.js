import React from "react";
import { shallow,mount } from "enzyme";
import RowItem from "../rowItem";
import { customerHeaders,itemHeaders } from "../../data/tableHeaders";

describe("<RowItem />", () => {
    const item = {
        _id: "customer_0",
        index: 0,
        age: 31,
        name: "Price Valdez",
        email: "pricevaldez@metroz.com",
        phone: "+1 (804) 410-3749",
        address: "789 Remsen Avenue, Washington, Louisiana, 7638",
        orders: [],
        items:[]
      };
  it("renders without crashing", () => {
    const wrapper = shallow(
      <RowItem
        key={0}
        row={item}
        cols={customerHeaders}
        level={1}
        rowHighLight={true}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("simulate click event", () => {
    const wrapper = shallow(
      <RowItem
        key={0}
        row={item}
        cols={customerHeaders}
        level={1}
        rowHighLight={true}
      />
    );
    wrapper.find('button').simulate('click');
    expect(wrapper.state('showTable')).toEqual(true);
  });

  it("renders nested list", () => {
    const wrapper = shallow(
      <RowItem
        key={0}
        row={item}
        cols={itemHeaders}
        level={3}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
