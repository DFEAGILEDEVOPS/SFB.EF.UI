export class EfficiencyMetricNeighbourModel {
  urn: number;
  name: string;
  rank: number;
  overallPhase: string;
  localAuthority: string;
  pupils: number;
  ever6: number;
  sen: number;
  incomePP: number;
  progressReading: number;
  progressWriting: number;
  progressMaths: number;
  progress8: number;
  address: string;
  telephone: string;
  headTeacher: string;
  ofstedRating: string;
  religiousCharacter: string;
  schoolType: string;
  location: Location;
}

class Location {
  type: string;
  coordinates: string[];
}
