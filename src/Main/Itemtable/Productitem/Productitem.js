import React, { useContext, useMemo, useRef } from "react";
import { Ordercontext } from "../../../Store/Ordercontext";
import "./Productitem.css";
import { FaStoreAlt } from "react-icons/fa";

const Productitem = (props) => {
  let checkinputref = useRef();
  let inputitemref = useRef();

  const [orderedproduct, orderhandler] = useContext(Ordercontext);

  const checkchangehandler = () => {
    let orderedobj = {};
    orderedobj.id = props.item.id;
    orderedobj.image = props.item.image;
    orderedobj.title = props.item.title;
    {
      if (parseInt(inputitemref.current.value) > 0) {
        orderedobj.itemnumber = parseInt(inputitemref.current.value);
      } else {
        orderedobj.itemnumber = 1;
      }
    }
    orderedobj.prise = props.item.prise;
    orderedobj.checked = checkinputref.current.checked;
    if (orderedobj.checked && orderedobj.itemnumber > 0) {
      orderhandler({ type: "firstadd", obj: orderedobj });
    } else if (!orderedobj.checked) {
      orderhandler({ type: "remove", obj: orderedobj });
    }
  };

  const valuechangehandler = (e) => {
    let orderedobj = {};
    orderedobj.id = props.item.id;
    orderedobj.image = props.item.image;
    orderedobj.title = props.item.title;
    {
      if (parseInt(inputitemref.current.value) > 0) {
        orderedobj.itemnumber = parseInt(inputitemref.current.value);
      } else {
        orderedobj.itemnumber = 1;
      }
    }
    orderedobj.prise = props.item.prise;
    orderedobj.checked = checkinputref.current.checked;
    if (orderedobj.checked) {
      orderhandler({ type: "adder", obj: orderedobj });
    }
  };

  return (
    <tr className="Productitem" key={props.item.id}>
      <td>
        <img className="productimg" src={props.item.image} alt="pic" />
      </td>
      <td>{props.item.title}</td>
      <td>{props.item.color}</td>
      <td className={props.item.stock > 0 ? "instock" : "notavail"}>
        {props.item.stock > 0 ? "in stock" : "not available"}
      </td>
      <td className="productprise">£{props.item.prise}</td>
      <td className="numinput">
        <input
          min="1"
          max="15"
          className="numinput"
          type="number"
          defaultValue={1}
          onChange={valuechangehandler}
          ref={inputitemref}
        />
        <span className="ordericon">
          <FaStoreAlt></FaStoreAlt>
        </span>
        <input
          className="check"
          type="checkbox"
          id={props.item.id}
          onChange={checkchangehandler}
          value={props.item.id}
          ref={checkinputref}
        />
      </td>
    </tr>
  );
};

export default React.memo(Productitem);
