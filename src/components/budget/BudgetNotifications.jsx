import React, { useState } from "react";
import { Switch, InputNumber, Select, Button } from "antd";

const BudgetNotifications = () => {
    const [enabled, setEnabled] = useState(true);
    const [percent, setPercent] = useState(80);
    const [method, setMethod] = useState("email");

    return (
        <div className="bg-gray-50 rounded-lg p-4 mt-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-700">Budget Alert Notifications</h4>
                <Switch checked={enabled} onChange={setEnabled} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4">
                <div className="flex items-center space-x-2">
                    <span className="text-gray-600 text-sm">Warn me when I reach</span>
                    <InputNumber
                        min={1}
                        max={100}
                        value={percent}
                        onChange={setPercent}
                        className="w-20"
                        disabled={!enabled}
                    />
                    <span className="text-gray-600 text-sm">% of my budget</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-gray-600 text-sm">Notification Method:</span>
                    <Select
                        value={method}
                        onChange={setMethod}
                        className="w-32"
                        disabled={!enabled}
                        options={[
                            { value: "email", label: "App & Email" },
                            { value: "app", label: "App Only" },
                            { value: "none", label: "None" },
                        ]}
                    />
                </div>
                <div className="flex justify-end">
                    <Button type="primary" disabled={!enabled}>Save Settings</Button>
                </div>
            </div>
        </div>
    );
};

export default BudgetNotifications; 