import React from "react";
import "./App.css";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchCustomers,updateCustomerList} from './actions/action';
import CustomTable from "./component/customTable";
import {customerHeaders} from './data/tableHeaders';
import SideBar from './component/sideBar';
import {getItemList} from './utils/utils';

class App extends React.Component{
  componentDidMount(){
    const {fetchCustomers} = this.props;
    fetchCustomers();
  }

  render(){
    const {customerList = [],origCustomerList=[],updateCustomerList} = this.props;
    let itemList = [];
    itemList = getItemList(origCustomerList,itemList);
    return (
      <div>
        <div className="row">
          <div className="col-xs-2">
            <SideBar customerList={origCustomerList} handleAction={updateCustomerList} itemList={itemList}/>
          </div>
          <div className="col-xs-10">
          <h1>Expandable Rows Demo</h1>
          <CustomTable cols={customerHeaders} data={customerList} level={1}/>
          </div>
        </div>
      </div>
    );
  }
  
}

const mapStateToProps = (state) => ({
  customerList: state.customerReducer.customers,
  origCustomerList:state.customerReducer.origCustomerList
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    fetchCustomers,
    updateCustomerList
  },
  dispatch,
)

export default connect(mapStateToProps,
  mapDispatchToProps
)(App );
