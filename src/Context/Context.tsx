import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useLogin } from "./LoginContext";
import _ from 'lodash'

export type Cards = {
  topic: string,
  frontCard: string
  backCard: string
  id: number
  userId: string
}

type CardContextData = {
  cards: Cards[];
  setCards: Dispatch<SetStateAction<Array<Cards>>>;
  modalShow: boolean;
  setModalShow: React.Dispatch<React.SetStateAction<boolean>>
  topics: string[]
  setTopics: Dispatch<SetStateAction<string[]>>
  filteredCards: Cards[]
  setFilteredCards: Dispatch<SetStateAction<Array<Cards>>>
  setFilter: Dispatch<SetStateAction<string>>
};


export const CardContext = createContext({} as CardContextData);

type ProviderProps = {
  children: ReactNode;
};

export function CardContextProvider({ children }: ProviderProps): JSX.Element {
  const { isLoggedIn, loggingId } = useLogin()
  const [cards, setCards] = useState<Cards[]>([]);
  const [filteredCards, setFilteredCards] = useState<Cards[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [topics, setTopics] = useState<string[]>([])
  const [filter, setFilter] = useState<string>('')

  useEffect(() => {
    if (isLoggedIn) {

      const url = `http://localhost:3004/cards?userId=${loggingId}`
      fetch(url).then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Something went wrong on api server!');
        }
      })
        .then((data) => {
          const mapTopics = data?.map((item: { topic: any; }) => item.topic)
          setCards(data)
          setTopics(_.uniq(mapTopics))
        })
        .catch((error) => console.log(error, 'something went wrong'))
    }

  }, [isLoggedIn])

  useEffect(() => {
    const selectedCard = cards.filter(card => card?.topic === filter)

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
      value={{ cards, setCards, setModalShow, modalShow, topics, setTopics, filteredCards, setFilteredCards, setFilter }}
    >
      {children}
    </CardContext.Provider>
  );
}

export const useCard = (): CardContextData => {
  return useContext(CardContext);
};
