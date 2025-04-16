function SearchBar({ searchTerm, onSearch }) {
    return (
      <div>
        <label htmlFor="search">Search Expenses</label>
        <input
          id="search"
          type="text"
          placeholder="Search by name or description..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    );
  }
  
  export default SearchBar;