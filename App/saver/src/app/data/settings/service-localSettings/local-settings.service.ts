import { Injectable } from '@angular/core';
import {Setting} from "../local-settings/local-settings.component";

@Injectable({
  providedIn: 'root'
})
export class LocalSettingsService {

  settingTooltips: Setting = {
    name: 'Tooltip toggle',
    value: 0,
    methodName: "toggleTooltip"
  };


  constructor() { }
}
