import $ from "jquery";

// This function stores an individual plant's state, and creates a new plant

const storePlantState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  };
};
const plantControl = storePlantState();


// This is a function factory, whose innermost return function gets passed into the return function of storePlantState, and becomes the //! stateChangeFunction.
//We can easily create more specific functions that alter a plant's soil, water, and light to varying degrees.

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
const listControl = storeListState();

// This is a function factory, whose return function gets passed into the return function of storeListState, and becomes the stateChangeFunction.

const changeListState = (plant) => {
  return (state) => ([
    ...state,
    plant
  ]);
};

const blueFood = changePlantState("soil")(5);

$(document).ready(function () {

  $('#new-plant').click(function() {
    const addPlant = changeListState(plantControl);
    const newList = listControl(addPlant); // calls the return of storeListState using changeListState
    $("#soil-value").append(`
      <div>
        <p id="soil-value-${newList.length - 1}"></p>
        <p id="feed-${newList.length - 1}">Plant-${newList.length - 1}</p>
      </div>
    `);
  });
  
  $('#feed').click(function() {
    const id = $('#plantNumber').val();
    const stateControl = listControl()[id];
    const newState = stateControl(blueFood);
    $(`#soil-value-${id}`).text(`Soil: ${newState.soil}`);
  });

  $('#show-state').click(function() {
    $(`#soil-value`).text(`${listControl()}`);

  });
});
