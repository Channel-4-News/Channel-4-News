import React, { useEffect, useState } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';

const ParentGraph = (props) => {
  const [maxChores, setMaxChores] = useState(100);
  const [kids, setKids] = useState({});

  useEffect(() => {
    if (props.kids.length) {
      const kidDets = {};
      props.kids.map((kid) => {
        const totalChores = kid.chores.length;
        const choresComplete = kid.chores.filter((chore) => chore.isComplete);
        const percentComplete = (choresComplete.length / totalChores) * 100;
        kidDets[kid.firstName] = {
          complete: percentComplete,
          unfinished: 100 - percentComplete,
        };
      });
      setKids(kidDets);
    }
  }, [props.kids]);

  useEffect(() => {
    let kidName = '';
    let max = 0;
    for (let kid in kids) {
      if (kids[kid].complete > max) {
        max = kids[kid].complete;
        kidName = kid;
      }
    }
    props.setWinner(kidName);
  }, [kids]);

  return props.small ? (
    <div id="childCardSpendingGraph">
      <Bar
        data={{
          labels: Object.keys(kids),
          datasets: [
            {
              label: 'Complete',
              data: Object.values(kids).map((kid) => [kid.complete]),
              backgroundColor: ['tomato', 'rgb(153, 97, 255)', '#3e6bff'],
            },
            {
              label: 'Unfinished',
              data: Object.values(kids).map((kid) => [kid.unfinished * -1]),
              backgroundColor: [
                'rgb(192, 62, 39)',
                'rgb(114, 69, 196)',
                'rgb(33, 68, 182)',
              ],
            },
          ],
        }}
        height={280}
        options={{
          animation: {
            duration: 0,
          },
          scales: {
            x: {
              stacked: true,
              grid: {
                display: false,
              },
            },
            y: {
              stacked: true,
              max: maxChores || 100,
              ticks: { display: false },
              grid: {
                display: false,
              },
            },
          },
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              usePointStyle: true,
              backgroundColor: 'rgb(250, 250, 250)',
              borderWidth: '1',
              borderColor: 'rgb(0, 0, 0)',
              bodyColor: 'rgb(0, 0, 0)',
              bodyFont: { size: '15', family: 'main' },
              titleColor: 'rgb(0, 0, 0)',
              titleFont: { family: 'main' },
              displayColors: false,
              callbacks: {
                label: function (tooltipItem) {
                  const total =
                    kids[tooltipItem.label].complete +
                    kids[tooltipItem.label].unfinished;
                  const amount = tooltipItem.raw;
                  const percentage = Math.round((amount / total) * 100);
                  return `${tooltipItem.dataset.label}: ${Math.abs(
                    percentage
                  )}% `;
                },
              },
            },
            title: {
              display: true,
            },
            legend: {
              display: false,
              position: 'top',
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
          labels: Object.keys(kids),
          datasets: [
            {
              data: Object.values(kids),
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
              titleColor: 'rgb(0, 0, 0)',
              //   callbacks: {
              //     label: function (tooltipItem) {
              //       const amount = tooltipItem.raw;
              //       const total = tooltipItem.chart._metasets[0].total;
              //       const percentage = Math.round((amount / total) * 100);
              //       return `${tooltipItem.label}: $${amount} (${percentage}%)`;
              //     },
              //   },
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
      <Bar
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

export default ParentGraph;
