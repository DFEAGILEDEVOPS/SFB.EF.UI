import { EfficiencyMetricNeighbourModel } from './EfficiencyMetricNeighbourModel';

export class EMModel {
  urn: number;
  name?: string;
  rank?: number;
  rankGroup?: number;
  phase?: string;
  localAuthority?: string;
  schoolType?: string;
  primarySecondary?: string;
  neighbourDataModels?: EfficiencyMetricNeighbourModel[];
}


