import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

// const DUMMY_QUOTES = [
//   { id: "q1", author: "Paras", text: "Learning React is fun!" },
//   { id: "q2", author: "Manish", text: "Learning React is great!" },
// ];

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedquote,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  
  if(error) {
      return <p className='centered focused'>{error}</p>
  }

  if(status === 'completed' && (!loadedquote || loadedquote.length === 0)) {
     return <NoQuotesFound/>
  }

  return <QuoteList quotes={loadedquote} />;
};

export default AllQuotes;
