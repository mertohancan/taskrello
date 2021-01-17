import React, { FC, useContext, createContext, useReducer } from 'react';

import initialData from '../initialData';

// eslint-disable-next-line no-shadow
enum ACTIONS {
  SET_CARD,
  SET_CARD_ITEM,
  REMOVE_CARD_ITEM,
  CLEAR,
}

type Action =
  | { type: ACTIONS.SET_CARD; payload: string }
  | {
      type: ACTIONS.SET_CARD_ITEM;
      payload: { id: string; text: string };
    }
  | {
      type: ACTIONS.REMOVE_CARD_ITEM;
      payload: { cardId: string; listId?: string };
    }
  | { type: ACTIONS.CLEAR };

interface CardItems {
  id: string;
  text: string;
}

interface CardList {
  id: string;
  title: string;
  cardItems: CardItems[];
}

interface AppState {
  data: CardList[];
}

const initialValues = {
  data: initialData.lists.map((item) => item),
};

type AppDispatch = (action: Action) => void;

const AppStateContext = createContext<AppState | undefined>(undefined);
const AppDispatchContext = createContext<AppDispatch | undefined>(undefined);

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case ACTIONS.SET_CARD:
      return {
        data: [
          ...state.data,
          { id: String(state.data.length), title: action.payload, cardItems: [] },
        ],
      };
    case ACTIONS.SET_CARD_ITEM:
      const cardList = state.data.find((item) => item.id === action.payload.id);
      if (cardList) {
        cardList.cardItems.push({
          id: String(cardList.cardItems.length),
          text: action.payload.text,
        });
      }
      return state;
    case ACTIONS.REMOVE_CARD_ITEM:
      let newData;
      const selectedList = state.data.find((item) => item.id === action.payload.listId);
      const removedCard = selectedList?.cardItems.find((item) => item.id === action.payload.cardId);
      if (selectedList && removedCard) {
        newData = selectedList.cardItems.filter((card) => card.id !== action.payload.cardId);
      }
      return {
        data: [
          // @ts-ignore
          { ...selectedList, cardItems: newData },
          ...state.data.filter((list) => list.id !== selectedList?.id),
        ],
      };
    case ACTIONS.CLEAR:
      return initialValues;
    default:
      return state;
  }
};

const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialValues);
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export const useAppState = (): AppState => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppProvider');
  }
  return context;
};

export const useCardDispatch = (): ((payload: string) => void) => {
  const dispatch = useContext(AppDispatchContext);
  if (dispatch === undefined) {
    throw new Error('useCardDispatch must be used within a AppProvider');
  }
  return (payload: string) => dispatch({ type: ACTIONS.SET_CARD, payload });
};

export const useCardItemDispatch = (): ((payload: { id: string; text: string }) => void) => {
  const dispatch = useContext(AppDispatchContext);
  if (dispatch === undefined) {
    throw new Error('useCardItemDispatch must be used within a AppProvider');
  }
  return (payload: { id: string; text: string }) =>
    dispatch({ type: ACTIONS.SET_CARD_ITEM, payload });
};

export const useRemoveCardItemDispatch = (): ((payload: {
  cardId: string;
  listId?: string;
}) => void) => {
  const dispatch = useContext(AppDispatchContext);
  if (dispatch === undefined) {
    throw new Error('useRemoveCardItemDispatch must be used within a AppProvider');
  }
  return (payload: { cardId: string; listId?: string }) =>
    dispatch({ type: ACTIONS.REMOVE_CARD_ITEM, payload });
};

export const useClearDispatch = (): (() => void) => {
  const dispatch = useContext(AppDispatchContext);
  if (dispatch === undefined) {
    throw new Error('useClearDispatch must be used within a AppProvider');
  }
  return () => dispatch({ type: ACTIONS.CLEAR });
};

export default AppProvider;
