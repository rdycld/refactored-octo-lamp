import styles from "./LegalNotcieTable.module.scss";

export const LegalNoticeTable = () => {
  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>USA</th>
            <th>Asia</th>
            <th>Europe and World</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>US9856016</td>
            <td>CN105473442</td>
            <td>
              European Patent 3007973 validated and enforceable in Switzerland +
              Liechtenstein, Germany (as German patent number DE 60 2014 039
              102.8), France, Ireland, The Netherlands, and Great Britain.
            </td>
          </tr>
          <tr>
            <td>US10308349</td>
            <td>CN108516082</td>
            <td>EP3424820</td>
          </tr>
          <tr>
            <td>US2015167910P (patent pending)</td>
            <td>CN107848623</td>
            <td>WO2016193884</td>
          </tr>
          <tr>
            <td>US10562611</td>
            <td>HK1253680</td>
            <td>-</td>
          </tr>
          <tr>
            <td>-</td>
            <td>KR102054119</td>
            <td>-</td>
          </tr>
          <tr>
            <td>-</td>
            <td>JP2018083625</td>
            <td>-</td>
          </tr>
          <tr>
            <td>-</td>
            <td>JP2018516200</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
