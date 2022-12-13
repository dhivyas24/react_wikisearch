import { useState } from "react";
import "./styles.css";
function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") return;

    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${search}`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();

    setResults(json.query.search);
  };

  return (
    <div className="App">
      <header>
        <h1 className="Heading">Wiki Search</h1>
        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="What are you looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </header>
      <div className="results">
        {results.map((result, i) => {
          const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
          var key = i % 2;
          var a;
          if (key !== 0) {
            a = "odd";
          } else {
            a = "even";
          }
          console.log(key);
          return (
            <div key={i} className={a}>
              <a href={url}>{result.title}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
