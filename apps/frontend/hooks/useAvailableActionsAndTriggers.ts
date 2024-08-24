import axios from "axios";
import { useState, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useAvailableActionsAndTriggers() {
  const [availableActions, setAvailableActions] = useState([]);
  const [availableTriggers, setAvailableTriggers] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/v1/trigger/available`)
      .then((x) => setAvailableTriggers(x.data.availableTriggers));

    axios
      .get(`${API_BASE_URL}/api/v1/action/available`)
      .then((x) => setAvailableActions(x.data.availableActions));
  }, []);

  return {
    availableActions,
    availableTriggers,
  };
}
