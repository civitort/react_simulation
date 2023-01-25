import React, { useReducer } from "react";

// state に必要な初期値をまとめる
const initialState = {
  name: "",
  age: 0,
  email: "",
  flavor: "grapefruit",
  isPublic: false,
};

// 処理を reducer としてまとめることができる
const reducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_INPUT_TEXT":
      return {
        ...state,
        [action.field]: action.payload,
      };
    case "HANDLE_CHECKBOX":
      const nextValue = !state.isPublic
      return {
        ...state,
        [action.field]: nextValue,
      };
    default:
      throw new Error();
  }
};

const useReducerForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onSubmitForm = (e) => {
    e.preventDefault();
    alert(JSON.stringify(state));
  };

  return (
    <div>
      <h1>useReducer を使用したフォームの例</h1>
      <form onSubmit={onSubmitForm}>
        <div>
          <label>
            name:
            <input
              type="text"
              value={state.name}
              onChange={(e) =>
                dispatch({
                  type: "HANDLE_INPUT_TEXT",
                  field: "name",
                  payload: e.currentTarget.value,
                })
              }
            />
          </label>
        </div>
        <div>
          <label>
            age:
            <input
              type="number"
              value={state.age}
              min="0"
              onChange={(e) =>
                dispatch({
                  type: "HANDLE_INPUT_TEXT",
                  field: "age",
                  payload: e.currentTarget.value,
                })
              }
            />
          </label>
        </div>
        <div>
          <label>
            e-mail:
            <input
              type="email"
              value={state.email}
              onChange={(e) =>
                dispatch({
                  type: "HANDLE_INPUT_TEXT",
                  field: "email",
                  payload: e.currentTarget.value,
                })
              }
            />
          </label>
        </div>
        <div>
          <label>
            isPublic:
            <input
              type="checkbox"
              checked={state.isPublic}
              onChange={(e) => {
                dispatch({
                  type: "HANDLE_CHECKBOX",
                  field: "isPublic",
                });
              }}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default useReducerForm;
