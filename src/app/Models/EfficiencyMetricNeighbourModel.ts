export class EfficiencyMetricNeighbourModel {
  urn: number;
  name?: string;
  rank?: number;
  overallPhase?: string;
  phase?: string;
  localAuthority?: string;
  expenditurePP?: number;
  progress8?: number;
  ks2?: number;
  efficiencyScore?: number;
  address?: string;
  telephone?: string;
  headTeacher?: string;
  ofstedRating?: string;
  religiousCharacter?: string;
  schoolType?: string;
  location?: Location;
  pupils?: number;
  ever6?: number;
  sen?: number;
}

class Location {
  type: string;
  coordinates: string[];
}
