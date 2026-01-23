const TopBookTable = ({ data }) => {
  return (
    <div className="card-outline">
      <h6>Top 10 Buku Terfavorit</h6>
      <div className="table-scroll">
        <table className="highlight">
          <thead>
            <tr>
              <th>Judul Buku</th>
              <th>Total Hari</th>
            </tr>
          </thead>
          <tbody>
            {data.map((b, i) => (
              <tr key={i}>
                <td>{b.nama_buku}</td>
                <td>{b.total_hari}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopBookTable;
