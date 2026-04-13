import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);
export default function CategorySalesChart() {
    const data = {
        labels: ["Men", "Women", "Unisex", "Kids"],
        datasets: [
            {
                label: "Units Sold",
                data: [120, 95, 70, 40],
                backgroundColor: [
                    "#2563eb",
                    "#ec4899",
                    "#10b981",
                    "#f59e0b",
                ],
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    boxWidth: 12,
                },
            },
        },
    };

    return(
        <div className="chart-wrapper">
            <div className="chart-container">
                <Doughnut data={data} options={options} />
            </div>
        </div>
    )
}