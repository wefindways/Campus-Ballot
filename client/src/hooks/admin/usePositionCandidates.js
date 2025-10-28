import { useMemo } from "react";
import { useCandidates } from "./candidates";

function usePositionsCandidates() {
  const { candidates, positions } = useCandidates();

  // Use useMemo so this mapping only recalculates when data changes
  const positionsWithCandidates = useMemo(() => {
    return positions.map((pos) => ({
      ...pos,
      candidates: candidates.filter((cand) => cand.position_id === pos.id),
    }));
  }, [positions, candidates]);

  return { positionsWithCandidates };
}

export default usePositionsCandidates;
