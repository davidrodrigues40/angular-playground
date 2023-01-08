# angular-ngrx
This is a sample project for Angular ngrx.

# Structure
## Model
The models are stored under the associated state folder. <br>
_i.e. app -> state -> books -> models_

## Service
All services should be written prior to writing the state.

## State
The state of all objects is stored in the state folder under the associated object state.<br>
_i.e. app 
   -> state 
      -> books
      -> facts
      -> game

### Actions
Actions are all the events which will occur for a specific scope.<br>
Each action will contain at least a request action and response action.

### Reducers
These are functions to perform upon an action occuring.<br>
They will update the associated state with the data received or the function performed in the handler.

### Effects
Effects are handlers for the request actions.<br>
When the ofType action is dispatched/called the appropriate action is performed and the responses are hanlded which call the associated reducer.

### Selectors
Selectors are ways of retrieving data from the state.

# Steps to create a feature using an API.
1. Create model.
1. Create the service and needed methods.
1. Create the actions for all the methods.
1. Create the model state in the app.state.ts
3. Create the reducers to handle the responses of the API actions.
4. Add model state and reducer to app.reducers.ts.
5. Create the effects to handle the request of the API actions.
6. Create the selectors to handle retrieving the data from the state.
7. Add the reducers to the StoreModule in app.module.ts.
8. Add the EffectsModule for feature in the features module.
