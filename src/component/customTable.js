import React from "react";
import RowItem from "./rowItem";

class CustomTable extends React.Component {
  generateHeaders = cols => {
    // generate our header (th) cell components
    let columns = cols.map((colData, index) => {
      return <th key={index + 1}> {colData.title} </th>;
    });
    columns.unshift(<th key={0} />);
    return columns;
  };

  generateRows = (data, cols, level) => {
    return data.map((item, i) => {
      return (
        <RowItem
          key={i}
          row={item}
          cols={cols}
          level={level}
          rowHighLight={level === 1 && item.rowHighLight}
        />
      );
    });
  };

  render() {
    const { cols, data, type, level } = this.props;
    const headerComponents = this.generateHeaders(cols);
    const rowComponents = this.generateRows(data, cols, level);
    const cellSpacing =
      (level === 2 && "levelTwo") || (level === 3 && "levelThree");
    const expandIcon =
      (level === 2 && "expandTwo") || (level === 3 && "expandThree");

    return (
      <div
        className={type === "nested" ? `nested-table ${expandIcon}` : undefined}
      >
        <table className="table table-bordered">
          <thead className={`thead-style ${cellSpacing}`}>
            <tr>{headerComponents}</tr>
          </thead>
          <tbody>{rowComponents}</tbody>
        </table>
      </div>
    );
  }
}

export default CustomTable;
