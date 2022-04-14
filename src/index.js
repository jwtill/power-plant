import $ from "jquery";

// This function stores an individual plant's state.

const storePlantState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  };
};

// This is a function factory, whose innermost return function gets passed into the return function of storePlantState, and becomes the stateChangeFunction. We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.

const changePlantState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    });
  };
};

// This function stores the list of plants.

const storeListState = () => {
  let currentState = [];
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = [...newState];
    return newState;
  };
};

// This is a function factory, whose return function gets passed into the return function of storeListState, and becomes the stateChangeFunction.

const changeListState = (plant) => {
  return (state) => ([
    ...state,
    plant
  ]);
};

const blueFood = changePlantState("soil")(5);

$(document).ready(function () {

  const listControl = storeListState();

  $('#new-plant').click(function() {
    console.log("Hello");
    const plantControl = storePlantState();
    const addPlant = changeListState(plantControl);
    const newList = listControl(addPlant);
    $("#soil-value").append(`
      <div>
        <p id=”soil-value-${newList.length - 1}”></p>
        <p id=”feed-${newList.length - 1}” >Feed-${newList.length - 1}</p>
      </div>
    `);
  });
  
  // This function has side effects because we are using jQuery. Manipulating the DOM will always be a side effect. Note that we only use one of our functions to alter soil. You can easily add more.
  
  $('#feed').click(function() {
    console.log("Matt");
    const id = $('#plantNumber').val();
    console.log(id);
    const stateControl = listControl()[id];
    console.log(stateControl);
    const newState = stateControl(blueFood);
    console.log(newState);
    $(`#soil-value-${id}`).val(`Soil: ${newState.soil}`);
    console.log($(`#soil-value-${id}`).val());
  });

});
