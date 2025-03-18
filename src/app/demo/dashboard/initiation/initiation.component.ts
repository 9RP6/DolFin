import { Component } from '@angular/core';

import { CardComponent } from '../../../theme/shared/components/card/card.component';
import { RiskService } from 'src/app/services/db/risk.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Risk } from 'src/app/models/risk.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import { AgeRange } from 'src/app/models/risk.model';
import { WalletService } from 'src/app/services/db/wallet.service';

@Component({
  selector: 'app-initiation',
  imports: [CardComponent, FormsModule],
  templateUrl: './initiation.component.html',
  styleUrl: './initiation.component.scss'
})
export class InitiationComponent {
  riskProfile: Risk = {
    ageRange: AgeRange.YOUNG,
    financialGoal: 0,
    income: 0,
    savings: 0
  }

  constructor (
    private riskService: RiskService,
    private authService: AuthService,
    private utils: UtilsService,
    private walletService: WalletService,
  ) {}

  doSubmit() {
    let currUser = this.authService.getCurrentUser()
    this.riskService.createRiskProfile(currUser.id, this.riskProfile)

    // Create the initial wallet for new user
    this.walletService.initWallet(currUser.id)
    this.utils.redirect_page_to("/default")
  }
}
