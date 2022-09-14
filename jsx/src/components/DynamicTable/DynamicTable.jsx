import React, { useState } from "react";
import "./table-select.css";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";


const DynamicTable = (props) => {
  
  var [current_propobject, setPropObject] = useState(props.current_propobject),
    //[propobject_state, setPropState] = useState(props.setProp),
    //[propkeys_state, setKeysState] = useState(props.setPropKeys),
    //[propvalues_state, setValuesState] = useState(props.setPropValues),
    [propobject, setProp] = useState(props.setProp),
    [message, setMessage] = useState(""),
    [message2, setMessage2] = useState("");

  let current_keys = [];
  let current_values = [];

  for (var property in current_propobject) {
      current_keys.push(property);
      current_values.push(current_propobject[property]);
      }
  var [propkeys, setPropKeys] = useState(current_keys),
    [propvalues, setPropValues] = useState(current_values);
  
  //setPropKeys(current_keys);
  //setPropValues(current_values);

  var updateMessageKey = (event) => {
    setMessage(event.target.value);
  }
  var updateMessageValue = (event) => {
    setMessage2(event.target.value);
  }

  const handleRefresh = () => {
    var propobject = {};
    propkeys.forEach((key, i) => (propobject[key] = propvalues[i]));
    console.log(propobject);
    setPropKeys(propkeys);
    setPropValues(propvalues);
    setProp(propobject);
    setMessage("");
    setMessage2("");
    //setKeysState(propkeys);
    //setValuesState(propvalues);
    //setPropState(propobject);
  }
  
  const handleClick = () => {
    if (message != "") {
      if (message2 != "") {
        propkeys.push(message);
        propvalues.push(message2);
      } else {
        console.log("Value not valid");
      }
    } else {
      console.log("Value not valid");
    }
    var propobject = {};
    propkeys.forEach((key, i) => (propobject[key] = propvalues[i]));
    console.log(propobject);
    setProp(propobject)
    setPropKeys(propkeys);
    setPropValues(propvalues);
    setMessage("");
    setMessage2("");
    //setKeysState(propkeys);
    //setValuesState(propvalues);
    //setPropState(propobject);
    console.log(propkeys)
    //console.log("STATE KEYS"+ propkeys_state)
    //console.log("STATE VALUES"+ propvalues_state)
    //console.log("STATE Object"+ propobject_state)
  }
  var handleKeyChanged = (i, o) => {
    
    if (o != "") {
      propkeys[i] = o;
    }
    console.log(o);
    handleRefresh();
    setPropKeys(["a","b","c"]);
    setPropKeys(["a","b","c"]);
  }
  
  var handleValueChanged = (i, keyval) => {
    
    propvalues[i] = keyval;
    handleRefresh();
    setPropValues(propvalues);
    //setValuesState(propvalues);

  }
  const handleItemDeleted = (i) => {
    propvalues.splice(i, 1);
    propkeys.splice(i, 1);
    setPropKeys(propkeys);
    setPropValues(propvalues);
    handleRefresh();
    setPropState(propobject);
  }
  const renderKeyRows = () => {
    var context = DynamicTable();

    return propkeys.map(function (o, i) {
      //console.log("KeyRows" +i)
      //console.log("KeyRows" +o)
      return (
        <tr key={"item-" + i}>
          <td>
            <input
              className="form-control"
              type="text"
              value={o}
              id={o + i}
              onChange={context.handleKeyChanged.bind(context,o)}
            />
          </td>
        </tr>
      );
    });
  }
  const renderValueRows = (props) => {
    var context = this;

    return propvalues.map(function (o, i) {
      //console.log("ValRows" +i)
      //console.log("ValRows" +o)
      return (
        <tr key={"item-" + i}>
          <td>
            <input
              className="form-control"
              type="text"
              value={o}
              onChange={(i,o) => {
     
                propvalues[i] = o;
                //handleRefresh();
                props.setPropValues(["1","2","3"]);
                console.log("1"+propvalues.slice(0, -1))
                console.log(props.propvalues)
                console.log("3"+propvalues)
                //setValuesState(propvalues);

                
              }}
            />
          </td>
        </tr>
      );
    });
  }
  const renderDelete = () => {
    var context = this;

    return propvalues.map(function (o, i) {
      return (
        <tr key={"item-" + i}>
          <td>
            <button
              className="btn btn-default"
              onClick={handleItemDeleted.bind(i, o)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }



  return (
    <div>
      <table className="">
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{renderKeyRows()}</td>
            <td>{renderValueRows()}</td>
            <td>{renderDelete()}</td>
          </tr>
        </tbody>
      </table>
      <form>
        <tr>
          <td>
            <input
              className="form-control"
              type="text"
              value={message}
              onChange={(e) => updateMessageKey(e)}
            />
          </td>
          <td>
              <input
                className="form-control"
                type="text"
                value={message2}
                onChange={(e) => updateMessageValue(e)}
              />
            </td>
          <td>
            <button
              id="add-item"
              data-testid="add-item"
              className="btn btn-default"
              type="button"
              onClick={() => handleClick()}
            >
              Add Item
            </button>
          </td>
        </tr>
      </form>
      <hr />
    </div>
  );
}
DynamicTable.propTypes = {
  current_keys: PropTypes.array,
  current_values: PropTypes.array,
};
export default DynamicTable;