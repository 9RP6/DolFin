import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-risk-profile',
  templateUrl: './risk-profile.component.html',
  styleUrls: ['./risk-profile.component.scss']
})
export class RiskProfileComponent {
  // Default risk profile category (can be fetched from a service)
  defaultRiskProfile = 'Balanced';
  betaRange = 'Medium'; 
  betaValue = '0.8';
  suggestedAssetClasses = ['Equity (60%)', 'Bonds (30%)', 'Real Estate (10%)']; // Suggested asset classes

  constructor(private router: Router) {}

  // Method to navigate to the risk profile form
  navigateToRiskProfileForm() {
    this.router.navigate(['/risk-profile-form']);
  }

  // Method to navigate back to the dashboard
  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}