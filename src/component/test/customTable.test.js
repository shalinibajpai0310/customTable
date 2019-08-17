import React from "react";
import { shallow } from "enzyme";
import CustomTable from "../customTable";
import { customerHeaders,itemHeaders,orderHeaders } from "../../data/tableHeaders";
import { mockState } from "../../data/mockData";

describe("<CustomTable />", () => {
  it("renders without crashing with level 1", () => {
    const wrapper = shallow(
      <CustomTable
        cols={customerHeaders}
        data={mockState.customers}
        level={1}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("renders without crashing with level 2", () => {
    const wrapper = shallow(
      <CustomTable
        cols={orderHeaders}
        data={mockState.customers}
        level={2}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("renders without crashing with level 3", () => {
    const wrapper = shallow(
      <CustomTable
        cols={itemHeaders}
        data={mockState.customers}
        level={3}
        type="nested"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
