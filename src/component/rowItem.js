import React from "react";
import CustomTable from "./customTable";
import {orderHeaders,itemHeaders} from '../data/tableHeaders';

class RowItem extends React.Component {
  state = {
    showTable: false
  };
  handleClick = () => {
    this.setState({
      showTable: !this.state.showTable
    });
  };
  renderRow = (item, cols, level,rowHighLight) => {
    // handle the column data within each row
    let cells = [];
    cells =
      level !== 3
        ? [
            <td key={0}>
              <button onClick={() => this.handleClick()}>
                {this.state.showTable ? "-" : "+"}
              </button>
            </td>
          ]
        : [<td key={0}/>];
    let remainingCells = cols.map((colData,i) => {
      return <td key ={i+1}>{item[colData.dataIndex]}</td>;
    });
    cells.push(remainingCells);
    return <tr className={rowHighLight ? 'rowHighLight' :''}>{cells}</tr>;
  };
  render() {
    const { row, cols, level,rowHighLight } = this.props;
    return (
      <>
        {this.renderRow(row, cols, level, rowHighLight)}
        {this.state.showTable && (
          <tr>
            <td colSpan="4" className="tdStyle">
              <CustomTable
                level={parseInt(level + 1)}
                cols={level + 1 !== 3 ? orderHeaders : itemHeaders}
                data={level + 1 !== 3 ? row.orders : row.items}
                type="nested"
              />
            </td>
          </tr>
        )}
      </>
    );
  }
}

export default RowItem;
