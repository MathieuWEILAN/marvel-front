const Page = ({ page, setPage, data }) => {
  const handlePageAdd = () => {
    if (page * data.limit <= data.count) return setPage(page + 1);
  };
  const handlePageRemove = () => {
    if (page > 1) return setPage(page - 1);
  };

  const handlelastPage = () => {
    let lastPage = Math.round(data.count / data.limit);
    setPage(lastPage);
  };

  const handleFirstPage = () => {
    setPage(1);
  };

  const handleAddTen = () => {
    if ((page + 10) * data.limit <= data.count) {
      return setPage(page + 10);
    } else if (page + 10 >= Math.round(data.count / data.limit)) {
      return setPage(Math.round(data.count / data.limit));
    }
  };

  const handleRemoveTen = () => {
    if (page > 11) {
      return setPage(page - 10);
    } else if (page <= 10) {
      return setPage(1);
    }
  };

  const numberOfPages = Math.round(data.count / data.limit);

  return (
    <div className="page">
      <button className="page-btn" onClick={handleFirstPage}>
        FirstPage
      </button>
      <button onClick={handleRemoveTen}> &laquo;</button>
      <button className="page-btn" onClick={handlePageRemove}>
        &lsaquo;
      </button>
      <div>
        {page}/{numberOfPages}
      </div>
      <button className="page-btn" onClick={handlePageAdd}>
        &rsaquo;
      </button>
      <button onClick={handleAddTen}>&raquo; </button>
      <button className="page-btn" onClick={handlelastPage}>
        LastPage
      </button>
    </div>
  );
};

export default Page;
