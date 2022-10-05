import { useContext, useReducer } from "react";
import { Ordercontext, ordercontext } from "../../Store/Ordercontext";
import { Productcontext } from "../../Store/Productcontex";
import Orderitem from "./Orderitem/Orderitem";
import "./Checkout.css";
const Checkout = (props) => {
  const [orderedproduct, orderhandler] = useContext(Ordercontext);

  let total =
    orderedproduct.length > 0
      ? orderedproduct.reduce((total, num) => {
          return total + num.itemnumber * num.prise;
        }, 0)
      : 0;
  console.log("check render");
  console.log(orderedproduct);
  return (
    <div className="Checkout">
      <table className="ordertable">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th> product</th>
            {console.log("updared")}
            <th>Prise</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {orderedproduct.length > 0 ? (
            orderedproduct.map((item) => {
              return (
                <Orderitem
                  id={item.id}
                  item={item}
                  key={Math.random()}
                  image={item.image}
                  title={item.title}
                  prise={item.prise}
                  itemnumber={item.itemnumber}
                  total={item.prise * item.itemnumber}
                ></Orderitem>
              );
            })
          ) : (
            <tr>
              <td></td>
              <td></td>
              <td></td>

              <td></td>
              <td>
                <h3> cart is empty </h3>
              </td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="total">
        {orderedproduct.length > 0 ? <h3>subtotal is: £{total}</h3> : null}
        {orderedproduct.length > 0 ? <h2>total is: £{total}</h2> : null}
        {orderedproduct.length > 0 ? (
          <button
            onClick={() => {
              props.thank();
            }}
          >
            proceed for checkout
          </button>
        ) : null}
        <button
          onClick={() => {
            props.back();
          }}
        >
          back
        </button>
      </div>
    </div>
  );
};

export default Checkout;
