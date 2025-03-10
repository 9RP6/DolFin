import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bonds',
  templateUrl: './bonds.component.html',
  styleUrls: ['./bonds.component.scss']
})
export class BondsComponent {
  fixedIncomeInfo = {
    title: 'Fixed Income Instruments',
    description: `
      Fixed income investments are designed to generate income and help provide capital preservation. 
      If you’re looking for potential tax benefits and want to diversify your portfolio, high-quality 
      fixed income investments could be an option for you. Bonds, such as U.S. Treasuries and corporate 
      or municipal bonds, are traditional types of fixed income investments. Investors may also consider 
      mutual funds and ETFs that hold fixed income investments.
    `
  };

  bonds = [
    { name: 'US Treasury Bond', yield: '2.5%', maturity: '2030', risk: 'Low' },
    { name: 'Corporate Bond', yield: '4.0%', maturity: '2025', risk: 'Medium' },
    { name: 'Municipal Bond', yield: '3.0%', maturity: '2035', risk: 'Low' }
  ];

  buyBond(bond: any) {
    alert(`Buying ${bond.name} with yield ${bond.yield}`);
    // add logic to update holdings and dashboard
  }
}
