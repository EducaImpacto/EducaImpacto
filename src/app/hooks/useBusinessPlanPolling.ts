import { useEffect, useRef, useState } from 'react';
import { getBusinessPlan, type BusinessPlanRow } from '../services/backendRepository';

export type BusinessPlanPollingStatus = 'idle' | 'polling' | 'generated' | 'failed' | 'timeout';

const POLL_INTERVAL_MS = 4000;
const POLL_TIMEOUT_MS = 3 * 60 * 1000;

/**
 * Poll de `business_plans.status` ate a geracao com IA (educaimpacto-agents)
 * sair de 'draft'. Usado depois de `triggerBusinessPlanGeneration`, ja que o
 * backend responde imediatamente (202) e processa em segundo plano.
 */
export function useBusinessPlanPolling(businessPlanId: string | null) {
  const [status, setStatus] = useState<BusinessPlanPollingStatus>('idle');
  const [plan, setPlan] = useState<BusinessPlanRow | null>(null);
  const startedAtRef = useRef<number | null>(null);

  useEffect(() => {
    if (!businessPlanId) {
      setStatus('idle');
      setPlan(null);
      return;
    }

    let cancelled = false;
    startedAtRef.current = Date.now();
    setStatus('polling');

    const poll = async () => {
      try {
        const row = await getBusinessPlan(businessPlanId);
        if (cancelled || !row) return;

        setPlan(row);

        if (row.status === 'generated') {
          setStatus('generated');
          return;
        }
        if (row.status === 'failed') {
          setStatus('failed');
          return;
        }

        const elapsed = Date.now() - (startedAtRef.current ?? Date.now());
        if (elapsed >= POLL_TIMEOUT_MS) {
          setStatus('timeout');
          return;
        }

        timeoutId = setTimeout(poll, POLL_INTERVAL_MS);
      } catch (error) {
        console.error('Falha ao consultar status do plano de negocios:', error);
        if (!cancelled) {
          timeoutId = setTimeout(poll, POLL_INTERVAL_MS);
        }
      }
    };

    let timeoutId = setTimeout(poll, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [businessPlanId]);

  return { status, plan };
}
