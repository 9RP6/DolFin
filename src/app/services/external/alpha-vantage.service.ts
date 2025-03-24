// Service to interact with Alpha Vantage API for financial market data
import { EventEmitter, Injectable } from '@angular/core';
import { SecretKeys } from 'src/app/config/secrets.config';
import { HttpService } from 'src/app/services/external/http.service';

import { CachedValue } from 'src/app/models/external.model';
import { UtilsService } from '../utils.service';

@Injectable({
  providedIn: 'root'
})
export class AlphaVantageService {
  // Base URL for Alpha Vantage API
  private ALPHA_VANTAGE_API = "https://www.alphavantage.co/query"
  // Key used for storing cached data in localStorage
  private STORAGE_KEY = 'AlphaVantageBindings';

  // API key for authentication
  apiKey
  // Event emitter for top gainers/losers data
  topGainersEmitter = new EventEmitter<CachedValue>();
  // Cached value for top gainers/losers data
  topGainersCache: CachedValue = { function: 'TOP_GAINERS_LOSERS' }
  bindings

  constructor(
    private httpService: HttpService,
    private utils: UtilsService
  ) {
    this.apiKey = SecretKeys.alphaVantage;
  }

  // Helper method to store data in localStorage with nested keys
  private saveCache(key: string, value: any) {
    let bindings = this.utils.getFromDB(this.STORAGE_KEY);
    if (!bindings) {
      this.bindings = {};
    }
    this.bindings[key] = value;

    console.log(this.bindings)
    this.utils.setToDB(this.STORAGE_KEY, this.bindings);
  }

  // Helper method to retrieve specific key from localStorage
  private getCache(key: string) {
    let bindings = this.utils.getFromDB(this.STORAGE_KEY);
    if (bindings) {
      this.bindings = new Map(Object.entries(bindings))
      return this.bindings.get(key)
    }
    return null
  }

  // Helper method to get raw localStorage data
  private getCacheRaw() {
    let value = localStorage.getItem(this.STORAGE_KEY);
    return value ? JSON.parse(value) : {};
  }

  // Makes API call to Alpha Vantage for specified function
  private async getFrom(apiFunction: string) {
    let url = this.httpService.processUrl(this.ALPHA_VANTAGE_API, {
      'function': apiFunction,
      'apikey': this.apiKey
    });

    return await this.httpService.getData(url)
    // return response
  }

  // Implements caching logic with 24-hour expiration
  private async getCachedValue(value: CachedValue) {
    // 24 hours in milliseconds
    let twentyFourHours = 24 * 60 * 60 * 1000
    let currentTime = new Date()
    
    // Try to get cached value from localStorage
    let localCacheValue = this.getCache(value.function)
    if (localCacheValue != null) {
      value = localCacheValue
    }
    
    // If cache is expired or doesn't exist, fetch new data
    if (value.lastUpdated==null || currentTime.getTime() - new Date(value.lastUpdated).getTime() >= twentyFourHours) {  
      const response = await this.getFrom(value.function);
      response.subscribe((data) => {
        value.data = data;
        value.lastUpdated = currentTime;
        this.topGainersCache = value
        this.saveCache(value.function, value);
      });
    }
    // Emit the updated value
    if (value.function === 'TOP_GAINERS_LOSERS') {
      this.topGainersEmitter.emit(value);
    }
    return value
  }

  // Public method to get top gainers/losers with caching
  getTopGainersLosers() {
    return this.getCachedValue(this.topGainersCache)
  }
}
