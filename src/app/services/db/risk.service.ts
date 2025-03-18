import { Injectable } from '@angular/core';
import { Risk } from 'src/app/models/risk.model';
import { UtilsService } from '../utils.service';

@Injectable({
  providedIn: 'root'
})
export class RiskService {

  constructor(
    private utils: UtilsService
  ) { }

  private STORAGE_KEY = "risk"
  private riskMap = new Map<string, Risk>();

  storeRiskInLocalStorage(userId: string, risk: Risk): void {
    this.riskMap.set(userId, risk);
    const risksObject = Object.fromEntries(this.riskMap);
    this.utils.setToDB(this.STORAGE_KEY, risksObject);
  }

  getRiskFromLocalStorage(userId: string): Risk | undefined {
    const storedRiskMap = this.utils.getFromDB(this.STORAGE_KEY);
    if (storedRiskMap) {
      // const parsedRiskMap = JSON.parse(storedRiskMap);
      this.riskMap = new Map(Object.entries(storedRiskMap));
      return this.riskMap.get(userId);
    }
    return undefined;
  }

  getRiskProfile(userId: string): Risk | undefined {
    return this.getRiskFromLocalStorage(userId);
  }

  updateRiskProfile(userId: string, updatedRisk: Risk): void {
    this.storeRiskInLocalStorage(userId, updatedRisk);
  }

  createRiskProfile(userId: string, risk: Risk): void {
    this.storeRiskInLocalStorage(userId, risk);
  }
}
