import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

type Cards = {
  topic: string | null,
  frontCard: string
  backCard: string
  id: number
}

type CardContextData = {
  cards: Cards[];
  setCards: Dispatch<SetStateAction<Array<Cards>>>;
  addCard: () => void;
  deleteCard: () => void;
  modalShow: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>
  topics: string[]
  setTopics: Dispatch<SetStateAction<string[]>>
  filteredCards: Cards[]
  setFilteredCards: Dispatch<SetStateAction<Array<Cards>>>
  setFilter: Dispatch<SetStateAction<string | null>>
};


export const CardContext = createContext({} as CardContextData);

type ProviderProps = {
  children: ReactNode;
};

export function CardContextProvider({ children }: ProviderProps): JSX.Element {
  const [cards, setCards] = useState<Cards[]>([]);
  const [filteredCards, setFilteredCards] = useState<Cards[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [topics, setTopics] = useState<string[]>([])
  const [filter, setFilter] = useState<string | null>('')

  const addCard = () => { };
  const deleteCard = () => { };

  useEffect(() => {
    const selectedCard = cards.filter(card => card.topic === filter)

    topics.map((topic, idx) => {
      const exist = cards.some(item => item.topic === topic)
      if (!exist) {
        removeTopic(idx)
      }
      return exist
    })

    if (!!filter && selectedCard.length > 0) {
      return setFilteredCards(selectedCard)
    }
    setFilter('')
    setFilteredCards(cards)
  }, [filter, cards])

  const removeTopic = (idx: number): void => {
    const newTopic = [...topics]
    newTopic.splice(idx, 1)
    setTopics(newTopic)
  }


  return (
    <CardContext.Provider
      value={{ cards, setCards, addCard, deleteCard, setModalShow, modalShow, topics, setTopics, filteredCards, setFilteredCards, setFilter }}
    >
      {children}
    </CardContext.Provider>
  );
}

export const useCard = (): CardContextData => {
  return useContext(CardContext);
};
