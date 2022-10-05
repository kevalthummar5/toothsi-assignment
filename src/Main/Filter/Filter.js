import { useContext, useState } from "react";
import { Ordercontext } from "../../Store/Ordercontext";
import { Productcontext } from "../../Store/Productcontex";
import "./Filter.css";

import { FaUndoAlt } from "react-icons/fa";

const Filter = (props) => {
  let itemfilter = props.products.map((data) => data.title);

  let sizefilter1 = props.products.map((data) => data.size.split(","));

  let sizefilter = [];
  sizefilter1.map((data) => {
    return sizefilter.includes(data) ? null : sizefilter.push(...data);
  });

  let finalsizefilter = [];
  sizefilter.map((data) => {
    if (finalsizefilter.includes(data)) {
      return null;
    } else {
      return finalsizefilter.push(data);
    }
  });

  const itemchangehandler = (event) => {
    props.filter({ type: "item", term: event.target.value });
  };
  const sizechangehandler = (event) => {
    props.filter({ type: "size", term: event.target.value });
  };
  const searchhandler = (event) => {
    props.filter({ type: "search", term: event.target.value });
  };
  const resethandler = (event) => {
    props.filter({ type: "reset" });
  };
  console.log("filter render");
  console.log(props.filterobj.item);

  return (
    <div className="Filter">
      <select onChange={itemchangehandler} value={props.filterobj.item}>
        <option defaultValue="">Item</option>
        {itemfilter.map((data) => {
          return (
            <option key={data} value={data}>
              {data}
            </option>
          );
        })}
      </select>
      <select onChange={sizechangehandler} value={props.filterobj.size}>
        <option defaultValue="">Size</option>
        {finalsizefilter.map((data) => {
          return (
            <option key={data} value={data}>
              {data}
            </option>
          );
        })}
      </select>
      <span className="reset" onClick={resethandler}>
        <h4>
          <FaUndoAlt />
        </h4>{" "}
        Reset
      </span>
      <div className="search">
        <label>Search : </label>
        <input
          type="text"
          onChange={searchhandler}
          value={props.filterobj.search}
        />
      </div>

      <button
        className="addcart"
        onClick={() => {
          props.checkout();
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Filter;
