import React from "react";
import { Select, DatePicker } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const TransactionFilter = ({ filter, setFilter }) => {
    // Lấy tháng hiện tại dạng yyyy-MM
    const monthValue = dayjs(filter.month + "-01");

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <div>
                <Select
                    value={filter.type}
                    onChange={val => setFilter(f => ({ ...f, type: val }))}
                    className="w-32"
                >
                    <Option value="all">All</Option>
                    <Option value="income">Income</Option>
                    <Option value="expense">Expense</Option>
                </Select>
            </div>
            <div>
                <DatePicker
                    picker="month"
                    value={monthValue}
                    onChange={date => setFilter(f => ({ ...f, month: date.format("YYYY-MM") }))}
                    className="w-40"
                />
            </div>
        </div>
    );
};

export default TransactionFilter; 