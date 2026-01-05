const TopUserTable = ({ data = [] }) => {
  return (
    <div className="card-outline">
      <h6>Top 10 User Paling Aktif</h6>
      <div className="table-scroll">
        <table className="highlight">
          <thead>
            <tr>
              <th>Nama User</th>
              <th>Total Hari</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u, i) => (
              <tr key={i}>
                <td>{u.nama}</td>
                <td>{u.total_hari}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopUserTable;
