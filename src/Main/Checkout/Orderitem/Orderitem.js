import React, { useContext, useMemo, useRef } from "react";
import { Ordercontext, Updatedordercontext } from "../../../Store/Ordercontext";
import "./Orderitem.css";
import { FaTrash } from "react-icons/fa";

const Orderitem = (props) => {
  let checkinputref = useRef();
  let inputitemref = useRef();

  const [orderedproduct, orderhandler] = useContext(Ordercontext);

  const deletehandler = () => {
    orderhandler({ type: "delete", obj: props.item });
  };
  const plushandler = () => {
    orderhandler({ type: "plus", obj: props.item });
  };
  const minushandler = () => {
    orderhandler({
      type: props.item.itemnumber > 1 ? "minus" : "delete",
      obj: props.item,
    });
  };
  console.log("orderrerander");
  return (
    <tr className="Orderitem" key={props.id}>
      <td onClick={deletehandler}>
        <span className="deletebtn">
          <FaTrash />
        </span>
      </td>

      <td>
        <img className="productimg" src={props.image} alt="pic" />
      </td>
      <td>{props.title}</td>
      <td>£{props.prise}</td>
      <td className="quantity">
        <span className="plus" onClick={plushandler}>
          +
        </span>
        <span className="orderqnty">{props.itemnumber}</span>
        <span className="minus" onClick={minushandler}>
          -
        </span>
      </td>
      <td>£{props.total}</td>
    </tr>
  );
};

export default React.memo(Orderitem);
