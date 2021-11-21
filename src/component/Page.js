const Page = ({ page, setPage, tab }) => {
  const handlePageAdd = () => {
    if (page * tab.limit <= tab.count) return setPage(page + 1);
  };
  const handlePageRemove = () => {
    if (page > 1) return setPage(page - 1);
  };

  const handlelastPage = () => {
    let lastPage = Math.round(tab.count / tab.limit);
    setPage(lastPage);
  };

  const handleFirstPage = () => {
    setPage(1);
  };

  const handleAddTen = () => {
    if ((page + 10) * tab.limit <= tab.count) {
      return setPage(page + 10);
    } else if (page + 10 >= Math.round(tab.count / tab.limit)) {
      return setPage(Math.round(tab.count / tab.limit));
    }
  };

  const handleRemoveTen = () => {
    if (page > 11) {
      return setPage(page - 10);
    } else if (page <= 10) {
      return setPage(1);
    }
  };

  const numberOfPages = Math.round(tab.count / tab.limit);

  return (
    <div className="page">
      <button className="page-btn" onClick={handleFirstPage}>
        FirstPage
      </button>
      <button className="page-btn" onClick={handleRemoveTen}>
        {" "}
        &laquo;
      </button>
      <button className="page-btn" onClick={handlePageRemove}>
        &lsaquo;
      </button>
      <div>
        {page}/{numberOfPages}
      </div>
      <button className="page-btn" onClick={handlePageAdd}>
        &rsaquo;
      </button>
      <button className="page-btn" onClick={handleAddTen}>
        &raquo;{" "}
      </button>
      <button className="page-btn" onClick={handlelastPage}>
        LastPage
      </button>
    </div>
  );
};

export default Page;
