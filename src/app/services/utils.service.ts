import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DBInterface } from '../models/db.enum';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private STORAGE_KEY = 'DolFinDB'
  constructor(
    private router: Router
  ) { }

  json_parameters_to_query(parameters: any) {
    let params = new URLSearchParams();
    for(let key in parameters) {
      params.set(key, parameters[key])
    }
    return params
  }

  redirect_page_to(page: string) {
    this.router.navigateByUrl(page)
  }

  private getDB(): DBInterface {
    let dbMap = localStorage.getItem(this.STORAGE_KEY)
    if (dbMap != null) {
      return JSON.parse(dbMap)
    } else {
      return {}
    }
  }

  private setDB(value: DBInterface) {
    let strVal = JSON.stringify(value)
    localStorage.setItem(this.STORAGE_KEY, strVal)
  }

  getFromDB(key: string) {
    let dbMap = this.getDB()
    let parsedMap = new Map(Object.entries(dbMap))
    return parsedMap.get(key)
  }

  setToDB(key: string, value) {
    let dbMap = this.getDB()
    dbMap[key] = value
    this.setDB(dbMap)
  }
}
