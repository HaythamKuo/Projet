import { useSearchParams } from "react-router-dom";
function SearchRespage() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");
  console.log(query);

  return (
    <>
      這裡是searchres page
      {query}
    </>
  );
}
export default SearchRespage;
