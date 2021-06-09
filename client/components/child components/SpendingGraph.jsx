import React from 'react';
import { Pie } from 'react-chartjs-2';

const SpendingGraph = (props) => {
  let transactions = {};
  props.transactions.map((transaction) => {
    if (!transactions[transaction.category]) {
      transactions[transaction.category] = parseInt(transaction.cost);
    } else {
      transactions[transaction.category] += parseInt(transaction.cost);
    }
  });
  console.log(transactions);
  return props.transactions ? (
    <div className="spendingGraph">
      <Pie
        data={{
          labels: Object.keys(transactions),
          datasets: [
            {
              data: Object.values(transactions),
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
        height={300}
        width={300}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  ) : (
    ''
  );
};

export default SpendingGraph;
