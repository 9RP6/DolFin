import { Component } from '@angular/core';

@Component({
  selector: 'app-equity',
  templateUrl: './equity.component.html',
  styleUrls: ['./equity.component.scss']
})
export class EquityComponent {
  stocks = [
    { 
      name: 'Apple', 
      symbol: 'AAPL', 
      price: 150, 
      beta: 1.2, 
      graphData: [140, 145, 148, 150], 
      graphLabels: ['Jan', 'Feb', 'Mar', 'Apr'] 
    },
    { 
      name: 'Google', 
      symbol: 'GOOGL', 
      price: 2800, 
      beta: 1.1, 
      graphData: [2750, 2780, 2790, 2800], 
      graphLabels: ['Jan', 'Feb', 'Mar', 'Apr'] 
    },
    { 
      name: 'Tesla', 
      symbol: 'TSLA', 
      price: 700, 
      beta: 2.0, 
      graphData: [680, 690, 700, 710], 
      graphLabels: ['Jan', 'Feb', 'Mar', 'Apr'] 
    }
  ];

  holdings = [
    { name: 'Apple', symbol: 'AAPL', quantity: 10, price: 150 },
    { name: 'Google', symbol: 'GOOGL', quantity: 5, price: 2800 }
  ];

  buyStock(stock: any) {
    alert(`Buying ${stock.name} (${stock.symbol}) at $${stock.price}`);
    // Add logic to update holdings and dashboard
  }

  // Chart.js options
  chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };
}