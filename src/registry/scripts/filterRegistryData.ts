import { registryDataObject } from "../interfaces.ts";

export function filterRegistryData(registryData: registryDataObject[], type: 'product' | 'project' | 'normal') {
  switch (type) {
  case 'normal':
    return registryData;
  case 'product':
    return registryData.filter(element => element.type === 'product');
  case 'project':
    return registryData.filter(element => element.type === 'project');
  default:
    return registryData;
  }
}