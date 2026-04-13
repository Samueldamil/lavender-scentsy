export default function Settings() {
    return(
        <div className="settings-page">
            <h2>Store Settings</h2>

            <div className="settings-card">
                <div className="setting-group">
                    <label>Store Name</label>
                    <input type="text" placeholder="Lavender Scentsy Store" />
                </div>

                <div className="setting-group">
                    <label>Email</label>
                    <input type="email" placeholder="support@lavenderscentsy.com" />
                </div>

                <div className="setting-group">
                    <label>Delivery Fee (&#8358;)</label>
                    <input type="number" min="0" placeholder="2000" />
                </div>

                <div className="setting-group">
                    <label>Enable Store?</label>
                    <select>
                        <option selected>Yes</option>
                        <option>No</option>
                    </select>
                </div>

                <button className="save-settings-btn">Save Settings</button>
            </div>
        </div>
    )
}