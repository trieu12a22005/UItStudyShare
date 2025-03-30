import { Pagination } from "antd";
import "./Pagination.scss";

const Paginations = ({ current, total, pageSize, onChange }) => {
  return (
    <Pagination
      current={current}
      total={total}
      pageSize={pageSize}
      onChange={onChange}
    />
  );
};

export default Paginations;
