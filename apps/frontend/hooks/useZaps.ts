import axios from "axios";
import { useState, useEffect } from "react";
import Zap from "../interface/zap";
import { useRouter } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useZaps() {
  const [loading, setLoading] = useState(true);
  const [zaps, setZaps] = useState<Zap[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }

    axios
      .get(`${API_BASE_URL}/api/v1/zap`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setZaps(res.data.zaps);
        setLoading(false);
      });
  }, []);

  return { loading, zaps };
}
