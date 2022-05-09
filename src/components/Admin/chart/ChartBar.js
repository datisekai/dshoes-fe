import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default function ChartBar(props) {
    const title = props.title;
    const labels = props.labels;
    const data = props.data;
    const datasetLabel = props.datasetLabel;
    return (
        <>
            <h3 className='text-center'>{title}</h3>
            <Bar
                data={{
                    labels: labels,
                    datasets: [{
                        label: datasetLabel,
                        data: data,
                        backgroundColor: '#00796B',
                        borderColor: '#2a2a2a',
                        borderWidth: 2,
                    }],
                }}
                options={{
                    responsive: true,
                    plugins: {  // 'legend' now within object 'plugins {}'
                        legend: {
                            labels: {
                                color: "white",  // not 'fontColor:' anymore
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: labels,
                        fontSize: 20,
                    },
                    scales: {
                        y: {  // not 'yAxes: [{' anymore (not an array anymore)
                            ticks: {
                                color: "white", // not 'fontColor:' anymore
                                // fontSize: 18,
                                stepSize: 1,
                                beginAtZero: true
                            }
                        },
                        x: {  // not 'xAxes: [{' anymore (not an array anymore)
                            ticks: {
                                color: "white",  // not 'fontColor:' anymore
                                //fontSize: 14,
                                stepSize: 1,
                                beginAtZero: true
                            }
                        }
                    }
                }}
            />
        </>
    )
}