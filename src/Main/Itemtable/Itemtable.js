import { useContext } from "react";
import { Productcontext } from "../../Store/Productcontex";
import "./Itemtable.css";
import Productitem from "./Productitem/Productitem";

const Itemtable = (props) => {
  return (
    <div className="Itemtable">
      <table className="producttable">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Color</th>
            <th>Stock</th>
            <th>Prise</th>
            <th>buy</th>
          </tr>
        </thead>
        <tbody>
          {props.products.length > 0 ? (
            props.products.map((item) => {
              return (
                <Productitem key={Math.random()} item={item}></Productitem>
              );
            })
          ) : (
            <tr>
              <td></td>
              <td></td>
              <td>
                <h3> no data found </h3>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Itemtable;
