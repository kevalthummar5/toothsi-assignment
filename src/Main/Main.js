import { useEffect, useReducer, useState } from "react";
import { Ordercontext, ordercontext } from "../Store/Ordercontext";
import { Productcontext } from "../Store/Productcontex";
import Checkout from "./Checkout/Checkout";
import Filter from "./Filter/Filter";
import Itemtable from "./Itemtable/Itemtable";
import "./main.css";
import Thank from "./Thank/Thank";

const Main = () => {
  const filterreducer = (filterobj, action) => {
    switch (action.type) {
      case "item":
        if (action.term.toLowerCase() == "item") {
          filterobj.item = "";
        } else {
          filterobj.item = action.term;
        }
        break;
      // return filterobj;
      case "search":
        filterobj.search = action.term;
        break;
      // return filterobj;
      case "size":
        if (action.term.toLowerCase() == "size") {
          filterobj.size = "";
        } else {
          filterobj.size = action.term;
        }
        break;
      // return filterobj;
      case "reset":
        filterobj.item = "";
        filterobj.search = "";
        filterobj.size = "";
        break;
      default:
    }
    console.log(filterobj);
    return filterobj;
  };

  const orderreducer = (orderedproduct, action) => {
    switch (action.type) {
      case "firstadd":
        orderedproduct.push(action.obj);
        return orderedproduct;
      case "remove":
        let index = orderedproduct.findIndex((e) => e.id == action.obj.id);
        orderedproduct.splice(index, 1);
        return orderedproduct;
      case "adder":
        let addindex = orderedproduct.findIndex((e) => e.id == action.obj.id);
        orderedproduct[addindex] = action.obj;
        return orderedproduct;
      case "delete":
        let deleteproduct = orderedproduct.filter(
          (data) => data.id != action.obj.id
        );

        return (orderedproduct = [...deleteproduct]);

      case "plus":
        let plusmenu = orderedproduct.map((data) => {
          if (data.id === action.obj.id) {
            let amnt = data.itemnumber + 1;
            data.itemnumber = amnt;

            return data;
          } else {
            return data;
          }
        });
        return (orderedproduct = [...plusmenu]);
      case "minus":
        let minusedmenu = orderedproduct.map((data) => {
          if (data.id === action.obj.id) {
            let amnt = data.itemnumber - 1;
            data.itemnumber = amnt;

            return data;
          } else {
            return data;
          }
        });
        return (orderedproduct = [...minusedmenu]);

      default:
    }

    return orderedproduct;
  };
  const [checkthank, setcheckthank] = useState({ check: false, thank: false });
  const [products, setproducts] = useState([]);
  const [filterproducts, setfilteredproducts] = useState(products);
  const loadedproducts = [];
  async function getdata() {
    const response = await fetch(
      "https://fashion-dummyjson-default-rtdb.firebaseio.com/products.json"
    );
    const data = await response.json();
    Object.keys(data).map((key, index) => {
      let obj = data[key];
      obj.id = key;
      loadedproducts.push(obj);
      setproducts(loadedproducts);
    });
  }

  const [filterobj, filterdispatch] = useReducer(filterreducer, {
    item: "",
    size: "",
    search: "",
  });
  const [orderedproduct, orderdispatch] = useReducer(orderreducer, []);
  console.log(filterobj);

  const filterfunction = (item, search, size, ary) => {
    let itemfiltered =
      item.length > 0 ? ary.filter((data) => data.title == item) : ary;
    let searchfiltered =
      search.length > 0
        ? itemfiltered.filter((data) =>
            data.title.toLowerCase().includes(search)
          )
        : itemfiltered;
    let sizefiltered =
      size.length > 0
        ? searchfiltered.filter((data) => data.size.includes(size))
        : searchfiltered;
    return sizefiltered;
  };

  useEffect(() => {
    getdata();
  }, []);

  // useEffect(() => {
  // console.log("prrcalles");
  // setfilteredproducts(
  // filterfunction(filterobj.item, filterobj.search, filterobj.size, products)
  // );
  // }, [filterobj, products]);
  let filterproduct1 = filterfunction(
    filterobj.item,
    filterobj.search,
    filterobj.size,
    products
  );

  console.log(filterproducts);
  const filterhandler = (data) => {
    filterdispatch(data);
    setfilteredproducts(
      filterfunction(filterobj.item, filterobj.search, filterobj.size, products)
    );
  };
  const orderhandler = (data) => {
    orderdispatch(data);
  };
  const checkouthandler = () => {
    setcheckthank({ check: true, thank: false });
  };
  const backhandler = () => {
    setcheckthank({ check: false, thank: false });
  };
  const thankhandler = () => {
    setcheckthank({ check: false, thank: true });
  };
  console.log(filterobj);
  return (
    <Ordercontext.Provider value={[orderedproduct, orderhandler]}>
      <div className="Main">
        {checkthank.check || checkthank.thank ? null : (
          <Filter
            filter={filterhandler}
            products={products}
            filterobj={filterobj}
            checkout={checkouthandler}
          ></Filter>
        )}
        {checkthank.check || checkthank.thank ? null : (
          <Itemtable products={filterproduct1}></Itemtable>
        )}
        {checkthank.check ? (
          <Checkout
            orderedproduct={orderedproduct}
            thank={thankhandler}
            back={backhandler}
          ></Checkout>
        ) : null}
        {checkthank.thank ? <Thank back={backhandler}></Thank> : null}
      </div>
    </Ordercontext.Provider>
  );
};

export default Main;
