import { EfficiencyMetricNeighbourModel } from './EfficiencyMetricNeighbourModel';

export class EMModel {
  urn: number;
  name: string;
  rank: number;
  phase: string;
  localAuthority: string;
  schoolType: string;
  neighbourDataModels: EfficiencyMetricNeighbourModel[];
}


