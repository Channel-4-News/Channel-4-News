import React from 'react';
import { Pie } from 'react-chartjs-2';

const SpendingGraph = (props) => {
  return props.transactions ? (
    <div className="spendingGraph">
      <Pie
        data={{
          labels: props.transactions.map((transaction) => {
            return transaction.category;
          }),
          datasets: [
            {
              data: props.transactions.map((transaction) => {
                return transaction.amount;
              }),
              backgroundColor: [
                'rgba(255,0,0,0.5)',
                'rgba(0,255,0,0.5)',
                'rgba(0,0,255,0.5)',
                'rgba(0,255,255,0.5)',
                'rgba(255,0,255,0.5)',
                'rgba(255,255,0,0.5)',
              ],
            },
          ],
        }}
        height={400}
        width={400}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  ) : (
    ''
  );
};

export default SpendingGraph;
