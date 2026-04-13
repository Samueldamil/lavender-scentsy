import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, plugins } from "chart.js";


Chart.register(
    LinearScale,
    CategoryScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

export default function SalesChart() {
    const data = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "Revenue",
                data: [12000, 18000, 15000, 22000, 30000, 28000, 35000],
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.1)",
                tension: 0.4,
            },
            {
                label: "Orders",
                data: [5, 8, 6, 10, 14, 12, 16],
                borderColor: "red",
                backgroundColor: "rgba(255, 0, 0, 0.1)",
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 100,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    boxWidth: 12,
                    font: {
                        size: 12,
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
            x: {
                ticks: {
                    maxRotation: 45,
                    minRotation: 30,
                    autoSkip: true,
                },
            },
        },
    };

    return (
        <div className="chart-wrapper">
            <div className="chart-container">
                <Line data={data} option={options} />
            </div>
        </div>
    )
}