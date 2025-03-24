// Angular Import
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

import { BajajChartComponent } from 'src/app/theme/shared/components/apexchart/bajaj-chart/bajaj-chart.component';
import { BarChartComponent } from 'src/app/theme/shared/components/apexchart/bar-chart/bar-chart.component';
import { ChartDataMonthComponent } from 'src/app/theme/shared/components/apexchart/chart-data-month/chart-data-month.component';

import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import { RiskService } from 'src/app/services/db/risk.service';
import { WalletService } from 'src/app/services/db/wallet.service';

import { Investment, Savings, Transaction } from 'src/app/models/wallet.model';
import { Risk } from 'src/app/models/risk.model';
import { AlphaVantageService } from 'src/app/services/external/alpha-vantage.service';

@Component({
  selector: 'app-default',
  imports: [CommonModule, BajajChartComponent, BarChartComponent, ChartDataMonthComponent, SharedModule],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  currentUser
  riskProfile: Risk
  totalSavings: Savings
  investments: Investment[]
  transactions: Transaction[]
  topGainersLosers

  constructor(
    private authService: AuthService,
    private utilService: UtilsService,
    private riskService: RiskService,
    private walletService: WalletService,
    private alphaVantageService: AlphaVantageService
  ) { }

  ngOnInit(): void {
    console.log("Entering /default page")
    console.log(this.authService.currentUser);
    if (!this.authService.isLoggedIn) {
      this.utilService.redirect_page_to('/guest/login')
    }
    this.currentUser = this.authService.getCurrentUser()

    this.riskProfile = this.riskService.getRiskProfile(this.currentUser.id)
    console.log(this.riskProfile);
    if (this.riskProfile == null) {
      this.utilService.redirect_page_to("/initiation")
    }

    this.getTotalSavings(this.currentUser.id)
    this.processTopGainersLosers()
    
  }

  processTopGainersLosers() {
    console.log("Getting Top Gainers Losers")
    this.alphaVantageService.topGainersEmitter.subscribe((data: any) => {
      this.topGainersLosers = data
      console.log("Top Gainers Losers changed:")
      console.log(this.topGainersLosers)
    })
    this.alphaVantageService.getTopGainersLosers()
  }

  profileCard = [
    {
      style: 'bg-primary-dark text-white',
      background: 'bg-primary',
      value: '$203k',
      text: 'Net Profit',
      color: 'text-white',
      value_color: 'text-white'
    },
    {
      background: 'bg-warning',
      avatar_background: 'bg-light-warning',
      value: '$550K',
      text: 'Total Revenue',
      color: 'text-warning'
    }
  ];

  getTotalSavings(userId: string) {
    this.totalSavings = this.walletService.getSavings(userId)
  };
}
