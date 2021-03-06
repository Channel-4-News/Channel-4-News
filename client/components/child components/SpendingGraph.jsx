import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const SpendingGraph = (props) => {
  let transactions = {};
  props.transactions
    ? props.transactions.map((transaction) => {
      if (!transactions[transaction.category]) {
        transactions[transaction.category] = parseInt(transaction.cost);
      } else {
        transactions[transaction.category] += parseInt(transaction.cost);
      }
    })
    : '';

  return props.small ? (
    <div id="childCardSpendingGraph">
      <Doughnut
        data={{
          labels: Object.keys(transactions),
          datasets: [
            {
              data: Object.values(transactions),
              backgroundColor: [
                'rgb(252, 77, 54)',
                'rgb(153, 97, 255)',
                '#3e6bff',
                'rgb(138, 138, 138)',
                'rgb(255, 0, 140)',
                'rgb(255, 251, 0)',
              ],
            },
          ],
        }}
        height={220}
        width={220}
        options={{
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              usePointStyle: true,
              backgroundColor: 'rgb(250, 250, 250)',
              borderWidth: '1',
              borderColor: 'rgb(0, 0, 0)',
              bodyColor: 'rgb(0, 0, 0)',
              bodyFont: { size: '15', family: 'main' },
              displayColors: false,
              callbacks: {
                label: function (tooltipItem) {
                  const amount = tooltipItem.raw;
                  const total = tooltipItem.chart._metasets[0].total;
                  const percentage = Math.round((amount / total) * 100);
                  return `${tooltipItem.label}: $${amount} (${percentage}%)`;
                },
              },
            },
            title: {
              display: false,
              text: `${props.kid}'s Spending Chart`,
              font: { size: 20, family: 'main' },
            },
            legend: {
              display: false,
              position: 'right',
              align: 'left',
              labels: {
                font: {
                  size: 14,
                  family: 'main',
                },
                color: 'black',
              },
            },
          },
        }}
      />
    </div>
  ) : props.transactions?.length ? (
    <div className="spendingGraph">
      <Doughnut
        data={{
          labels: Object.keys(transactions),
          datasets: [
            {
              data: Object.values(transactions),
              backgroundColor: [
                'rgb(252, 77, 54)',
                'rgb(153, 97, 255)',
                '#3e6bff',
                'rgb(138, 138, 138)',
                'rgb(255, 0, 140)',
                'rgb(255, 251, 0)',
              ],
            },
          ],
        }}
        height={300}
        width={300}
        options={{
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              usePointStyle: true,
              backgroundColor: 'rgb(250, 250, 250)',
              borderWidth: '1',
              borderColor: 'rgb(0, 0, 0)',
              bodyColor: 'rgb(0, 0, 0)',
              bodyFont: { size: '17', family: 'main' },
              displayColors: false,
              callbacks: {
                label: function (tooltipItem) {
                  const amount = tooltipItem.raw;
                  const total = tooltipItem.chart._metasets[0].total;
                  const percentage = Math.round((amount / total) * 100);
                  return `${tooltipItem.label}: $${amount} (${percentage}%)`;
                },
              },
            },
            legend: {
              position: 'right',
              align: 'left',
              labels: {
                font: {
                  size: 16,
                  family: 'main',
                },
                color: 'black',
              },
            },
          },
        }}
      />
    </div>
  ) : (
    <div className="spendingGraph">
      <Doughnut
        data={{
          labels: ['No Data'],
          datasets: [
            {
              data: [1],
              backgroundColor: ['rgb(211,211,211)'],
            },
          ],
        }}
        height={300}
        width={300}
        options={{
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              usePointStyle: true,
              backgroundColor: 'rgb(250, 250, 250)',
              borderWidth: '1',
              borderColor: 'rgb(0, 0, 0)',
              bodyColor: 'rgb(0, 0, 0)',
              bodyFont: { size: '17', family: 'main' },
              displayColors: false,
            },
            legend: {
              position: 'right',
              align: 'left',
              labels: {
                font: {
                  size: 16,
                  family: 'main',
                },
                color: 'black',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default SpendingGraph;
